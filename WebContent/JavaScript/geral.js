/*
	Constantes comuns utilizadas nos scripts
	Valores aqui DEVEM espelhar informações extraídas do PDS.
	
	JavaScript pre-requisito: caixa.util.html.js.
*/	
var MINUSCULAS	= "abcdefghijklmnopqrstuvwxyzáéíóúãõâêîôûàç";
var MAIUSCULAS	= MINUSCULAS.toUpperCase();
var NUMEROS		= "0123456789";
var ESPECIAIS	= " !$%*()-+=/\'\"\f\r\n.,<>:;?[]{}@";
var TECLAS_DE_CONTROLE = " 9 13 16 17 18 19 20 32 33 34 35 36 37 38 39 40 91 92 93 144 145 ";
var SEPARADOR	= "||";
var CONTEXT 	= "/nsgd";

var mostra = false;
var win;
var mensagens = "";

// Função.....: adicionarMensagem
// Objetivo...: Agrupar as mensagens de validação para que sejam exibidas em um só alert.
// Entrada....: campo - Campo relacionado à mensagem para colocar o foco após as validações.
//				mensagem - Mensagem a ser adicionada ao grupo
// Exemplo....: adicionarMensagem(document.forms[0].nomeDoCampo, "Campo obrigatório!");
// Autor......: Gustavo Rocha
function adicionarMensagem(campo, mensagem) {
	if (mensagens == "") {
		mensagens = mensagem;
		setFocus(campo);
	} else {
		mensagens = mensagens + "\n" + mensagem;
	}
}

function mudaCor(linha, cor) 
{ 
  linha.bgColor = cor; 
} 

// Funcao.....: existeMensagem
// Objetivo...: Verifica se existem mensagens a serem exibidas ao usuario.
// Exemplo....: if (existeMensagem()) {}
// Retorno....: Retorna true se existem mensagens guardadas para exibicao.
// Autor......: Gustavo Rocha
function existeMensagem() {
	return mensagens != "";
}

// Fun??o.....: exibirMensagens
// Objetivo...: Exibir as mensagens de valida??o adicionadas ao cache.
// Exemplo....: exibirMensagens();
// Retorno....: Retorna true se n?o foram exibidas mensagens de valida??o.
// Autor......: Gustavo Rocha
function exibirMensagens() {
	if (existeMensagem()) {
		alert(mensagens);
		mensagens = "";
		return false;
	}
	return true;
}

// Fun??o.....: getForm
// Objetivo...: Retornar o primeiro formul?rio da p?gina.
// Exemplo....: getForm().submit();
// Retorno....: Retorna o primeiro formul?rio da p?gina.
function getForm() {
	return document.forms[0];
}

// Fun??o.....: getElement
// Objetivo...: Recuperar um objeto do formul?rio.
// Exemplo....: getElement(nomeDoCampo);
// Retorno....: Retorna o objeto referente ao nomeDoCampo passado como par?metro.
function getElement(nome) {
	return getForm().elements[nome];
}

// Funcao.....: getKeyCode
// Objetivo...: Obter o codigo da tecla associado ao evento.
// Exemplo....: getKeyCode(event);
// Entrada....: Retorna o codigo da tecla associado ao evento passado como parametro.
function getKeyCode(event) {
	if (event.which) {
		return event.which;
	} else {
		return event.keyCode;
	}
}

// Funcao.....: getKeyValue
// Objetivo...: Obter o caracter da tecla associado ao evento.
// Exemplo....: getKeyValue(event);
// Entrada....: Retorna o caracter da tecla associado ao evento como parametro.
function getKeyValue(event) {
	return String.fromCharCode(getKeyCode(event));
}

// Fun??o.....: submeter
// Objetivo...: Submeter o formul?rio para uma a??o espec?fica.
// Exemplo....: submeter("login.do?method=login");
// Entrada....: acao - A a??o a ser executada.
function submeter(acao) {
	getForm().action = acao;

	var divProtector = new caixa.util.html.DivProtector(document);
	divProtector.enable();
	
	getForm().submit();
}

function mostraOculta(id, condicao){
	if (id != null && id != ""){
		if (condicao != null){
			if(condicao){
				mostra = true;
			}else{
				mostra = false;
			}
		}else{
			if(mostra){
				mostra = false;
			}else{
				mostra = true;
			}
		}
		document.getElementById(id).style.display = mostra ? '' : 'none';
	}
}

function imprimir() {
	window.print();
	window.close();
}

// Fun??o.....: isAlfanumericoOuEspecial
// Objetivo...: Validar o conte?do de um campo
// Entrada....: Valor a ser validado
// Exemplo....: isAlfanumericoOuEspecial(document.forms[0].campo.value);
// Autor......: Gustavo Rocha
// Scripts....:	validarCaracteres
function isAlfanumericoOuEspecial(valor) {
	return validarCaracteres(valor, MINUSCULAS + MAIUSCULAS + NUMEROS + ESPECIAIS);
}

// Fun??o.....: isAlfanumerico
// Objetivo...: Validar o conte?do de um campo
// Entrada....: Valor a ser validado
// Exemplo....: isAlfanumerico(document.forms[0].campo.value);
// Autor......: Gustavo Rocha
// Scripts....:	validarCaracteres
function isAlfanumerico(valor) {
	return validarCaracteres(valor, MINUSCULAS + MAIUSCULAS + NUMEROS);
}

// Fun??o.....: isAlfanumericoOuEspaco
// Objetivo...: Validar o conte?do de um campo
// Entrada....: Valor a ser validado
// Exemplo....: isAlfanumericoOuEspaco(document.forms[0].campo.value);
// Autor......: Gustavo Rocha
// Scripts....:	validarCaracteres
function isAlfanumericoOuEspaco(valor) {
	return validarCaracteres(valor, MINUSCULAS + MAIUSCULAS + NUMEROS + " ");
}

