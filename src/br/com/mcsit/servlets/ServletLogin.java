package br.com.mcsit.servlets;

import java.io.*;

import javax.servlet.*;

import javax.servlet.http.*;

import br.com.mcsit.basico.*;
import br.com.mcsit.model.*;


public class ServletLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response)
			throws ServletException, IOException{
		
		String mensagem = null;
		RequestDispatcher rd = null;
		
		
	try{	
		
	Usuario usuario = new Usuario();
		
	usuario.setLogin(request.getParameter("loginTO.username"));
	usuario.setSenha(request.getParameter("loginTO.password"));
	
	
	UsuarioDAO dao = new UsuarioDAO();
	
	usuario = dao.login(usuario);
	
		if(usuario != null){
			
			request.setAttribute("dadosUsuario", usuario); 
			rd = request.getRequestDispatcher("menu.jsp");
			
		
		}else{
			rd = request.getRequestDispatcher("login.jsp");
			mensagem = "Login/ ou Senha inválido!";
		}
	
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