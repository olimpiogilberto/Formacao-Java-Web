/**
 * Biblioteca para operacoes de manipulacao de elementos DOM.
 *
 * Namespace: caixa.util.html.
 *
 * @author <a href="mailto:mario.f.ferreira@caixa.gov.br">Mário Sérgio Fujikawa Ferreira
 *         <mario.f.ferreira@caixa.gov.br> (C101038)</a>
 */

/**
 * "Objeto" para verificar as dependências necessárias para utilização do código do pacote
 * de namespace caixa.util.html.
 *
 * Namespace: não se aplica
 * Classe: _CheckRequiredDependency
 * Construtor: não se aplica
 * Visibilidade: Privada
 * Métodos públicos estáticos: check()
 */
var _CheckRequiredDependency = {
	NAMESPACE: 'caixa.util.html',

	check: function() {
		// caixa.util
		if
		(
			(typeof caixa == 'undefined') ||
			(typeof caixa.util == 'undefined') ||
			(typeof caixa.util.isNeitherUndefinedNorNull == 'undefined') ||
			(typeof caixa.util.isNeitherUndefinedNorNull == null)
		)
		{
			throw(this.NAMESPACE + " requer caixa.util");
		}
	}
};

_CheckRequiredDependency.check();

/**
 * Cria namespace caixa.
 */
if (caixa == null)
	var caixa = {};

/**
 * Cria namespace caixa.util.
 */
if (caixa.util == null)
	caixa.util = {};

/**
 * Cria namespace caixa.util.html.
 */
if (caixa.util.html == null)
	caixa.util.html = {};

/**
 * "Classe" para verificar se todos as dependências necessárias para utilização do código do pacote
 * de namespace caixa.util.html.
 *
 * Namespace: caixa.util.html
 * Classe: CheckRequiredDependency
 * Construtor: não se aplica
 * Visibilidade: Pública
 * Métodos públicos estáticos: check()
 */
if (caixa.util.html.CheckRequiredDependency == null) {
	caixa.util.html.CheckRequiredDependency = _CheckRequiredDependency;
}

/**
 * "Classe" para criacao e manipulacao de element DOM DIV para bloqueio de acesso a elementos da pagina.
 *
 * Namespace: caixa.util.html
 * Classe: DivProtector
 * Construtor: DivProtector(document)
 * Metodos publicos: enable(), disable()
 */
