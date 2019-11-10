<%@page import="java.util.Iterator"%>
<%@page import="br.com.mcsit.basico.Usuario"%>
<%@page import="java.util.List"%>
<%@page import="br.com.mcsit.model.LoginDAO"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
	//Usuario usuario = (Usuario)request.getAttribute("dadosUsuario");
	Usuario usuario = (Usuario) session.getAttribute("dadosUsuario");

	if (usuario == null) {
		response.sendRedirect("login.jsp");
	} else {
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Menu de Opções</title>
<!-- Estilos -->
<link href='CSS/formularios.css' rel="stylesheet" type="text/css" />
<link href='CSS/displaytag.css' rel="stylesheet" type="text/css" />
<link href='CSS/hipertexto.css' rel="stylesheet" type="text/css" />
<link href='CSS/impressao.css' rel="stylesheet" type="text/css" />
<link href='CSS/menu.css' rel="stylesheet" type="text/css" />
<link href='CSS/paginador.css' rel="stylesheet" type="text/css" />
<link href='CSS/tpt_base.css' rel="stylesheet" type="text/css" />
<link href='CSS/tabelas.css' rel="stylesheet" type="text/css" />
<style>
body {background-color: #c1c1c1;}
.style2 {font-family: Arial, Helvetica, sans-serif}
.style3 {font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: #ff0000; font-size: 15px;}
.style5 {color: #0033FF}
.style7 {font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: #00008f; font-size: 42px; }
</style>
<!-- Estilos/ -->
<!-- Scripts -->
<script language="JavaScript" type="text/javascript">
	function bodyOnLoad() {
	}

	// Configurar a classificação da informação na barra cinza
	function setClassificacaoInformacao() {
		if (caixa.util.isNeitherUndefinedNorNull(parent)) {
			var frame = parent.frames[1];

			if (caixa.util.isNeitherUndefinedNorNull(frame)) {
				frame.document.getElementById("classificacaoInformacao").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;#10";
			}
		}
	}

	setClassificacaoInformacao();
</script>
</head>

<body onload="bodyOnLoad();">
	<p align="right">
		Olá <font color="blue" face="Verdana, arial"><%=usuario.getNome()%></font>,
		seja bem vindo!
	</p>

<center>
	<table width="65%">
	<TR><td height="50"><h2>Menu de Opções</h2></TD></TR>
	<TR><TD>
						<p align="justify"><span class="style3"><a href="Cadastro_Aluno.jsp">Cadastrar Aluno</a></span>
						</p>
						<p align="justify">
							<a href="Cadastro_Professor.jsp">Cadastrar Professor</a>
						</p>
						<p align="justify">
							<a href="Cadastro_Usuario.jsp">Cadastrar Usuário</a>
						</p>
						<p align="justify">
							<a href="logout.jsp">Sair</a>
						</p>
					</TD>
	</TR>
	<TR>
	<TD>
	<marquee>
		<p align="center"><span class="style3">melhorar CSS!!!</span></p>
	</marquee>
	</TD>
	</TR>
	</table>
</center>

	

</body>
</html>
<%
	}
%>