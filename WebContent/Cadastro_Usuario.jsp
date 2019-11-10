<%@page import="java.util.Iterator"%>
<%@page import="br.com.mcsit.basico.*"%>
<%@page import="java.util.List"%>
<%@page import="br.com.mcsit.model.*"%>
<%@page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="br.com.mcsit.basico.Usuario"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<% 
//Usuario Usuario = (Usuario)request.getAttribute("dadosUsuario");
Usuario usuario = (Usuario)session.getAttribute("dadosUsuario");

if(usuario == null){
	response.sendRedirect("login.jsp");
} 
else
{
List<Usuario> listaUsers = (List<Usuario>)request.getAttribute("listaUsers");
Usuario user = (Usuario)request.getAttribute("dadosUser");
String msg  = (String)request.getAttribute("msg");
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Cadastro de Usuarios</title>
<!-- Estilos -->
<link href='CSS/formularios.css' rel="stylesheet" type="text/css" />
<link href='CSS/displaytag.css' rel="stylesheet" type="text/css" />
<link href='CSS/hipertexto.css' rel="stylesheet" type="text/css" />
<link href='CSS/impressao.css' rel="stylesheet" type="text/css" />
<link href='CSS/menu.css' rel="stylesheet" type="text/css" />
<link href='CSS/paginador.css' rel="stylesheet" type="text/css" />
<link href='CSS/tpt_base.css' rel="stylesheet" type="text/css" />
<link href='CSS/tabelas.css' rel="stylesheet" type="text/css" />
<link href='CSS/"tpt_base.css' rel="stylesheet" type="text/css">
<!-- Estilos/ -->
<script type="text/javascript">

function goBack() {
  window.history.back();
}

function setFormulario(opcao){
		document.Form1.operacao.value = opcao;
		document.Form1.submit();
	}
	
function consultaCodigo(codigo){
		document.getElementById("txtCodigo").value=codigo;
		setFormulario(2);
}
</script>

</head>
<body>
	<p align="right">
		<button onclick="goBack()">Voltar</button>
	</p>
	<center>

		<table>


			<TR>
				<TD>
					<H1>Cadastro de Usuarios</H1> <BR>
				</TD>
			</TR>
			<TR>
				<TD>

					<form name="Form1" method="post" action="cadastroUsuario">

						<p align="justify">
							Código : <input type="text" name="txtCodigo" id="txtCodigo">
						</p>

						<p align="justify">
							NOME: <input type="text" name="txtNome" size="32">
						</p>
				
						
						<input type="button" value="Cadastrar" onClick="setFormulario(1);">
						<input type="button" value="Consultar" onClick="setFormulario(2);">
						<input type="button" value="Alterar" onClick="setFormulario(3);">
						<input type="button" value="Excluir" onClick="setFormulario(4);">
						<input type="reset" value="Limpar"> <input type="hidden"
							name="operacao" value="0">
					</form>
				</TD>
			</TR>
			<TR>
				<TD><p align="center">Gilberto Olimpio dos
						Santos&nbsp;&nbsp;&nbsp;</p></TD>
			</TR>
		</table>

		<%
if(msg != null)out.println("<br>" + msg);
%>
	</center>
	<%
if(user != null){
%>

	<script type="text/javascript">
	document.Form1.txtCodigo.value = '<%=user.getCodigo()%>';
	document.Form1.txtNome.value = '<%=user.getNome()%>';
	</script>

	<%
}
else if(listaUsers != null && listaUsers.size() > 0){
		out.println("<center><table border = '1'>");
		out.println("<tr><td colspan='3'>Lista de Usuarios</td></tr>");
		out.println("<tr>");
		out.println("<td><b>Código</b></td>");
		out.println("<td><b>Nome</b></td>");
		out.println("<td>&nbsp;</td>");
		out.println("</tr>");
		
		for(Usuario u : listaUsers){
			out.println("<tr>");
			out.println("<td>" + u.getCodigo()+ "</td>");
			out.println("<td>" + u.getNome()+ "</td>");
			out.println("<td>");
			out.println("<input type='button' value='Editar' onClick='consultaCodigo(\"" + u.getCodigo() + "\")'>");
			out.println("</tr>");
		}
	
		out.println("</table></center><br><br><br>");
	
      }
}
%>
</body>
</html>