if (caixa.util.html.DivProtector == null) {
	/**
	 * Construtor.
	 * 
	 * Exemplo:
	 * 
	 * DivProtector(this.document);
	 * 
	 * @param document
	 *            Elemento DOM 'document' no qual sera utilizada esta classe.
	 */
	caixa.util.html.DivProtector = function(document) {
		this.document = document;

		this.divXOrigin = 0;
		this.divYOrigin = 0;
		this.divHeight = 10000;
		this.divWidth = 10000;
		this.parent = this;
	};

	caixa.util.html.DivProtector.prototype = {
		_enable : function() {
			var disabledZone = this.document.getElementById('disabledZone');

			if (disabledZone == null) {
				disabledZone = this.document.createElement('div');
				disabledZone.setAttribute('id', 'disabledZone');
				disabledZone.style.position = "absolute";
				disabledZone.style.zIndex = "999";
				disabledZone.style.top = "0";
				disabledZone.style.left = "0";
				disabledZone.style.right = "0";
				disabledZone.style.bottom = "0";
				disabledZone.style.width = "100%";
				disabledZone.style.height = "100%";
				disabledZone.style.opacity = "0.30";
				disabledZone.style.filter = "alpha(opacity=30)";
				disabledZone.style.backgroundColor = "#000000";

				this.document.body.appendChild(disabledZone);
			} else {
				disabledZone.style.visibility = 'visible';
			}
		},

		_disable : function() {
			var disabledZone = this.document.getElementById('disabledZone');

			if (disabledZone != null) {
				disabledZone.style.visibility = 'hidden';
			}
		},
		
		_isInternetExplorer6OrLower : function() {
			var browser = navigator.appName;
			var ie6OrLower = false;

			if (browser == 'Microsoft Internet Explorer') {
				var ua = navigator.userAgent;
				var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

				if (re.exec(ua) != null) {
					var version = parseFloat(RegExp.$1);

					if (version < 7) {
						ie6OrLower = true;
					}
				}
			}

			return ie6OrLower;
		},

		_setVisibilityAllSelectCombo : function(x, y, w, h, visibility) {
			var selx, sely, selw, selh, i;
			var sel = this.document.getElementsByTagName("SELECT");

			for (i = 0; i < sel.length; i++) {
				var selp;

				selx = 0;
				sely = 0;

				if (sel[i].offsetParent) {
					selp = sel[i];
					while (selp.offsetParent) {
						selp = selp.offsetParent;
						selx += selp.offsetLeft;
						sely += selp.offsetTop;
					}
				}

				selx += sel[i].offsetLeft;
				sely += sel[i].offsetTop;
				selw = sel[i].offsetWidth;
				selh = sel[i].offsetHeight;

				if ( ((selx + selw) > x) && (selx < (x + w)) && ((sely + selh) > y) && (sely < (y + h)) ) {
					if (sel[i].style.visibility != visibility) {
						sel[i].style.visibility = visibility;
					}
				}
			}
		},

		_hideAllSelectCombo : function() {
			this._setVisibilityAllSelectCombo(this.divXOrigin, this.divYOrigin, this.divHeight, this.divWidth, "hidden");
		},

		_showAllSelectCombo : function() {
			this._setVisibilityAllSelectCombo(this.divXOrigin, this.divYOrigin, this.divHeight, this.divWidth, "visible");
		},

		enable : function () {
			this._enable();

			if (this._isInternetExplorer6OrLower()) {
				this._hideAllSelectCombo();	
			}
		},

		disable : function () {
			this._disable();

			if (this._isInternetExplorer6OrLower()) {
				this._showAllSelectCombo();
			}
		}

	};
}

/**
 * Executa uma funcao <param>functionEval</param> nos elementos de TagName HTML <param>tagName</param> existentes da 
 * arvore DOM sob o elemento <param>element</param>. Os elementos podem ser filtrados por meio de uma funcao de decisao
 * <param>filter</param>.
 *
 * @param element
 *				Elemento DOM sob os quais serão buscados os elementos desejados.
 * @param tagName
 *				TagName HTML para busca de elementos DOM sob o elemento DOM <param>element</param>.
 * @param functionEval
 *				Funcao que sera executada sobre os elementos DOM recuperados.
 * @param filter
 *				Filtro aplicado sobre a selecao antes da execucao de <param>functionEval</param>. Nao ocorrera
 *				filtragem se o parametro for <code>null</code>. Caso seja desejada filtragem, o filtro devera ser uma funcao
 *				JavaScript que recebe como parametro um elemento DOM. Esta funcao de filtragem deve retornar um boolean
 *				<code>true</code> se a <param>functionEval</param> deve ser executada no elemento DOM; ou, <code>false</code>
 *				em caso contrario.
 *
 * <pre>
 * Por exemplo,
 *
 * function filter(element) { return true; }
 * </pre>
 * 
 * Namespace: caixa.util.html
 * Metodo: executeFunctionOnElementsByTagNameWithFilter
 */
if (caixa.util.html.executeFunctionOnElementsByTagNameWithFilter == null) {
	caixa.util.html.executeFunctionOnElementsByTagNameWithFilter = function(element, tagName, functionEval, filter) {
		var elements = element.getElementsByTagName(tagName);

		for (i = 0; i < elements.length; i++) {
			var elementCurrent = elements[i];

			if (caixa.util.isNeitherUndefinedNorNull(filter)) {
				if (filter(elementCurrent)) {
					functionEval(elementCurrent);
				}
			} else {
				functionEval(elementCurrent);
			}
		}
	};
}