// Fun??o.....: isAlfanumericoOuApostrofe
// Objetivo...: Validar o conte?do de um campo
// Entrada....: Valor a ser validado
// Exemplo....: isAlfanumericoOuApostrofe(document.forms[0].campo.value);
// Autor......: Gustavo Rocha
// Scripts....:	validarCaracteres
function isAlfanumericoOuApostrofe(valor) {
	return validarCaracteres(valor, MINUSCULAS + MAIUSCULAS + NUMEROS + " \'");
}

// Fun??o.....: isNumero
// Objetivo...: Validar o conte?do de um campo
// Entrada....: Valor a ser validado
// Exemplo....: isNumero(document.forms[0].campo.value);
// Autor......: Gustavo Rocha
// Scripts....:	validarCaracteres
function isNumero(valor) {
	return validarCaracteres(valor, NUMEROS);
}

// Fun??o.....: validarCaracteres
// Objetivo...: Verifica se existe no valor passado algum caractere diferente dos existentes no grupoCaracteres.
// Entrada....: valor  			 <- Valor a ser validado
//				grupoCaracteres  <- String contendo os caracteres aceitos pelo campo
// Retorno....: true - se n?o houverem, no valor, caracteres diferentes do grupo passado como par?metro.
// Exemplo....: if (validarCaracteres(document.forms[0].campo.value))
// Autor......: Gustavo Rocha
function validarCaracteres(valor, grupoCaracteres) {
	for (var i = 0; i < valor.length; i++) {
		if (grupoCaracteres.indexOf(valor.charAt(i)) == -1) {
			return false;
		}
	}
	return true;
}

// Fun??o.....: completarComZerosEsquerda
// Objetivo...:	Completar com zeros a esquerda de uma string num?rica.
// Entrada....: sString		<- Valor a ser formatado
//				iQtdCasas	<- N?mero que a string completa deve conter
// Exemplo....:	alert(completarComZerosEsquerda(22,4));
//				ou
//				alert(completarComZerosEsquerda("22",4));
// Alterado...:	Rafael L. S?
// Scripts....: Nenhum
function completarComZerosEsquerda(sString, iQtdCasas)
{
	sString = sString.toString();
	while (sString.length < iQtdCasas)
	{
		sString = "0"+ sString;
	}
	return sString;
}

// Fun??o.....: validarCNPJ
// Objetivo...: Retorna true se cnpj for v?lido e false se cnpj for inv?lido.
// Entrada....: strCNPJ	<- Uma string com o cnpj que ser? validado.
// Retorno....: true se cnpj v?lido ou false se cnpj inv?lido.
// Exemplo....: if (!validarCNPJ("11.111.111/1111-11")) alert("CNPJ inv?lido");
// Autor......: Desconhecido
function validarCNPJ(strCNPJ){
		
	if (strCNPJ == ""){
		return true;
	}

	x = strCNPJ;
	var temp = "";
	for(i = 0; i < 19; i++){
		if(x.substr(i,1) != "." && x.substr(i,1) != "/" && x.substr(i,1) != "-") {
			temp = temp + x.substr(i,1);
		}
	}
	strCNPJ = temp;
	
	if (isStringComRepeticaoRecursiva(strCNPJ)) {
		return false;
	}
	
	if (parseFloat(strCNPJ) > 0){
		var
			strDV = strCNPJ.substr(12, 2),
			intSoma,
			intDigito = 0,
			strControle = "",
			strMultiplicador = "543298765432";
		strCNPJ = strCNPJ.substr(0, 12);
		for(var j = 1; j <= 2; j++){
			intSoma = 0;
			for(var i = 0; i <= 11; i++){
				intSoma += (parseInt(strCNPJ.substr(i, 1), 10) * parseInt(strMultiplicador.substr(i, 1), 10))
			}
			if(j == 2){intSoma += (2 * intDigito)}
			intDigito = (intSoma * 10) % 11;
			if(intDigito == 10){intDigito = 0}
			strControle += intDigito.toString();
			strMultiplicador = "654329876543";
		}
		return(strControle == strDV);
	}
	else
		return false;
}

// Fun??o.....: validarCPF
// Objetivo...: Verifica se o cpf digitado ? Valido
// Entrada....: cpf	- Valor a ser validado
// Exemplo....: if (!validarCPF("111.111.111-11")) alert("CPF inv?lido");
// Autor......: Adriano Pamplona
function validarCPF(cpf) {
	if (cpf.length == 0) {
		return true;
	}
	if (cpf.length != 14) {
		return false;
	}

	var x = cpf;
	var temp = "";
	for(i = 0; i < 14; i++){
		if(x.substr(i, 1) != "." && x.substr(i, 1) != "-") {
			temp = temp + x.substr(i, 1);
		}
	}
	cpf = temp;

	if (isStringComRepeticaoRecursiva(cpf)) {
		return false;
	}
	
	cpf1 = cpf.substr(0,9); //rcpf1
	cpf2 = cpf.substr(9,2); //rcpf2

    d1 = 0;
    for (i = 0; i < 9; i++) {
	    d1 += cpf1.charAt(i)*(10-i);
	}
    d1 = 11 - (d1 % 11);
    if (d1 > 9) {
    	d1 = 0;
    }
    if (cpf2.charAt(0) != d1) {
		return false;
    }
    d1 *= 2;
    for (i = 0; i < 9; i++) {
        d1 += cpf1.charAt(i) * (11 - i);
	}
    d1 = 11 - (d1 % 11);
    if (d1 > 9) {
    	d1 = 0;
    }
    if (cpf2.charAt(1) != d1) {
		return false;
    }
    return true;
}

// Funcao.....: validarConta
// Objetivo...: Valida o digito verificador da conta informada
// Entrada....: numeroConta - Numero da conta a ser validada
// Exemplo....: if (!validarConta("111111111111-1")) alert("Conta invalida.");
// Autor......: Gustavo Rocha
function validarConta(numeroConta) {
	if (!isVazio(numeroConta)) {
		numeroConta = removerMascara(numeroConta);
		numeroConta = completarComZerosEsquerda(numeroConta, 13);
		var digitoVerificador = parseInt(numeroConta.substr(12, 1), 10);
		numeroConta = numeroConta.substr(0, 12);
		var somaTotal = 0;
		var multiplicador = 2;
		for (i = 11; i >= 0; i--) {
			somaTotal += (parseInt(numeroConta.charAt(i), 10) * multiplicador);
			if (multiplicador == 9) {
				multiplicador = 2;
			} else {
				multiplicador++;
			}
		}
		var resto = somaTotal % 11;
		if (resto == 10) {
			resto = 0;
		}
		return digitoVerificador == resto;
	}
	return true;
}

