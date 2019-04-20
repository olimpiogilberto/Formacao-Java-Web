<%@page import="java.util.Iterator"%>
<%@page import="br.com.mcsit.basico.*"%>
<%@page import="java.util.List"%>
<%@page import="br.com.mcsit.model.*"%>
<%@page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="br.com.mcsit.basico.Professor" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<% 
Usuario usuario = (Usuario)session.getAttribute("dadosUsuario");

if(usuario == null){
	response.sendRedirect("login.jsp");
} 
else 
{
List<Professor> listaProfessor = (List<Professor>)request.getAttribute("listaProfessor");
Professor professor = (Professor)request.getAttribute("dadosProfessor");
String msg  = (String)request.getAttribute("msg");
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Cadastro de Professores</title>

<script type="text/javascript">
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
	<center>
	<font face="Verdana, arial">
	<table>
	<TR>
<TD> 
	 <H1>Cadastro de Professores</H1><BR>
	</TD>
</TR>
<TR>
<TD> 
		<form name="Form1" method="post" action="cadastroProfessor">
		
		<p align="justify">RGF  : <input type="text" name="txtRgf">
		CPF : <input type="text" name="txtCpf" id="txtCpf">
		</p>
		<p align="justify">NOME: <input type="text" name="txtNome" size="25"> </p>
		<p align="justify">
		DISCIPLINA: 	<select name="comboDisciplina" >
				<%
				DisciplinaDAO dao = new DisciplinaDAO();
				List<Disciplina> lista = dao.listAll();
				
				Iterator<Disciplina> iterator = lista.iterator();
				while(iterator.hasNext()){
					Disciplina d = iterator.next();
				
		%>
				<option value ="<%=d.getCodigo()%>"><%=d.getNome()%></option>
		<%
				
				}
		%>
				</select></p>
 
		<p align="justify">RUA: <input type="text" name="txtRua" maxlength="25"> </p>
		<p align="justify">CEP: <input type="text" name="txtCep" maxlength="8"> BAIRRO: <input type="text" name="txtBairro" maxlength="25"></p>
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
</font>
	</center>	
	<%
if(msg != null)out.println("<br>" + msg);
%>	
	</center>
<%
if(professor != null){
%>	

<script type="text/javascript">
	document.Form1.txtRgf.value = '<%=professor.getRgf()%>';
	document.Form1.txtCpf.value = '<%=professor.getCpf()%>';
	document.Form1.txtNome.value = '<%=professor.getNome()%>';
	document.Form1.comboDisciplina.value = '<%=professor.getDisciplina()%>';
	document.Form1.txtRua.value = '<%=professor.getEndereco().getRua()%>';
	document.Form1.txtCep.value = '<%=professor.getEndereco().getCep()%>';
	document.Form1.txtBairro.value = '<%=professor.getEndereco().getBairro()%>';
</script>
<%
}
else if(listaProfessor != null && listaProfessor.size() > 0){
		out.println("<center><table border = '1'>");
		out.println("<tr><td colspan='3'>Lista de Professores</td></tr>");
		out.println("<tr>");
		out.println("<td><b>CPF</b></td>");
		out.println("<td><b>Nome</b></td>");
		out.println("<td>&nbsp;</td>");
		out.println("</tr>");
		
		for(Professor p : listaProfessor){
			out.println("<tr>");
			out.println("<td>" +p.getCpf()+ "</td>");
			out.println("<td>" +p.getNome()+ "</td>");
			out.println("<td>");
			out.println("<input type='button' value='Editar' onClick='consultaCPF(\"" + p.getCpf() + "\")'>");
			out.println("</tr>");
		}
	
		out.println("</table></center><br><br><br>");
	
      }
}
%>		
</body>
</html>