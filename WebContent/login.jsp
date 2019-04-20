<%@ page language="java" contentType="text/html; charset=iso-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
	String msg = (String) request.getAttribute("msg");
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Acesso ao sistema</title>



<link href='CSS/formularios.css' rel="stylesheet" type="text/css" />
<link href='CSS/displaytag.css' rel="stylesheet" type="text/css" />
<link href='CSS/hipertexto.css' rel="stylesheet" type="text/css" />
<link href='CSS/impressao.css' rel="stylesheet" type="text/css" />
<link href='CSS/menu.css' rel="stylesheet" type="text/css" />
<link href='CSS/paginador.css' rel="stylesheet" type="text/css" />
<link href='CSS/tpt_base.css' rel="stylesheet" type="text/css" />
<link href='CSS/tabelas.css' rel="stylesheet" type="text/css" />

<style>
body {background-color: #000;}
.style2 {font-family: Arial, Helvetica, sans-serif}
.style3 {font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: #87cefa;}
.style5 {color: #0033FF}
.style7 {font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: #00008f; font-size: 42px; }
</style>
</head>
<body>

	<table width="100%" height="50%" align="center">

		<tr>
			<td height="200" bgcolor="#"><div
					align="center">
					<span class="style7"> LOJA VIRTUAL</span>
				</div></td>
		</tr>
		<tr>
		<td height="180" bgcolor="#fff"><p>&nbsp;</p>
			<form name="FormLogin" method="post" action="login">
				<p align="center">
					<span class="style5">USU&Aacute;RIO</span> <input type="text" name="txtLogin">
				</p>
				<p align="center">
					<label> <span class="style5">&nbsp;&nbsp;&nbsp;&nbsp;SENHA </span> <input type="password" name="txtSenha"> </label>
				</p>
				<p align="center">
				<input type="submit" value="Logar">
				</p>
			</form>
		</td>
		</tr>
		<tr>
			<td height="150" bgcolor="#000000">&nbsp;</td>
		</tr>
	</table>

	<h1 align="center" class="style3">&nbsp;</h1>
	<p>&nbsp;</p>
	<% if (msg != null) out.println("<br><font color='red' face='arial'> " + msg + "</font> "); %>
</body>

</html>