// Funcao.....: removerMascara
// Objetivo...: Remove a mascara de numeros formatados do tipo CPF, CNPJ, etc.
// Entrada....: numero - Numero formatado ter a sua mascara retirada.
// Exemplo....: removerMascara("111.111.111-11");
// Autor......: Gustavo Rocha
function removerMascara(numero) {
	var retorno = "";
	if (!isVazio(numero)) {
		for (i = 0; i < numero.length; i++) {
			if (numero.charAt(i) != '.' && numero.charAt(i) != '-' && numero.charAt(i) != '/'
					&& numero.charAt(i) != ',') {
				retorno += numero.charAt(i);
			}
		}
	}
	return retorno;
}

// Fun??o.....: isStringComRepeticaoRecursiva
// Objetivo...: Verificar se a string passada como par?metro possui todos os caracteres iguais.
// Exemplo....: isStringComRepeticaoRecursiva("1111111111111")
// Autor......: Gustavo Rocha
function isStringComRepeticaoRecursiva(string) {
	var retorno = true;
	if (string != null && string.length > 0) {
		var primeiroCaractere = string.charAt(0);
		for (i = 1; i < string.length; i++) {
			if (primeiroCaractere != string.charAt(i)) {
				retorno = false;
			}
		}
	} else {
		retorno = false;
	}
	return retorno;
}

// Fun??o.....: bloquearTeclaMovimentacao
// Objetivo...: Bloquear as teclas de movimenta??o, setas, pagUp e home.
// Exemplo....: onkeyDown = bloquearTeclaMovimentacao;
// Autor......: Adriano Pamplona
function bloquearTeclaMovimentacao(){
	var sTeclaBloqueada = new String(" 33 36 37 38 39 40 ");
	var sTeclaCaptada = new String(" "+ event.keyCode +" ");
	if (sTeclaBloqueada.indexOf(sTeclaCaptada) != -1){
		event.keyCode = 0;
		return false;
	}
}

// Fun??o.....: isDataValida
// Objetivo...: Verificar se a o valor digitado ? uma data v?lida.
// Entrada....: valor	<- Data a ser validada.
// Exemplo....: if (!isDataValida("30/02/2000")) alert("Data inv?lida");
function isDataValida(valor) {
	var vDia, vMes, vAno, vNDia, vNMes, vNAno, vNData;

	if (valor.length==0) {
		return true;
	}
	if (valor.length == 7) {
		valor = "01/" + valor;
	}
	if (valor.length != 10) {
		return false;
	}
	if (valor.charAt(2) != "/" || valor.charAt(5) != "/") {
		return false;
	}
	vDia = valor.substr(0,2);
	vMes = valor.substr(3,2);
	vAno = valor.substr(6,4);
	vDia = parseInt(vDia, 10);
	vMes = parseInt(vMes, 10);
	vAno = parseInt(vAno, 10);

	vNData = new Date()
	vNData.setFullYear(vAno,vMes-1,vDia);
	vNDia = vNData.getDate();
	vNMes = vNData.getMonth()+1;
	vNAno = vNData.getFullYear();
	vNDia = parseInt(vNDia, 10);
	vNMes = parseInt(vNMes, 10);
	vNAno = parseInt(vNAno, 10);				
	return ((vDia==vNDia) && (vMes==vNMes) && (vAno==vNAno));
}

// Fun??o.....: isMesAnoValido
// Objetivo...: Verificar se a o valor digitado corresponde a um mes/ano valido.
// Entrada....: valor - mes/ano a ser validado.
// Exemplo....: if (!isMesAnoValido("99/9999")) alert("Data invalida");
function isMesAnoValido(valor){
	var vDia, vMes, vAno, vNDia, vNMes, vNAno, vNData;

	if (valor.length == 0) {
		return true;
	}
	if (valor.length != 7) {
		return false;
	}
	if (valor.charAt(2) != "/"){
		return false;
	}
	valor = "01/" + valor;
	
	return isDataValida(valor);
}

// Funcao.....: isSemestreAnoValido
// Objetivo...: Verificar se a o valor digitado corresponde a um semestre/ano valido.
// Entrada....: valor - semestre/ano a ser validado.
// Exemplo....: if (!isSemestreAnoValido("9/9999")) alert("Data invalida");
function isSemestreAnoValido(valor){
	var vSemestre, vAno;

	if (valor.length == 0) {
		return true;
	}
	if (valor.length != 6) {
		return false;
	}
	if (valor.charAt(1) != "/"){
		return false;
	}
	vSemestre = valor.substr(0,1);
	vAno = valor.substr(2,4);

	return (vSemestre == "1" || vSemestre == "2") && isAnoValido(vAno);
}

// Funcao.....: isAnoValido
// Objetivo...: Verificar se a o valor digitado corresponde a um ano valido.
// Entrada....: valor - ano a ser validado.
// Exemplo....: if (!isAnoValido("9999")) alert("Ano invalido");
function isAnoValido(valor){
	var vDia, vMes, vAno, vNDia, vNMes, vNAno, vNData;

	if (valor.length == 0) {
		return true;
	}
	if (valor.length != 4) {
		return false;
	}
	if (!isNumero(valor)) {
		return false;
	}
	valor = "01/01/" + valor;
	
	return isDataValida(valor);
}