/**
 * Executa uma funcao <param>functionEval</param> nos elementos de TagName HTML <param>tagName</param> existentes da 
 * arvore DOM sob o elemento <param>element</param>.
 *
 * @param element
 *				Elemento DOM sob os quais serão buscados os elementos desejados.
 * @param tagName
 *				TagName HTML para busca de elementos DOM sob o elemento DOM <param>element</param>.
 * @param functionEval
 *				Funcao que sera executada sobre os elementos DOM recuperados.
 * 
 * Namespace: caixa.util.html
 * Metodo: executeFunctionOnElementsByTagName
 */
if (caixa.util.html.executeFunctionOnElementsByTagName == null) {
	caixa.util.html.executeFunctionOnElementsByTagName = function(element, tagName, functionEval) {
		caixa.util.html.executeFunctionOnElementsByTagNameWithFilter(element, tagName, functionEval, null);
	};
}

/**
 * Verifica se o valor de um elemento DOM é vazio. Se for vazio, emite mensagem de erro.
 *
 * @param elementName
 *				Nome do elemento DOM que será processado.
 * @param mensagem
 *				Mensagem que será emitida caso o valor do elemento seja vazio.
 * @return boolean <code>true</code> se for vazio; ou, <code>false</code> se não for.
 *
 * Namespace: caixa.util.html
 * Metodo: isElementByNameValueVazio
 */
if (caixa.util.html.isElementByNameValueVazio == null) {
	caixa.util.html.isElementByNameValueVazio = function(elementName, mensagem) {
		/* Começa assumindo que é válido/vazio. */
		var isValid = true;
		
		if (caixa.util.isNeitherUndefinedNorNull(elementName)) {
			var element = getElement(elementName);
	
			if (caixa.util.isNeitherUndefinedNorNull(element)) {
				return caixa.util.html.isElementValueVazio(element, mensagem);
			} else {
				throw("Nao foi possivel encontrar campo [" + element + "] no formulario.");
			}
		}

		return isValid;
	}
}

/**
 * Verifica se um elemento DOM representa um DOM INPUT do tipo RADIO.
 * 
 * @param element
 *				Elemento DOM que sera processado.
 * @return boolean <code>true</code> se for DOM INPUT do tipo RADIO; ou, <code>false</code> se não for.
 *
 * Namespace: caixa.util.html
 * Metodo: isElementInputTypeRadio
 */
if (caixa.util.html.isElementInputTypeRadio == null) {
	caixa.util.html.isElementInputTypeRadio = function(element) {
		var isInputTypeRadio = false;
		
		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			var nodeName = element.nodeName;

			if (caixa.util.isNeitherUndefinedNorNull(nodeName) && (nodeName.toUpperCase() == "INPUT")) {
				var type = element.type;

				isInputTypeRadio = (caixa.util.isNeitherUndefinedNorNull(type) && (type.toUpperCase() == "RADIO"));
			}
		}
		
		return isInputTypeRadio;
	};
}

/**
 * Verifica se um elemento DOM representa um DOM OPTION.
 * 
 * @param element
 *				Elemento DOM que sera processado.
 * @return boolean <code>true</code> se for DOM OPTION; ou, <code>false</code> se não for.
 *
 * Namespace: caixa.util.html
 * Metodo: isElementOption
 */
if (caixa.util.html.isElementOption == null) {
	caixa.util.html.isElementOption = function(element) {
		var isOption = false;
		
		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			var nodeName = element.nodeName;

			isOption = (caixa.util.isNeitherUndefinedNorNull(nodeName) &&
				(nodeName.toUpperCase() === 'OPTION'));
		}
		
		return isOption;
	};
}

/**
 * Verifica se um elemento DOM representa um DOM SELECT.
 * 
 * @param element
 *				Elemento DOM que sera processado.
 * @return boolean <code>true</code> se for DOM OPTION; ou, <code>false</code> se não for.
 *
 * Namespace: caixa.util.html
 * Metodo: isElementSelect
 */
