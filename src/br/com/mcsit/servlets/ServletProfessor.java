package br.com.mcsit.servlets;

import java.io.*;
import java.util.List;

import javax.servlet.*;

import javax.servlet.http.*;

import br.com.mcsit.basico.*;
import br.com.mcsit.model.*;

public class ServletProfessor extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response)
			throws ServletException, IOException{
		
		String mensagem = null;
		RequestDispatcher rd = null;
		rd = request.getRequestDispatcher("Cadastro_Professor.jsp");
		
	try{	
	int  oper = Integer.parseInt(request.getParameter("operacao"));	
	
	Professor professor = new Professor();
	
	if(!request.getParameter("txtRgf").trim().equals("")){
		professor.setRgf(Integer.parseInt(request.getParameter("txtRgf")));
		}
	
	if(!request.getParameter("txtCpf").trim().equals("")){
		professor.setCpf(Long.parseLong(request.getParameter("txtCpf")));
		}
	
	professor.setNome(request.getParameter("txtNome"));
	professor.setDisciplina(request.getParameter("comboDisciplina"));
	
	if(!request.getParameter("txtCep").trim().equals("")){
		professor.getEndereco().setCep(Long.parseLong(request.getParameter("txtCep")));
		}
	
	professor.getEndereco().setRua(request.getParameter("txtRua"));
	professor.getEndereco().setBairro(request.getParameter("txtBairro"));
	
	ProfessorDAO dao = new ProfessorDAO();
	boolean sucesso = false;
	
	if(oper != 2){
		if (oper == 1) sucesso = dao.cadastrar(professor);
		else if (oper == 3) sucesso = dao.alterar(professor);
		else if (oper == 4) sucesso = dao.excluir(professor);
		
		if (sucesso) mensagem = "Operação Realizada com sucesso!";
		else mensagem = "Erro na operação!";
	} else if (oper == 2 && professor.getCpf() != null){
		
		professor = dao.consultarPorCpf(professor);
		if(professor != null){ 
			request.setAttribute("dadosProfessor", professor); 
			
		
		}else{
			
			mensagem = "Professor inexistente!";
		}
	}else{
		
		List<Professor> lista = dao.consultarPorNome(professor);
		
		if (lista != null && lista.size() > 0){
			
			request.setAttribute("listaProfessor", lista); 
						
		} else {
			
			mensagem = "Aluno inexistente!";
	
		}
	}
	
	}
	catch(Exception erro){
		mensagem = "Ocorreu o erro: " + erro;
	} finally{
		request.setAttribute("msg", mensagem); 
		rd.forward(request,response);
		/*PrintWriter out = response.getWriter();
		out.println(mensagem);
		out.close();*/
	}
	}

}