// Fun??o.....: isEmailValido
// Objetivo...: Verificar se um e-mail ? v?lido
// Entrada....: email - E-mail a ser verificado
// Retorno....: true - se o e-mail for v?lido
// Exemplo....: isEmailValido(email@a.ser.validado)
function isEmailValido(email) {	
	
	if (email.length < 5) {
		// Possui menos de 5 caracteres
		return false;
	}
	if (email.indexOf("@") == -1) {
		// N?o possui "@"
		return false;
	}
	if (email.indexOf(".") == -1) {
		// N?o possui "."
		return false;
	}
	if (email.indexOf(" ") != -1) {
		// Possui " "
		return false;
	}
	if (email.indexOf("@.") != -1) {
		// Possui "@."
		return false;
	}
	if (email.indexOf(".@") != -1) {
		// Possui ".@"
		return false;
	}
	if (email.indexOf("..") != -1) {
		// Possui ".."
		return false;
	}
	if (email.indexOf("@") == 0) {
		// Possui "@" na primeira posi??o
		return false;
	}
	if (email.indexOf(".") == 0) {
		// Possui "." na primeira posi??o
		return false;
	}
	if (email.indexOf("@") == email.length - 1) {
		// Possui "@" na ?ltima posi??o
		return false;
	}
	if (email.indexOf(".") == email.length - 1) {
		// Possui "." na ?ltima posi??o
		return false;
	}
	if (email.indexOf("@") != email.lastIndexOf("@")) {
		// Possui mais de uma "@"
		return false;
	}
	return true;
}

// Fun??o.....: validarVariosEmails
// Objetivo...: Verificar se v?rios e-mails s?o v?lidos
// Entrada....: emails - E-mails a serem verificados separados por ";"
// Retorno....: true - se todos os e-mails forem v?lidos
// Exemplo....: validarVariosEmails(email@a.ser.validado1;email@a.ser.validado2;email@a.ser.validado3)
// Autor......: Gustavo Rocha
function validarVariosEmails(emails) {
	var emailsArray = emails.split(";");
	for (i = 0; i < emailsArray.length; i++) {
		if (!isEmailValido(emailsArray[i])) {
			return false;
		}
	}
	return true;
}

// Fun??o.....: existeElementoSelecionado
// Objetivo...: Verificar se existe algum elemento selecionado em uma lista de checkbox ou radiobutton.
// Entrada....: objeto - Objeto do formulario que representa o array de checkbox ou radiobutton.
// Retorno....: true - se existir algum elemento selecionado.
// Exemplo....: if (existeElementoSelecionado(document.manterDemandaForm.codigoDependencia))
// Autor......: Gustavo Rocha
function existeElementoSelecionado(objeto) {
	if (objeto) {
		if (objeto.length == null) {
			if (objeto.checked) {				
				return true;
			}
		} else {
			for (var i = 0; i < objeto.length; i++) {			
				if (objeto[i].checked) {				
					return true;
				}
			}					
		}			
	}
	return false;
}

// Fun??o.....: getValorSelecionado
// Objetivo...: Retorna o valor selecionado em uma lista de radiobutton.
// Entrada....: objeto - Objeto do formulario que representa o array de radiobutton.
// Retorno....: valorSelecionado - valor do elemento selecionado.
// Exemplo....: getValorSelecionado(document.forms[0].radiobuttonArray);
// Autor......: Gustavo Rocha
function getValorSelecionado(objeto) {
	if (objeto) {
		if (objeto.length == null) {
			if (objeto.checked) {				
				return objeto.value;
			}
		} else {
			for (var i = 0; i < objeto.length; i++) {			
				if (objeto[i].checked) {				
					return objeto[i].value;
				}
			}					
		}			
	}
	return null;
}

function replaceAll(str, from, to) {
    var idx = str.indexOf(from);

    while (idx > -1) {
        str = str.replace(from, to); 
        idx = str.indexOf(from);
    }

    return str;
}

function getMensagemSubstituindoArgumentos(mensagem, arg1, arg2) {
	var mensagemAtualizada;

	if (caixa.util.isNeitherUndefinedNorNull(arg2)) {
		mensagemAtualizada = mensagem.replace("|#|", arg1 + " - " + arg2);
	} else {
		mensagemAtualizada = mensagem.replace("|#|", arg1);
	}

	return mensagemAtualizada;
} 

function ehNetscape() {
	return navigator.appName=="Netscape";
}

function ehInternetExplorer() {
	return navigator.userAgent.indexOf("MSIE")!=-1;
}

/**
 * Retorna o c?digo da ?ltima tecla digitada
 */
function getCodigoTecla(evento){
	var codigo = null;
	
	if (ehInternetExplorer()){
		codigo = evento.keyCode;	
	} else {
		codigo = evento.which;
	}
	
	return codigo;
	
}

function bloquearTeclaEnter() {
	if (document.layers) {
		document.captureEvents(Event.KEYPRESS); 
	}
	document.onkeypress = 
		function (evt) { 
			var key = document.layers ? evt.which : document.all ? event.keyCode : (evt.which || evt.charCode || evt.keyCode ); 
			if (key==13) {
				return false;
			}
		}
}

// Valida??o de Data
function verifica_data (campoData) { 
    var situacao = true; 
    var dia = (campoData.substring(0,2)); 
    var mes = (campoData.substring(3,5)); 
    var ano = (campoData.substring(6,10)); 

    // verifica o dia valido para cada mes 
    if ((dia < 01)||(dia < 01 || dia > 30) && (  mes == 04 || mes == 06 || mes == 09 || mes == 11 ) || dia > 31) { 
        situacao = false; 
    } 

    // verifica se o mes e valido 
    if (mes < 01 || mes > 12 ) { 
        situacao = false; 
    } 

    // verifica se e ano bissexto 
    if (mes == 2 && ( dia < 01 || dia > 29 || ( dia > 28 && (parseInt(ano / 4) != ano / 4)))) { 
        situacao = false; 
    } 

	return situacao;
} 
 	
// Valida??o de Hora
function verifica_hora(campoHora){ 
	var situacao = true;
   
    hrs = (campoHora.substring(0,2)); 
    min = (campoHora.substring(3,5)); 
      
	// verifica hora e minuto
	if ((hrs < 00 ) || (hrs > 23) || ( min < 00) ||( min > 59)){ 
		situacao = false; 
	} 
	
	return situacao;
} 

