/*
 As seguintes convencoes devem ser utilizadas:

	- Para bloquear a entrada somente para digitos deve-se formatar a mascara utilizando '9'
			Ex: 99/99/9999  formatando datas
	- Para bloquear a entrada somente para letras e digitos deve-se formatar a mascara utilizando '#'
			Ex: ###.###
	- A quantidade de caracteres permitida sera limitada pela propriedade maxlength e pela mascara especificada
	- Deve-se utilizar colchetes para especificar caracteres de repeticao
			Ex: [###.]###,##    formatando valores

	Segue alguns exemplos das mascaras mais comuns:
      - (###)               --> DDD.  
      - ##                  --> Numero inteiro, ignora do 3 em diante      
	  - ####-#### 			--> Telefone de 8 digitos
      - ##/##/####          --> Data com dia, mes e ano
      - ##/##               --> Data com dia, mes
      - ##:##:##            --> Horario com: hora, minuto, segundo
      - ##:##               --> Horario com: hora, minuto
      - ####/##/##          --> Data (invertida) ano, mes, dia
      - ##.###-###          --> CEP
      - ###.###.###-##      --> CPF
      - ##.###.###/####-##  --> CGC
      - [###.]###           --> Numero inteiro (que pode variar)
      - [###.]###,##        --> Dinheiro (que pode variar)<br>
*/

var TECLAS_DE_CONTROLE = " 8 9 13 16 17 18 19 20 27 33 34 35 36 37 38 39 40 91 92 93 144 145 ";
var NUMEROS	= "0123456789";
var MINUSCULAS	= "abcdefghijklmnopqrstuvwxyzáàãâéêíîóõôúûüç";
var MAIUSCULAS	= MINUSCULAS.toUpperCase();
var ESPECIAIS	= " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~¨´\f\r\n¹²³£¢¬§ªº°";

/**
 * Função geral de máscara de formatação de campo.
 *
 * @param obj
 *				Elemento DOM que será mascarado.
 * @param mascara
 *				Máscara de formatação.
 * @param event
 *				Evento que será processado pela função de mascaramento.
 * @param invertida
 *				A função de mascaramento será aplicada da direita para esquerda se o parâmetro <param>invertida</param>
 				for boolean <code>true</code>. Ou, da esquerda para direita em caso contrário.
 *
 * <pre>
 * Por exemplo,
 *
 * onkeypress="mascararCampo(this, '999,99', event);"
 * </pre>
 */
function mascararCampo(obj, mascara, event, invertida) {
	if (!isTeclaControle(event)) {
		var texto = obj.value;
		var max = mascara.length;

		if (buscarDigito(mascara, '#') != -1) {
			mascararAlfanumerico(obj, mascara, event, invertida);
		} else if (buscarDigito(mascara, '9') != -1) {
			mascararNumerico(obj, substituiPorCerquilha(mascara), event, invertida);
		}
	}
}

function isTeclaControle(event) {
	var char = getKeyValue(event);
	return !isCaractereEspecial(char) && !isCaractereAlfanumerico(char);
}

function isCaractereEspecial(char) {
	return ESPECIAIS.indexOf(char) != -1;
}

function isCaractereNumerico(char) {
	return NUMEROS.indexOf(char) != -1;
}

function isCaractereAlfabetico(char) {
	return MINUSCULAS.indexOf(char) != -1 || MAIUSCULAS.indexOf(char) != -1;
}

function isCaractereAlfanumerico(char) {
	return isCaractereNumerico(char) || isCaractereAlfabetico(char);
}

//Funcao que retorna -1 caso nao encotre o digito desejado, se encontrar retorna o indice onde ele foi encontrado
function buscarDigito(valor, digito){
	return valor.indexOf(digito);
}

//Funcao que bloqueia a entrada apenas para digito e letras
function mascararAlfanumerico(obj, mascara, event, invertida){
	if (!isCaractereAlfanumerico(getKeyValue(event)) || obj.value.length > obj.maxLength) {
		pararEvento(event);
	} else {
		obj.value = limparEntradaAlfanumerica(obj);
		mascarar(obj, mascara, event, invertida);
	}
}

//Funcao que bloqueia a entrada apenas para digito
function mascararNumerico(obj, mascara, event, invertida) {
	if (!isCaractereNumerico(getKeyValue(event)) || obj.value.length > obj.maxLength) {
		pararEvento(event);
	} else {
		obj.value = limparEntradaNumerica(obj);
		mascarar(obj, mascara, event, invertida);
	}
}

//funcao que deixa apenas os numeros e as letras
function limparEntradaAlfanumerica(obj) {
	var texto = "";
    for (i = 0; i < obj.value.length; i++) {
		var temp = obj.value.substring(i, i + 1);
		if (isCaractereAlfanumerico(temp)) {
			texto = texto + obj.value.substring(i, i + 1);
        }	
    }
	return texto;
}

//funcao que deixa apenas os numeros
function limparEntradaNumerica(obj) {
	var texto = "";
    for (i = 0; i < obj.value.length; i++) {
		var temp = obj.value.substring(i, i + 1);
		if (isCaractereNumerico(temp)) {
			texto = texto + obj.value.substring(i, i + 1);
        }	
    }
	return texto;
}

function pararEvento(event) {
	if (event.which) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}

