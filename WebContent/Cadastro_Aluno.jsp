<%@page import="java.util.Iterator"%>
<%@page import="br.com.mcsit.basico.*"%>
<%@page import="java.util.List"%>
<%@page import="br.com.mcsit.model.*"%>
<%@page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="br.com.mcsit.basico.Aluno" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<% 
//Aluno aluno = (Aluno)request.getAttribute("dadosAluno");
Usuario usuario = (Usuario)session.getAttribute("dadosUsuario");

if(usuario == null){
	response.sendRedirect("login.jsp");
} 
else
{
List<Aluno> listaAlunos = (List<Aluno>)request.getAttribute("listaAlunos");
Aluno aluno = (Aluno)request.getAttribute("dadosAluno");
String msg  = (String)request.getAttribute("msg");
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Cadastro de Alunos</title>
<!-- Estilos -->
<link href='CSS/formularios.css' 	rel="stylesheet" type="text/css"/>
<link href='CSS/displaytag.css' 	rel="stylesheet" type="text/css"/>
<link href='CSS/hipertexto.css' 	rel="stylesheet" type="text/css"/>
<link href='CSS/impressao.css' 		rel="stylesheet" type="text/css"/>
<link href='CSS/menu.css' 			rel="stylesheet" type="text/css"/>
<link href='CSS/paginador.css' 		rel="stylesheet" type="text/css"/>
<link href='CSS/tpt_base.css' 		rel="stylesheet" type="text/css"/>
<link href='CSS/tabelas.css' 		rel="stylesheet" type="text/css"/>
<link href='CSS/"tpt_base.css' 		rel="stylesheet" type="text/css">
<!-- Estilos/ -->
<script type="text/javascript">

function goBack() {
  window.history.back();
}

function setFormulario(opcao){
		document.Form1.operacao.value = opcao;
		document.Form1.submit();
	}
	
function consultaCPF(cpf){
		document.getElementById("txtCpf").value=cpf;
		setFormulario(2);
}
</script>

</head>
<body>
<p align="right"><button onclick="goBack()">Voltar</button>	</p> 
	<center>
	
	<table>
	
	

<TR>
<TD> <H1>Cadastro de Alunos</H1><BR></TD>
</TR>
<TR>
<TD>
	 
		<form name="Form1" method="post" action="cadastroAluno">
		
		<p align="justify">RA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="text" name="txtRA" maxlength="8">
		CPF : <input type="text" name="txtCpf" id="txtCpf" maxlength="11"></p>
		
		<p align="justify">NOME: <input type="text" name="txtNome" size="32"></p>
		<p align="justify">
		CURSO: 	<select name="comboCurso" >
		<%
				CursoDAO dao = new CursoDAO();
				List<Curso> lista = dao.listAll();
				
				Iterator<Curso> iterator = lista.iterator();
				while(iterator.hasNext()){
					Curso c = iterator.next();
				
		%>
				<option value ="<%=c.getCodigo()%>"><%=c.getNome()%></option>
		<%
				
				}
		%>
				</select>
		</p>
 		<p align="justify">
		RUA&nbsp;&nbsp;&nbsp;: <input type="text" name="txtRua" maxlength="25"> 
		NUMERO&nbsp;: <input type="text" name="txtNumero"maxlength="5">
		
		</p>
		<p align="justify">
		CEP&nbsp;&nbsp;&nbsp;: <input type="text" name="txtCep" maxlength="8"> BAIRRO: <input type="text" name="txtBairro" maxlength="25"> <BR>
		</p>
		<input type="button" value="Cadastrar" onClick="setFormulario(1);">
		<input type="button" value="Consultar" onClick="setFormulario(2);">
		<input type="button" value="Alterar" onClick="setFormulario(3);">
		<input type="button" value="Excluir" onClick="setFormulario(4);">
		<input type="reset"  value="Limpar">
		<input type="hidden" name="operacao" value="0">
		</form>
		</TD>
</TR>
<TR>
<TD><p align="center">Gilberto Olimpio dos Santos&nbsp;&nbsp;&nbsp; </p></TD>
</TR>
</table>

<%
if(msg != null)out.println("<br>" + msg);
%>	
	</center>
<%
if(aluno != null){
%>	

<script type="text/javascript">
	document.Form1.txtRA.value = '<%=aluno.getRa()%>';
	document.Form1.txtCpf.value = '<%=aluno.getCpf()%>';
	document.Form1.txtNome.value = '<%=aluno.getNome()%>';
	document.Form1.comboCurso.value = '<%=aluno.getCurso()%>';
	document.Form1.txtRua.value    = '<%=aluno.getEndereco().getRua()%>';
	document.Form1.txtNumero.value = '<%=aluno.getEndereco().getNumero()%>';
	document.Form1.txtBairro.value = '<%=aluno.getEndereco().getBairro()%>';
	document.Form1.txtCep.value = '<%=aluno.getEndereco().getCep()%>';
</script>

<%
}
else if(listaAlunos != null && listaAlunos.size() > 0){
		out.println("<center><table border = '1'>");
		out.println("<tr><td colspan='3'>Lista de Alunos</td></tr>");
		out.println("<tr>");
		out.println("<td><b>CPF</b></td>");
		out.println("<td><b>Nome</b></td>");
		out.println("<td>&nbsp;</td>");
		out.println("</tr>");
		
		for(Aluno a : listaAlunos){
			out.println("<tr>");
			out.println("<td>" +a.getCpf()+ "</td>");
			out.println("<td>" +a.getNome()+ "</td>");
			out.println("<td>");
			out.println("<input type='button' value='Editar' onClick='consultaCPF(\"" + a.getCpf() + "\")'>");
			out.println("</tr>");
		}
	
		out.println("</table></center><br><br><br>");
	
      }
}
%>		
</body>
</html>