function limitarTextarea(obj) {
    var tecla = window.event.keyCode;
    var tamanho = obj.value.length;

    if (tamanho > obj.maxlength - 1) {
      	obj.value = obj.value.substr(0, obj.maxlength);
      	window.event.returnValue = false;      
    }
    // tratamento para o texto colado
    if (tamanho > obj.maxlength && window.event.type == 'paste') {
      	obj.value = obj.value.substr(0, obj.maxlength);
      	window.event.returnValue = false;      
    } 
}  

// Fun??o.....: isVazio
// Objetivo...: Verificar se o valor passado ? vazio, ou s? tem espa?os em branco.
// Entrada....: sString  <- String a ser analisada
// Exemplo....: alert(isVazio(" "));
function isVazio(sString) {
	if (sString == null) {
		return true;
	}
	var regEspaco = /\s/g;
	sString = sString.replace(regEspaco, "");
	return (sString == "");
} 

function getTextoSelecionadoCombo(obj) {
	return obj.options[obj.selectedIndex].text;
}

function colocarFocoNoElemento(objArray) {
	if (objArray) {
		if (objArray.length == null) {
			objArray.focus();
		} else {
			objArray[0].focus();
		}
	}
}

function isRadioButtonSelecionado(radio){
	// Se existe
	if (radio != undefined) {
		// Existe so um
		if (radio.length == undefined) {
			return radio.checked;
		} else {
			for (var i = 0; i < radio.length; i++) {
				if (radio[i].checked) {
					return true;
				}
			}
		}
	}
	return false;
}

// Funcao.....: validarDataInicialMaiorIgualDataFinal
// Objetivo...: Valida se a data incial eh menor ou igual a data final.
// Entrada....: dataInicial - Data inicial
//				dataFinal - Data final
// Retorno....: boleano true ou false
function validarDataInicialMaiorIgualDataFinal(dataInicial, dataFinal) {
	return compararDatas(dataInicial, dataFinal) >= 0;
}

// Funcao.....: compararDatas
// Objetivo...: Retorna a diferenca de dias entra a data1 e a data2.
// Entrada....: data1 - Data inicial
//				data2 - Data final
// Retorno....: Quantidade de dias entre a data1 e a data2.
function compararDatas(data1, data2) {
	if (data1 != '' && data2 != '') {
		var vNData1 = converterData(data1);
		var vNData2 = converterData(data2);
		
		var dias = (vNData2.getTime() - vNData1.getTime()) / 1000 / 60 / 60 / 24;
		return dias;
	}
	return 0;
}					

// Funcao.....: converterData
// Objetivo...: Converte a data em String para um objeto Date.
// Entrada....: stringDate - Data no tipo String
// Retorno....: Data convertida em Date.
function converterData(stringDate) {
	if (stringDate != null && stringDate != "") {
		var vDia = stringDate.substr(0,2);
		var vMes = stringDate.substr(3,2);
		var vAno = stringDate.substr(6,4);
		vDia = parseInt(vDia, 10);
		vMes = parseInt(vMes, 10);
		vAno = parseInt(vAno, 10);
									
		var data = new Date();
		data.setFullYear(vAno, vMes-1, vDia)
		return data;
	}
	return null;
}

// Fun??o.....: compararHoras
// Objetivo...: Verifica se a hora incial e menor ou igual a hora final.
// Entrada....: hora1 - Hora inicial
//				hora2 - Hora final
// Retorno....: boleano true ou false
function compararHoras(hora1, hora2){
	if (isHoraValida(hora1) && isHoraValida(hora2)){	
		var horaInicial = hora1.split(":");
		var horaFinal = hora2.split(":");
		
		if (horaInicial[0] <= horaFinal[0] && horaInicial[1] <= horaFinal[1]){
			return true;
		}
	}
	return false;
}	

// Fun??o.....: isHoraValida
// Objetivo...: Verifica se a hora digitada ? Valida
// Entrada....: hora	<- Hora a ser validada.
// Exemplo....: if (!isHoraValida("18:00")) alert("Hora inv?lida");
function isHoraValida(hora){
	bHoraValida = true;
	if (hora != ""){
		if (hora.length != 5){
			bHoraValida = false;
		}
		hora = hora.split(":");
		if (hora[0] > 23 || hora[1] > 59){
			bHoraValida = false;
		}
	}
	return bHoraValida;
}

// Fun??o.....: validarHoraMinutoSegundo
// Objetivo...: Verifica se a hora digitada no formato HH:mm:ss é Valida
// Entrada....: horaMinutoSegundo	<- Hora a ser validada.
// Exemplo....: if (!validarHoraMinutoSegundo("32:43:65")) alert("Hora inválida");
function validarHoraMinutoSegundo(horaMinutoSegundo){
	bHoraValida = false;
	if (horaMinutoSegundo != null && horaMinutoSegundo != "" && horaMinutoSegundo.length == 8){
		hora = horaMinutoSegundo.split(":");
		bHoraValida = (hora[0] < 24) && (hora[1] < 60) && (hora[2] < 60);
	}
	return bHoraValida;
}

function getDataAtualFormatada() {
	var dataAtual = new Date();
	return dataAtual.getDate() + "/" + completarComZerosEsquerda(dataAtual.getMonth() + 1, 2) + "/" + dataAtual.getFullYear();
}

function getHoraAtualFormatada() {
	var horaAtual = new Date();
	return horaAtual.getHours() + ":" + horaAtual.getMinutes();
}
	
/*
 * Fun??o utilizada para marcar/desmarcar um conjunto de checkbox.
 * referencia - O checkbox de refer?ncia
 * listaDeCheckBox - A lista de checkBox que ser? marcada/desmarcada
 * Modo de chamar a fun??o no checkbox de refer?ncia:
 * onclick='javascript: check(this, document.forms[0].listadechk);'>
 */
function checkUncheckAll(referencia, listaDeCheckBox) {
	if (listaDeCheckBox == undefined) {
		return;
	}
	if (listaDeCheckBox.length == undefined) {
		listaDeCheckBox.checked = referencia.checked;
	} else {
		for (var i = 0; i < listaDeCheckBox.length; i++) {
			listaDeCheckBox[i].checked = referencia.checked;
		}
	}
}