if (caixa.util.html.isElementSelect == null) {
	caixa.util.html.isElementSelect = function(element) {
		var isSelect = false;
		
		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			var nodeName = element.nodeName;

			isSelect = (caixa.util.isNeitherUndefinedNorNull(nodeName) &&
				(nodeName.toUpperCase() === 'SELECT'));
		}
		
		return isSelect;
	};
}

/**
 * Verifica o comprimento exato do valor de um elemento DOM. Se não corresponder, emite mensagem de erro.
 *
 * @param element
 *				Elemento DOM que sera processado.
 * @param comprimento
 *				Comprimento exato da String que representa o valor do elemento.
 * @param mensagem
 *				Mensagem que será emitida caso o valor do elemento seja vazio.
 * @return boolean <code>true</code> se tiver o comprimento exato; ou, <code>false</code> se não tiver.
 *
 * Namespace: caixa.util.html
 * Metodo: isElementValueComprimentoExato
 */
if (caixa.util.html.isElementValueComprimentoExato == null) {
	caixa.util.html.isElementValueComprimentoExato = function(element, comprimento, mensagem) {
		/* Começa assumindo que não é válido. */
		var isValid = false;

		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			var elementValue = element.value;
			
			/* Entrou no if, então assume que re-começou como válido. */
			isValid = true;

			isValid = isValid && caixa.util.isNeitherUndefinedNorNull(elementValue);
			
			if (isValid) {
				isValid = isValid && (elementValue.length == comprimento);
			}
		} else {
			throw("Nao foi possivel encontrar campo [" + element + "] no formulario.");
		}

		if (!isValid) {
			if (caixa.util.isNeitherUndefinedNorNull(mensagem)) {
				adicionarMensagem(element, mensagem);
			}
	 	}

		return isValid;
	}
}

/**
 * Verifica se o valor de um elemento DOM é corresponde a expressão regular informada. Se não corresponder,
 * emite mensagem de erro.
 *
 * @param element
 *				Elemento DOM que sera processado.
 * @param elementValueFormatRegularExpression
 *				Expressão regular que será avaliada contra o valor do elemento DOM.
 * @param mensagem
 *				Mensagem que será emitida caso o valor do elemento seja vazio.
 * @return boolean <code>true</code> se corresponder a expressão regular; ou, <code>false</code> se não.
 *
 * Namespace: caixa.util.html
 * Metodo: isElementValueRegularExpressionMatch
 */
if (caixa.util.html.isElementValueRegularExpressionMatch == null) {
	caixa.util.html.isElementValueRegularExpressionMatch = function(element, elementValueFormatRegularExpression, mensagem) {
		/* Começa assumindo que não é válido. */
		var isValid = false;

		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			var elementValue = element.value;
			
			/* Entrou no if, então assume que re-começou como válido. */
			isValid = true;

			isValid = isValid && caixa.util.isNeitherUndefinedNorNull(elementValue);
			
			if (isValid) {
				var elementValueFormatRegularExpressionObject=new RegExp(elementValueFormatRegularExpression, "g");

				isValid = isValid && elementValueFormatRegularExpressionObject.test(elementValue);
			}
		} else {
			throw("Nao foi possivel encontrar campo [" + element + "] no formulario.");
		}
		
	 	if (!isValid) {
			if (caixa.util.isNeitherUndefinedNorNull(mensagem)) {
				adicionarMensagem(element, mensagem);
			}
	 	}
		
		return isValid;
	}
}


/**
 * Verifica se o valor de um elemento DOM é vazio. Se for vazio, emite mensagem de erro.
 *
 * @param element
 *				Elemento DOM que sera processado.
 * @param mensagem
 *				Mensagem que será emitida caso o valor do elemento seja vazio.
 * @return boolean <code>true</code> se for vazio; ou, <code>false</code> se não for.
 *
 * Namespace: caixa.util.html
 * Metodo: isElementValueVazio
 */
