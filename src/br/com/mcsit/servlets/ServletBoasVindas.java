package br.com.mcsit.servlets;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

public class ServletBoasVindas extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response)
			throws ServletException, IOException{
		
		String nome = request.getParameter("txtNome");
		
		PrintWriter out = response.getWriter();
		out.println("Olá "+ nome + ", seja bem vindo");
		out.close();
	}

}