/*
 * Bloqueia entradas n?o num?ricas
 * Exemplo: onkeydown="bloqueiaEntradasNaoNumericas();"
 */
function bloqueiaEntradasNaoNumericas() {
	var k = event.keyCode;
	var shift = window.event.shiftKey;
	var numeroDoTecladoNumerico = (k >= 96 && k <= 105);
	var numeroDoTecladoNormal = (k >= 48 && k <= 57);
	// outrasTeclas = delete(46) backspace(8) tab(9) home/pageUp/pageDown/setas (33-40)
	var outrasTeclas = (k == 46 || k == 8 || k == 9 || (k >= 33 && k <= 40));
	if (!(numeroDoTecladoNumerico || numeroDoTecladoNormal || outrasTeclas) || shift) {
		event.keyCode=0;
		event.returnValue=false;
	}
}

// Fun??o.....: setFocus
// Objetivo...: Coloca o foco em um campo da tela
// Entrada....: campo - Objeto referente ao campo a ser focado.
// Exemplo....: setFocus(document.forms[0].nomeDoCampo);
function setFocus(campo) {
	foco = false;
	if (campo != null) {
		if (typeof campo == "object") {
			if (campo.type != "hidden") {
				if (campo.length > 1 ){
					if (!campo[0].disabled) { //verificando se o campo est? habilitado
						if (campo.type == "select-one") {
							campo.focus();
						} else {
							campo[0].focus();
						}
						foco = true;
					}
				} else {
					if (!campo.disabled) { //verificando se o campo est? habilitado
						campo.focus();
						foco = true;
					}
				}
			}
		}
	}
}

// Fun??o.....: colocarFocoNoPrimeiroCampoHabilitado
// Objetivo...: Colocar o foco no primeiro campo habilitado da tela
// Exemplo....: colocarFocoNoPrimeiroCampoHabilitado();
function colocarFocoNoPrimeiroCampoHabilitado() {
	if (document.forms[0] != null) {
		num_elementos = document.forms[0].elements.length;
		for (i=0; i < num_elementos; i++) {
			if (document.forms[0].elements[i].type != "hidden") {
			    if(document.forms[0].elements[i].disabled == false) {
					document.forms[0].elements[i].focus();
					break;
			    }
			}
		}
	}
}

function validarCamposObrigatorios(arrayCampos, arrayLabels) {

	var objeto;
	var objetoFocus;
	var mensagemPadrao = mensagemCampoObrigatorioPadrao;
	var mensagemAlerta = '';
	var validou = true;
	for (var i = 0; i < arrayCampos.length; i++) {
		objeto = eval('document.forms[0].' + arrayCampos[i]);
		if (isVazio(objeto.value)) {
			if (isVazio(mensagemAlerta)) {
				mensagemAlerta = mensagemPadrao.replace('null', arrayLabels[i]);
				objetoFocus = objeto;
			} else {
				mensagemAlerta = mensagemAlerta + '\n' + mensagemPadrao.replace(
						'null', arrayLabels[i]);
			}
		}
	}
	
	if (!isVazio(mensagemAlerta)) {
		alert(mensagemAlerta);
		validou = false;
		if (objetoComFoco(objetoFocus)) {
			objetoFocus.focus();
		}
	}
	
	return validou;
} 

function mudaCorDaLinha(linha, cor, link,  subl) { 
	linha.bgColor = cor; 
	if (subl) { 
		link.style.color		= 'ff6d00'; 
	} else {
		link.style.color		= '414244'; 
	}
}

function isCodigoDemandaValido(codigoDemanda) {
	if (isVazio(codigoDemanda)) {
		return true;
	}
	
	var codigoDemandaAno = codigoDemanda.split('/');
	if (codigoDemandaAno[0] == null || codigoDemandaAno[1] == null 
			|| !isNumero(codigoDemandaAno[0] + codigoDemandaAno[1])) {
		return false;
	}
	return (codigoDemandaAno[0].length == 6 && codigoDemandaAno[1].length == 4);
}

function limparCampos() {

	var campos = document.forms[0].elements;
	var campoText = false;
		
	for (var i = 0; i < campos.length; i++) {
		campoText = ehCampoText(campos[i]);
		if (campoText) {
			campos[i].value = '';
		}
		if(ehSelect(campos[i])){
			campos[i].selectedIndex = 0;
		}else if (ehCampoCheckBox(campos[i])) {
			campos[i].checked = false;
		}
		
	}
}
function ehSelect(campo){
	var tipoCampo = campo.type.toLowerCase();
	return (tipoCampo == 'select-one');
}

function ehCampoText(campo) {
	if (campo) {
		var tipoCampo = campo.type.toLowerCase();
		if (tipoCampo == 'text' || tipoCampo == 'textarea' 
				|| tipoCampo == 'password' ) {
			return true;
		}
	}
	return false;
}

function ehCampoCheckBox(campo) {
	if (campo) {
		var tipoCampo = campo.type.toLowerCase();
		if (tipoCampo == 'checkbox') {
			return true;
		}
	}
	return false;
}

function isAnoValido(valor) {
	if (!isVazio(valor)) {	
		return (parseInt(valor) > 0 && valor.length == 4);
	}
	return true;
}

function isPeriodoAnoValido(anoInicial, anoFinal) {
	if (!(isVazio(anoInicial) && isVazio(anoFinal)) && isAnoValido(anoInicial) 
			&& isAnoValido(anoFinal)) {
		if ((isVazio(anoInicial) && !isVazio(anoFinal))
				|| (!isVazio(anoInicial) && isVazio(anoFinal))) {
			return false;
		}
		return (parseInt(anoInicial) <= parseInt(anoFinal));
	}
	return true;
}

