package br.com.mcsit.servlets;

import java.io.*;
import java.util.List;

import javax.servlet.*;

import javax.servlet.http.*;

import br.com.mcsit.basico.*;
import br.com.mcsit.model.*;

public class ServletAluno extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response)
			throws ServletException, IOException{
		
		String mensagem = null;
		RequestDispatcher rd = null;
		rd = request.getRequestDispatcher("Cadastro_Aluno.jsp");
		
	try{	
	int  oper = Integer.parseInt(request.getParameter("operacao"));	
	
	Aluno aluno = new Aluno();
	if(!request.getParameter("txtRA").trim().equals("")){
		aluno.setRa(Integer.parseInt(request.getParameter("txtRA")));
	
	}
	
	if(!request.getParameter("txtCpf").trim().equals("")){
		aluno.setCpf(Long.parseLong(request.getParameter("txtCpf")));
	
	}
	
	aluno.setNome(request.getParameter("txtNome"));
	aluno.setCurso(request.getParameter("comboCurso"));
	
		
	aluno.getEndereco().setRua(request.getParameter("txtRua"));
	if(!request.getParameter("txtNumero").trim().equals("")){
		aluno.getEndereco().setNumero(Integer.parseInt(request.getParameter("txtNumero")));
	
	}
	aluno.getEndereco().setBairro(request.getParameter("txtBairro"));
	if(!request.getParameter("txtCep").trim().equals("")){
		aluno.getEndereco().setCep(Long.parseLong(request.getParameter("txtCep")));
		
	}
	
	AlunoDAO dao = new AlunoDAO();
	boolean sucesso = false;
	
	if(oper != 2){
		if (oper == 1) sucesso = dao.cadastrar(aluno);
		else if (oper == 3) sucesso = dao.alterar(aluno);
		else if (oper == 4) sucesso = dao.excluir(aluno);
		
		if (sucesso) mensagem = "Operação Realizada com sucesso!";
		else mensagem = "Erro na operação!";
	} else if (oper == 2 && aluno.getCpf() != null){
		
		aluno = dao.consultarPorCpf(aluno);
		if(aluno != null){ 
			request.setAttribute("dadosAluno", aluno); 
			
		
		}else{
			//rd = request.getRequestDispatcher("login.jsp");
			mensagem = "Aluno inexistente!";
		}
	}else{
		
		List<Aluno> lista = dao.consultarPorNome(aluno);
		
		if (lista != null && lista.size() > 0){
			
			request.setAttribute("listaAlunos", lista); 
						
		} else {
			
			mensagem = "Aluno inexistente!";
		}	}
	
	}
	catch(Exception erro){
		mensagem = "Ocorreu o erro: " + erro;
	} finally{
		request.setAttribute("msg", mensagem); 
		rd.forward(request,response);
		/**PrintWriter out = response.getWriter();
		out.println(mensagem);
		out.close();**/
	}
	}

}//final