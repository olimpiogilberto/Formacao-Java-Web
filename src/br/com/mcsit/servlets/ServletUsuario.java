package br.com.mcsit.servlets;

import java.io.*;

import javax.servlet.*;

import javax.servlet.http.*;

import br.com.mcsit.basico.*;
import br.com.mcsit.model.*;


public class ServletUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response)
			throws ServletException, IOException{
		
		String mensagem = null;
		RequestDispatcher rd = null;
		
		
	try{	
		
	Usuario usuario = new Usuario();
		
	usuario.setLogin(request.getParameter("txtLogin"));
	usuario.setSenha(request.getParameter("txtSenha"));
	
	
	LoginDAO dao = new LoginDAO();
	
	usuario = dao.login(usuario);
	
		if(usuario != null){
			
			//request.setAttribute("dadosUsuario", usuario); 
			rd = request.getRequestDispatcher("menu.jsp");
			HttpSession sessao = request.getSession();
			sessao.setMaxInactiveInterval(300);
			sessao.setAttribute("dadosUsuario", usuario);
			
		
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