function validarFormato(arrayFuncoes, arrayCampos, arrayLabels) {
	var mensagem = '';
	var validou = true;
	var objetoFocus;
	for (var i = 0; i < arrayFuncoes.length; i++) {
		objeto = eval('document.forms[0].' + arrayCampos[i]);
		if (!eval(arrayFuncoes[i] + "('" + objeto.value + "')")) {
			if (isVazio(mensagem)) {
				mensagem = mensagemCampoInvalidoPadrao.replace('null', arrayLabels[i]);
				objetoFocus = objeto;
			} else {
				mensagem = mensagem + '\n' + mensagemCampoInvalidoPadrao
						.replace('null', arrayLabels[i]);
			}
		}
	}
	
	if (!isVazio(mensagem))  {
		alert(mensagem);
		validou = false;
		if (objetoComFoco(objetoFocus)) {
			objetoFocus.focus();
		}
	}
	return validou;
}

function validarFormatoComMensagens(arrayFuncoes, arrayCampos, arrayMensagens) {
	var mensagem = '';
	var validou = true;
	var objetoFocus;
	for (var i = 0; i < arrayFuncoes.length; i++) {
		objeto = eval('document.forms[0].' + arrayCampos[i]);
		if (!eval(arrayFuncoes[i] + "('" + objeto.value + "')")) {
			if (isVazio(mensagem)) {
				mensagem = arrayMensagens[i];
				objetoFocus = objeto;
			} else {
				mensagem = mensagem + '\n' + arrayMensagens[i];
			}
		}
	}
	
	if (!isVazio(mensagem))  {
		alert(mensagem);
		validou = false;
		if (objetoComFoco(objetoFocus)) {
			objetoFocus.focus();
		}
	}
	return validou;
}

function objetoComFoco(objeto) {
	return (objeto != null && objeto.type != 'hidden' && !objeto.disabled 
			&& !objeto.readonly);
}

function trim(valor) {
	var regEspaco = /\s/g;
	var novoValor = '';
	if (valor) {
		novoValor = valor.replace(regEspaco, "");
	}
	return novoValor;
}

function quebrarString(stringAlvo, delimitador) {
	var valores = new Array();
	if (stringAlvo) {
		valores = stringAlvo.split(delimitador);
	}
	return valores;
}

function setValoresJanelaPai(arrayValores) {
	var arrayCampos = quebrarString(document.forms[0].campos.value, ";");
	var formPai = window.opener.document;
	var objetoFoco;
	try {
		if (formPai) {
			if (arrayValores) {
				var tamanho = ((arrayValores.length > arrayCampos.length) ? arrayCampos.length : arrayValores.length);
				var objeto;
				for (var i = 0; i < tamanho; i++) {
					objeto = formPai.getElementsByName(arrayCampos[i]);
					if(objeto.length > 0){
						objeto[0].value = trim(arrayValores[i]);
						if (i == 0) {
							objetoFoco = objeto[0];
						}
					}
				}
			}
			if (objetoComFoco(objetoFoco)) {
				objetoFoco.focus();
			}
			if (window.opener.posSelecionar) {
				window.opener.posSelecionar();
			}
			window.close();
		}
	} catch(e) {
		alert(e);
	}
}

function exibeDetalheErro(id) {
	var obj = document.all[id];
	if (obj.style.display == "none") {
		obj.style.display = "";
	} else {
		obj.style.display = "none";
	}
}

// Funcao.....: adicionarTodos
// Objetivo...: Passar todos os itens da list de origem para a de destino.
// Entrada....: listOri - Lista de origem dos elementos.
//				listDest - Lista de destino dos elementos.
// Exemplo....: adicionarTodos(document.forms[0].listOrigem, document.forms[0].listDestino);
// Autor......: gujs.com.br
// Adaptacao..: Gustavo Rocha
function adicionarTodos(listOri, listDest) {
  for(var i = 0; i < listOri.length; i++) {
    var opcao = listOri.options[i];
    var novaOpcao = new Option(opcao.text, listDest.length);
    novaOpcao.value = opcao.value;
    listOri.remove(i);
    try {
      listDest.add(novaOpcao,null);
    } catch (e) {
      listDest.add(novaOpcao);
    }
    i--;
  }
  ordenarOpcoesSelect(listDest);
}

// Funcao.....: removerTodos
// Objetivo...: Passar todos os itens da list de destino para a de origem.
// Entrada....: listOri - Lista de origem dos elementos.
//				listDest - Lista de destino dos elementos.
// Exemplo....: removerTodos(document.forms[0].listOrigem, document.forms[0].listDestino);
// Autor......: gujs.com.br
// Adaptacao..: Gustavo Rocha
function removerTodos(listOri, listDest) {
  for(var i = 0; i < listDest.length; i++) {
    var opcao = listDest.options[i];
    var novaOpcao = new Option(opcao.text, listOri.length);
    novaOpcao.value = opcao.value;
    listDest.remove(i);
    try {
      listOri.add(novaOpcao,null);
    } catch (e) {
      listOri.add(novaOpcao);
    }
    i--;
  }
  ordenarOpcoesSelect(listOri);
}

// Funcao.....: adicionarSelecionados
// Objetivo...: Passar apenas os itens selecionados da origem para o destino.
// Entrada....: listOri - Lista de origem dos elementos.
//				listDest - Lista de destino dos elementos.
// Exemplo....: adicionarSelecionados(document.forms[0].listOrigem, document.forms[0].listDestino);
// Autor......: gujs.com.br
// Adaptacao..: Gustavo Rocha
function adicionarSelecionados(listOri, listDest) {
  for(var i = 0; i < listOri.length; i++) {
    var opcao = listOri.options[i];
    if(opcao.selected) {
      var novaOpcao = new Option(opcao.text, listDest.length);
      novaOpcao.value = opcao.value;
      listOri.remove(i);
      try {
        listDest.add(novaOpcao,null); //Firefox
      } catch(e) {
        listDest.add(novaOpcao); //IE
      }
      i--;
    }
  }
  ordenarOpcoesSelect(listDest);
}