//Funcao que coloca as mascaras
function mascarar(obj, mascara, event, invertida){
	var valor_duplicar = "";
	var valor_completar = "";
	var colchete_abre = abriuColchete(mascara);
	var colchete_fecha = fechouColchete(mascara)
	var retorno = "";
	var tam_cerquilha = contaCerquilha(mascara);		
	var texto = obj.value + getKeyValue(event);

	pararEvento(event);

	var textoSelecionado = "";
	if (document.selection) { // IE
		if (document.selection.type == "Text") {
			textoSelecionado = document.selection.createRange().text;
		}
	} else { // FF
		textoSelecionado = obj.value.substring(obj.selectionStart, obj.selectionEnd);
	}
	if (textoSelecionado.length > 0) {
		texto = obj.value.replace(textoSelecionado, getKeyValue(event));
	} else if (colchete_abre == -1 && texto.length > tam_cerquilha) {
		texto = obj.value;
	}
	
	mascara = limpaMascara(mascara);

	if (invertida === true) {
		texto = stringReverse(texto);	
		mascara = stringReverse(mascara);
	}
			
	//aumenta a mascara quando existem colchetes
	if (colchete_abre < colchete_fecha && colchete_abre != -1 && colchete_fecha != -1) {
		var tamanhoDoTexto = 1 + obj.value.length;
		valor_duplicar = mascara.substring(colchete_abre + 1, colchete_fecha);
		valor_completar = mascara.substring(colchete_fecha + 1);
	
		while (contaCerquilha(valor_completar) < tamanhoDoTexto) {
			valor_completar = valor_duplicar + valor_completar;				
		}			
		mascara = valor_completar;
	
		var j = texto.length-1;											
		for (i = mascara.length-1; i > -1 && j > -1; i--) {		
			if (mascara.substring(i, i + 1) == "#") {
				retorno = texto.substring(j, j + 1) + retorno;
				j--;							
			} else {
				retorno = mascara.substring(i, i + 1) + retorno;
			}				
		}
	} else { //Caso nao tenha colchetes
		var j = 0;											
		for (i = 0 ; i < mascara.length && j < texto.length; i++) {
			if (mascara.substring(i, i + 1) == "#") {
				retorno = retorno + texto.substring(j, j + 1);
				j++;							
			} else {
				retorno = retorno + mascara.substring(i, i + 1);
			}				
		}
		var f = mascara.length;
		while (mascara.substring(f - 1, f) != "#") {
			retorno = retorno + mascara.substring(f - 1, f);
			f--;
		}
	}

	if (invertida === true) {
		retorno = stringReverse(retorno);
	}

	obj.value = retorno.toUpperCase();
}

//Funcao que retorna o indice onde foi encontrado um [
function abriuColchete(mascara) {
	var posicao = -1;

	//verificar se existe colchete abrindo e fechando
    for (i = 0; i < mascara.length; i++) {
		var sub = mascara.substring(i, i + 1);
		if( sub == '[' ){
			posicao = i;
        }
    }
	return posicao;
}

//Funcao que retorna o indice onde foi encontrado um ]
function fechouColchete(mascara) {
	var posicao = -1;

	//verificar se existe colchete abrindo e fechando
    for (i = 0; i < mascara.length; i++) {
		var sub = mascara.substring(i, i + 1);
		if (sub == ']' ){
            posicao = i;
        }
    }
	return posicao;
}

//funcao que conta quantas cerquilhas tem na palavra
function contaCerquilha(mascara){
	var cont_cerquilha = 0;
	for (i = 0; i < mascara.length; i++){
		if (mascara.substring(i,i+1) == "#"){
			cont_cerquilha++;
        }
	}
	return cont_cerquilha;
}

//Funcao que retira os espacos em branco antes e depois da mascara
function limpaMascara(mascara){
	var masc = "";
    for (i = 0; i < mascara.length; i++) {
		var sub = mascara.substring(i, i + 1);
		if (sub != " "){
            masc = masc + sub;
        }
    }
	return masc;
}

function substituiPorCerquilha(mascara){
	var masc = "";
	//verificar se existe colchete abrindo e fechando
    for (i = 0; i < mascara.length; i++) {
		var sub = mascara.substring(i,i+1);
		if (sub == '9') {
			masc = masc + '#';
        } else {
			masc = masc + sub;
		}
    }
	return masc;
}

//Funcao para mascarar valores monetários. 
//Ex.: onkeypress="return mascararValorMonetario(this, '[999.]999,9999', event);"
function mascararValorMonetario(obj, mascara, event) {
	if (!isTeclaControle(event)) {
		if (!isCaractereNumerico(getKeyValue(event))) {
			pararEvento(event);
		} else {
			var texto = preMascara(obj, event);
			mascararNumerico(texto, substituiPorCerquilha(mascara), event);
		}
	}
}

//Funcao que poe zeros a esquerda para valores com quatro casas decimais.
function preMascara(oCampo, event) {
    var iMax = 0;
    var codigoTecla = getKeyCode(event);
    var valorTecla = getKeyValue(event);
    var sBuffer = "";
    var sTexto = oCampo.value;
    var rReg = /[\.,]/g;
    
    sTexto = sTexto.replace(rReg, "");
    if (sTexto.length < oCampo.maxLength) {
	    if (sTexto != "") {
	      	iMax = parseInt(sTexto, 10);
	    }
	    sTexto = "" + iMax;
	    if (sTexto.length < 5) {
	      	for (var nIdx = 0; nIdx <= 5; nIdx++) {
	        	sBuffer += "0";
	      	}
	      	sBuffer += sTexto + valorTecla;
	    	if ((codigoTecla == 8) || (codigoTecla == 46)) {
	     		sBuffer = sBuffer.substring(sBuffer.length - 6)
	    	} else {
	      		sBuffer = sBuffer.substring(sBuffer.length - 5)
	    	}
	      	oCampo.value = sBuffer;
	    } else {
	      	sBuffer += sTexto + valorTecla;
	      	oCampo.value = sBuffer;
	    }
	}
	
    return oCampo;
}