if (caixa.util.html.isElementValueVazio == null) {
	caixa.util.html.isElementValueVazio = function(element, mensagem) {
		/* Começa assumindo que é inválido. */
		var isInvalid = true;

		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			isInvalid = isInvalid && isVazio(element.value);
		} else {
			throw("Nao foi possivel encontrar campo [" + element + "] no formulario.");
		}

		if (isInvalid) {
			if (caixa.util.isNeitherUndefinedNorNull(mensagem)) {
				adicionarMensagem(element, mensagem);
			}
		}

		return isInvalid;
	}
}

/**
 * Desativa ou ativa um elemento DOM <param>element</param> segundo o parametro <param>state</param>.
 * O processamento se da atraves da propriedade DOM "disabled".
 *
 * @param element
 *				Elemento DOM que sera processado.
 * @param state
 *				Estado desejado: <code>true</code> para ativo para uso; e, <code>false</code> para desativado para uso.
 *
 * Namespace: caixa.util.html
 * Metodo: setElementDisabled
 */
if (caixa.util.html.setElementDisabled == null) {
    caixa.util.html.setElementDisabled = function(element, state) {
    	if (caixa.util.isNeitherUndefinedNorNull(element)) {
	    	var property = element.disabled;

			if (caixa.util.isNeitherUndefinedNorNull(property) && caixa.util.isBoolean(property)) {
				if (property != state) {
					element.disabled = state;
				}
			}
		}
	};
}

/**
 * Desativa um elemento DOM <param>element</param>. O processamento se da atraves da propriedade DOM "disabled".
 *
 * @param element
 *				Elemento DOM que sera processado.
 *
 * Namespace: caixa.util.html
 * Metodo: elementDisable
 */
if (caixa.util.html.elementDisable == null) {
	caixa.util.html.elementDisable = function(element) {
		caixa.util.html.setElementDisabled(element, true);
	}
}

/**
 * Ativa um elemento DOM <param>element</param>. O processamento se da atraves da propriedade DOM "disabled".
 *
 * @param element
 *				Elemento DOM que sera processado.
 *
 * Namespace: caixa.util.html
 * Metodo: elementEnable
 */
if (caixa.util.html.elementEnable == null) {
	caixa.util.html.elementEnable = function(element) {
		caixa.util.html.setElementDisabled(element, false);
	}
}

/**
 * Verifica se o valor de um elemento DOM é vazio. Se for vazio, emite mensagem de erro.
 *
 * @param element
 *				Elemento DOM que sera processado.
 * @param mensagem
 *				Mensagem que será emitida caso o valor do elemento seja vazio.
 * @return boolean <code>true</code> se for válido; ou, <code>false</code> se não for.
 *
 * Namespace: caixa.util.html
 * Metodo: validateElement
 */
 if (caixa.util.html.validateElement == null) {
	caixa.util.html.validateElement = function(elementName, mensagemVazio, elementValueFormatRegularExpression,
		mensagemFormato, comprimento, mensagemComprimento) {
		var isValid = true;

		if (caixa.util.isNeitherUndefinedNorNull(elementName)) {
			var element = getElement(elementName);
	
			isValid = isValid && !(caixa.util.html.isElementValueVazio(element, mensagemVazio));
	
			if (isValid) {
				if (caixa.util.isNeitherUndefinedNorNull(elementValueFormatRegularExpression)) {
					isValid = isValid && caixa.util.html.isElementValueRegularExpressionMatch(element,
						elementValueFormatRegularExpression, mensagemFormato);
				}
	
				if (caixa.util.isNeitherUndefinedNorNull(comprimento)) {
					isValid = isValid && caixa.util.html.isElementValueComprimentoExato(element, comprimento,
						mensagemComprimento);
				}
		 	}
 		} else {
 			isValid = false;
		}

 		return isValid;
	}
}