// Funcao.....: removerSelecionados
// Objetivo...: Passar apenas os itens selecionados do destino para a origem.
// Entrada....: listOri - Lista de origem dos elementos.
//				listDest - Lista de destino dos elementos.
// Exemplo....: removerSelecionados(document.forms[0].listOrigem, document.forms[0].listDestino);
// Autor......: gujs.com.br
// Adaptacao..: Gustavo Rocha
function removerSelecionados(listOri, listDest) {
  for(var i = 0; i < listDest.length; i++) {
    var opcao = listDest.options[i];
    if(opcao.selected) {
      var novaOpcao = new Option(opcao.text, listOri.length);
      novaOpcao.value = opcao.value;
      listDest.remove(i);
      try {
        listOri.add(novaOpcao,null);
      } catch (e) {
        listOri.add(novaOpcao);
      }
      i--;
    }
  }
  ordenarOpcoesSelect(listOri);
}

// Funcao.....: ordenarOpcoesSelect
// Objetivo...: Ordenar alfabeticamente as opções de um objeto do tipo "select" de acordo com seu label.
// Entrada....: obj - Objeto do tipo "select" que possui as opções a serem ordenadas.
// Exemplo....: ordenarOpcoesSelect(document.forms[0].select);
function ordenarOpcoesSelect(obj) {
    var o = new Array();
    for (var i=0; i<obj.options.length; i++){
        o[o.length] = new Option(obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected);
    }
    o = o.sort(
        function(a,b){ 
            if ((a.text+"") < (b.text+"")) { return -1; }
            if ((a.text+"") > (b.text+"")) { return 1; }
            return 0;
        } 
    );

    for (var i=0; i<o.length; i++){
        obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
    }
}

// Funcao.....: adicionarOpcaoSelect
// Objetivo...: Adiciona uma nova opção a um objeto do tipo select.
// Entrada....: select - Lista onde será adicionada uma nova opção.
//				label - Texto descritivo da nova opção.
//				value - Valor oculto (identificador) da nova opção.
// Exemplo....: adicionarOpcaoSelect(document.forms[0].select, "texto", "valor");
// Autor......: Gustavo Rocha
function adicionarOpcaoSelect(select, label, value) {
	var novaOpcao = new Option(label, select.length);
    novaOpcao.value = value;
    try {
      select.add(novaOpcao,null); //Firefox
    } catch(e) {
      select.add(novaOpcao); //IE
    }
  	ordenarOpcoesSelect(select);
}

// Funcao.....: removerOpcoesSelecionadas
// Objetivo...: Remove as opções selecionadas em um objeto do tipo select.
// Entrada....: select - Lista onde serão removidas as opções.
// Exemplo....: removerOpcoesSelecionadas(document.forms[0].select);
// Autor......: Gustavo Rocha
function removerOpcoesSelecionadas(select) {
  for(var i = 0; i < select.length; i++) {
    var opcao = select.options[i];
    if(opcao.selected) {
      select.remove(i);
      i--;
    }
  }
}

// Funcao.....: removerTodasOpcoes
// Objetivo...: Remove todas as opções de um objeto do tipo select.
// Entrada....: select - Lista onde serão removidas as opções.
// Exemplo....: removerTodasOpcoes(document.forms[0].select);
// Autor......: Gustavo Rocha
function removerTodasOpcoes(select) {
  for(var i = 0; i < select.length; i++) {
      select.remove(i);
      i--;
  }
}

// Funcao.....: removerTodasOpcoesExcetoPrimeira
// Objetivo...: Remove todas as opções de um objeto do tipo select e mantém a primeira opção (Default).
// Entrada....: select - Lista onde serão removidas as opções.
// Exemplo....: removerTodasOpcoes(document.forms[0].select);
// Autor......: Gustavo Rocha
function removerTodasOpcoesExcetoPrimeira(select) {
  for(var i = 1; i < select.length; i++) {
      select.remove(i);
      i--;
  }
}

function quebrarString(stringAlvo, delimitador) {
	var valores = new Array();
	if (stringAlvo) {
		valores = stringAlvo.split(delimitador);
	}
	return valores;
}

function selecionarOpcaoPeloValue(select, value) {
	for (var i = 0; i < select.options.length; i++) {
		var opcao = select.options[i];
		if (opcao.value == value) {
			opcao.selected = true;
		}
	}
}

function selecionarOpcoesSelectMultiple(select, array) {
	for (var i = 0; i < array.length; i++) {
		selecionarOpcaoPeloValue(select, array[i]);
	}
}

function selecionarTodasOpcoes(select) {
	for (var i = 0; i < select.options.length; i++) {
		select.options[i].selected = true;
	}
}

function removerSelecaoTodasOpcoes(select) {
	for (var i = 0; i < select.options.length; i++) {
		select.options[i].selected = false;
	}
}

function getQuantidadeValoresSelecionados(select) {
	var count = 0;
	for (var i = 0; i < select.options.length; i++) {
		if (select.options[i].selected) {
			count++;
		}
	}
	return count;
}

function getValoresCombo(select) {
	var retorno = "";
	for (var i = 0; i < select.options.length; i++) {
		retorno += select.options[i].value + SEPARADOR;
	}
	return retorno;
}

function getArrayValoresCombo(select) {
	var retorno = new Array();
	for (var i = 0; i < select.options.length; i++) {
		retorno[i] = select.options[i].value;
	}
	return retorno;
}

function getTextoValoresCombo(select) {
	var retorno = "";
	for (var i = 0; i < select.options.length; i++) {
		retorno += select.options[i].text + SEPARADOR;
	}
	return retorno;
}

function completarComEspacosDireita(sString, iQtdCasas) {
	sString = sString.toString();
	while (sString.length < iQtdCasas) {
		sString = sString + " ";
	}
	return sString;
}

function f_sTiraCaracter(sString, sChar) {
	var sBusca = new RegExp("["+sChar+"]","g");
	sString = sString.replace(sBusca,"");
	return (sString);
}

function retiraZerosAEsquerda(oObjeto) {
	var resposta = oObjeto;
	while (resposta != null && resposta.length > 0 
				&& resposta.charAt(0) == 0) {
			resposta = resposta.substr(1);
		}
	return resposta;
}					

/* Inverte a ordem da string: "abc" -> "cba". */
function stringReverse(sString) {
  return sString.split('').reverse().join('');
}

