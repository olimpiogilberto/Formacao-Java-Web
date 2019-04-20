/*
 * Scripts de ajuste do menu da caixa para que funcione no Internet Explorer.
 * 
 * @autor Adriano Pamplona
 * dependências: nenhuma
 */
 
/**
 * Carrega o menu vertical para que funcione no IE.
 * Será atribuído onmouseover e onmouseout nos LI's do menu.
 */
function carregarMenuCaixa() {
	if (isIE()) {
		var menuUL = document.getElementById("menu-vertical");
		if (menuUL != null) {
			var lis = menuUL.getElementsByTagName("li");
			for (var index=0; index < lis.length; index++) {
				var li = lis[index];
				
				li.onmouseover=function() { 
					over(this);
				}
				li.onmouseout=function() { 
					out(this); 
				}
			}
			
			ajustarAlturaDosIframes();

		}
	}
}

/**
 * Função invocada no evento onmouseover do LI.
 */
function over(li) {
	alterarDisplayDoIframe(li, "block");
	li.className += " over";
}

/**
 * Função invocada no evento onmouseout do LI.
 */
function out(li) {
	alterarDisplayDoIframe(li, "none");
	li.className = "";
}

/**
 * Função invocada no quando o menu é carregado, essa função tem o objetivo
 * de ajustar a altura do IFRAME para que fique do mesmo tamanho do menu.
 * Para que esse ajuste seja feito será necessário alterar o display dos 
 * UL's para block, redimencionar o iframe e depois voltar o display dos 
 * UL's para vazio.<b>
 */
function ajustarAlturaDosIframes() {
	var menuUL = document.getElementById("menu-vertical");
	
	var uls = menuUL.getElementsByTagName("UL");
	for (var indice = (uls.length-1); indice >= 0 ; indice--) {
		uls[indice].style.display = "block";
	}
	
	var iframes = menuUL.getElementsByTagName("IFRAME");
	for (var indice = (iframes.length-1); indice >= 0; indice--) {
		var iframe = iframes[indice];
		var ul = iframe.nextSibling;
		iframe.style.height = ul.offsetHeight +"px";
	}
	
	var uls = menuUL.getElementsByTagName("UL");
	for (var indice = (uls.length-1); indice >= 0 ; indice--) {
		uls[indice].style.display = "";
	}
}

/**
 * Função responsável alterar o display do IFRAME interno do li passado por 
 * parâmetro.
 */
function alterarDisplayDoIframe(li, display) {
	var iframe = li.getElementsByTagName("IFRAME")[0];
	if (iframe != null) {
		iframe.style.display = display;
	}
}

/**************************************************************************
 * Include do JS browser.js
 ******************************************************************************/
/*
 * Scripts de detecção do tipo do Browser.
 * 
 * @autor Adriano Pamplona
 * dependências: nenhuma
 */
 
var IE4 	= false; //Internet explorer 4
var IE5 	= false; //Internet explorer 5 ou superior
var NS4 	= false; //Netscape 4
var NS5 	= false; //Netscape 5 ou superior.
var AOL 	= false; //AOL
var OPERA 	= false; //Opera

/*
 * true se o browser for Internet Explorer.
 */
function isIE() {
	return (isIE4() || isIE5());
}

/*
 * true se o browser for Netscape, Firefox ou Mozila.
 */
function isNS() {
	return (isNS4() || isNS5());
}

/*
 * true se o browser for IE4.
 */
function isIE4() {
	loadBrowserTypes();
	return IE4;
}

/*
 * true se o browser for IE5.
 */
function isIE5() {
	loadBrowserTypes();
	return IE5;
}

/*
 * true se o browser for Netscape 4.
 */
function isNS4() {
	loadBrowserTypes();
	return NS4;
}

/*
 * true se o browser for Netscape 5.
 */
function isNS5() {
	loadBrowserTypes();
	return NS5;
}

/*
 * true se o browser for AOL.
 */
function isAOL() {
	loadBrowserTypes();
	return AOL;
}

/*
 * true se o browser for Opera.
 */
function isOpera() {
	loadBrowserTypes();
	return OPERA;
}


/*******************************************************************************
 * Functions privadas do arquivos browser.js.
 ******************************************************************************/
/*
 * Carrega as constantes que representam os diversos Browsers.
 */
function loadBrowserTypes() {
	if (document.images) {
		if (navigator.userAgent.indexOf("Opera") != -1) {
			OPERA = true;
		} else {
			if (navigator.userAgent.indexOf("AOL") != -1) {
				AOL = true;
			} else {
				IE5 = (document.all != null && document.getElementById != null);
				IE4 = (document.all != null && !document.getElementById != null);
				NS4 = (document.layers != null);
				NS5 = (document.addEventListener != null);
			}
		}
	} else {
		alert("Você está usando uma versão inferior à versão 4");
	}
}