/**
 * Biblioteca para operações de manipulação de elementos DOM select.
 *
 * Namespace: caixa.util.html.select.
 *
 * @author <a href="mailto:mario.f.ferreira@caixa.gov.br">Mário Sérgio Fujikawa Ferreira
 *         <mario.f.ferreira@caixa.gov.br> (C101038)</a>
 */

/**
 * "Objeto" para verificar as dependências necessárias para utilização do código do pacote
 * de namespace caixa.util.html.select.
 *
 * Namespace: não se aplica
 * Classe: _CheckRequiredDependency
 * Construtor: não se aplica
 * Visibilidade: Privada
 * Métodos públicos estáticos: check()
 */
var _CheckRequiredDependency = {
	NAMESPACE: 'caixa.util.html.select',

	REQUIRED_PROTOTYPE: '1.6.0.3',

	check: function() {
		function convertVersionString(versionString)
		{
			var v = versionString.replace(/_.*|\./g, '');
			v = parseInt(v + '0'.times(4-v.length));
			return versionString.indexOf('_') > -1 ? v-1 : v;
		}

		// Prototype
		if
		(
			(typeof Prototype == 'undefined') ||
			(typeof Element == 'undefined') ||
			(typeof Element.Methods == 'undefined') ||
			(convertVersionString(Prototype.Version) < convertVersionString(this.REQUIRED_PROTOTYPE))
		)
		{
			throw(this.NAMESPACE + " requer framework JavaScript Prototype de versao >= " + this.REQUIRED_PROTOTYPE);
		}
		
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
		
		// caixa.util.html
		if
		(
			(typeof caixa == 'undefined') ||
			(typeof caixa.util == 'undefined') ||
			(typeof caixa.util.html == 'undefined') ||
			(typeof caixa.util.html.isElementSelect == 'undefined') ||
			(typeof caixa.util.html.isElementSelect == null)
		)
		{
			throw(this.NAMESPACE + " requer caixa.util.html");
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
 * Cria namespace caixa.util.html.select.
 */
if (caixa.util.html.select == null)
	caixa.util.html.select = {};

/**
 * "Classe" para verificar se todos as dependências necessárias para utilização do código do pacote
 * de namespace caixa.util.html.select.
 *
 * Namespace: caixa.util.html.select
 * Classe: CheckRequiredDependency
 * Construtor: não se aplica
 * Visibilidade: Pública
 * Métodos públicos estáticos: check()
 */
if (caixa.util.html.select.CheckRequiredDependency == null) {
	caixa.util.html.select.CheckRequiredDependency = _CheckRequiredDependency;
}

/**
 * Obtêm o número de elementos DOM OPTION no DOM SELECT de origem.
 * Se o parâmetro <param>element</param> não for <code>null</code> nem <code>undefined</code>,
 * busca o DOM SELECT de origem entre os filhos de <param>element</param>.
 *
 * @param element
 *					Elemento DOM que será processado.
 * @return Elemento DOM que representa o elemento DOM SELECT.
 */
if (caixa.util.html.select.getNumberOfSelectedOptions == null) {
	caixa.util.html.select.getNumberOfSelectedOptions = function(element) {
		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			/* Se o parâmetro não for DOM SELECT. */
			if (!caixa.util.html.isElementSelect(element)) {
				throw("Parametro selectElement nao e elemento do tipo DOM SELECT");
			}
				
			var options = Element.select(element, "option");
			var selectSourceNumberOfOptions = options.select(function(item) {
				return item.selected;
			}).size();

			return selectSourceNumberOfOptions;
		}
	}
}

/**
 * Obtém todos os valores das opções selecionadas em uma Select Combo Box. Constrói uma string com todos os valores
 * concatenados e separados por delimitador fieldSeparator.
 * 
 * @param selectElement
 *				Elemento DOM que sera processado.
 * @param fieldSeparator
 *				Separador de campo a ser utilizado na String concatenada. Se for null ou undefined,
 *				não será utilizado separador.
 * @param functionEval
 *				Função que será executada sobre os valores recuperados antes destes serem concatenados a string.
 *				O valor será substituído pelo resultado da execução desta função. Se for null ou undefined,
 *				nenhuma função será executada.
 *
 * Namespace: caixa.util.html.select
 * Metodo: getValuesOfSelectedOptionsConcatenated
 */
if (caixa.util.html.select.getValuesOfSelectedOptionsConcatenated == null) {
	caixa.util.html.select.getValuesOfSelectedOptionsConcatenated = function(selectElement, fieldSeparator, functionEval) {
		if (caixa.util.isNeitherUndefinedNorNull(selectElement)) {
			/* Se o parâmetro não for DOM SELECT. */
			if (!caixa.util.html.isElementSelect(selectElement)) {
				throw("Parametro selectElement nao e elemento do tipo DOM SELECT");
			}

			/* Se o parâmetro functionEval for definido, mas não for function. */
			if (caixa.util.isNeitherUndefinedNorNull(functionEval) && !Object.isFunction(functionEval)) {
				throw("Parametro functionEval nao e function");
			}
			
			var valuesConcatenated = "";

			var hasFieldSeparator = caixa.util.isNeitherUndefinedNorNull(fieldSeparator);
			var hasFunctionEval = caixa.util.isNeitherUndefinedNorNull(functionEval);
			var options = Element.select(selectElement, "option");

			options.each(function(item) {
				if (item.selected) {
					/* Função executada para transformação do valor antes da concatenação. */
					if (hasFunctionEval) {
						value = functionEval(value);
					}

					valuesConcatenated += value;
		
					/* Se for necessário adicionar um fieldSeparator. */
					if (hasFieldSeparator) {
						 valuesConcatenated += fieldSeparator;
					}
				}
			});
			
			return valuesConcatenated;
		}
	}
}

/**
 * Move todas as "OPTION" selecionadas (ou não) em um elemento DOM SELECT de origem para outro de destino.
 * 
 * @param selectSource
 *				Elemento DOM SELECT origem que será processado.
 * @param selectTarget
 *				Elemento DOM SELECT destino que será processado.
 * @param onlyOptionsSelected
 *				Move apenas "OPTION" selecionadas se <code>true</code>; ou, todas em caso contrário.
 *
 * Namespace: caixa.util.html.select
 * Metodo: moveOptionsSelectedFromSourceSelectToTargetSelect
 */
if (caixa.util.html.select.moveOptionsSelectedFromSourceSelectToTargetSelect == null) {
	caixa.util.html.select.moveOptionsSelectedFromSourceSelectToTargetSelect = function(selectSource, selectTarget, onlyOptionsSelected) {
		if (caixa.util.isNeitherUndefinedNorNull(selectSource) && caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
			/* Se o parâmetro não for DOM SELECT. */
			if (!caixa.util.html.isElementSelect(selectSource)) {
				throw("Parametro selectSource nao e elemento do tipo DOM SELECT");
			}

			/* Se o parâmetro não for DOM SELECT. */
			if (!caixa.util.html.isElementSelect(selectTarget)) {
				throw("Parametro selectTarget nao e elemento do tipo DOM SELECT");
			}

			var options = selectSource.select("option");

			options.each(function(item) {
				if (onlyOptionsSelected) {
					if (item.selected) {
			       		item.selected = false;
						selectTarget.appendChild(item.remove());
					}
				} else {
					selectTarget.appendChild(item.remove());
				}
			});
		}
	}
}

/**
 * Move todas as "OPTION" selecionadas em um elemento DOM SELECT para cima ou para baixo dentro do elemento.
 * 
 * @param element
 *				Elemento DOM SELECT que será processado.
 * @param shouldMoveUp
 *				Move apenas "OPTION" selecionadas "para cima" se <code>true</code>; ou, "para baixo" em caso contrário.
 *
 * Namespace: caixa.util.html.select
 * Metodo: moveOptionsSelectedUpOrDown
 */
if (caixa.util.html.select.moveOptionsSelectedUpOrDown == null) {
	caixa.util.html.select.moveOptionsSelectedUpOrDown = function(element, shouldMoveUp) {
		if (caixa.util.isNeitherUndefinedNorNull(element)) {
			/* Se o parâmetro não for DOM SELECT. */
			if (!caixa.util.html.isElementSelect(element)) {
				throw("Parametro selectElement nao e elemento do tipo DOM SELECT");
			}

			var options = element.select("option");
	
			// Processa somente os itens selecionados
			options.select(function(item) {
				return item.selected;
			}).each(function(item) {
				if (shouldMoveUp) {
				/*
					element.insertBefore(item, item.previousSibling);
				*/
					var siblingBefore = item.previous();

					/* Mover elemento antes do sibling anterior: para cima. */					
					if (siblingBefore) {					
						siblingBefore.insert({before: item.remove()});
					}
				} else {
				/*
					element.insertBefore(item.nextSibling, item);
				*/
					var siblingAfter = item.next();

					/* Mover elemento depois do sibling seguinte: para baixo. */
					if (siblingAfter) {
						siblingAfter.insert({after: item.remove()});
					}
				}
			});
		}
	}
}

if (caixa.util.html.select.ManageTwoSelectBoxWithEventsToAddRemoveOptions == null) {
	caixa.util.html.select.ManageTwoSelectBoxWithEventsToAddRemoveOptions = Class.create({
		initialize: function(optionsUser) {
			// Opções default.
			var optionsDefault = {
				parentElementSelector: '',

				selectElementSourceSelector: '',
				selectElementTargetSelector: '',

				observeAddSelectedOptionsEvent: false,
				addSelectedEventSourceElementSelector: '',
				addSelectedEventToObserve: 'click',

				observeAddAllOptionsEvent: false,
				addAllEventSourceElementSelector: '',
				addAllEventToObserve: 'click',

				addSelectElementTargetMaximumNumberOfLines: 0,
				addSelectElementTargetMaximumNumberOfLinesReachedAction: null,

				observeRemoveSelectedOptionsEvent: false,
				removeSelectedEventSourceElementSelector: '',
				removeSelectedEventToObserve: 'click',

				observeRemoveAllOptionsEvent: false,
				removeAllEventSourceElementSelector: '',
				removeAllEventToObserve: 'click',

				removeCanRemoveLastLine: false,

				/* XXX - checar invariantes - */
				observeDownSelectedOptionsOnSelectElemenSourceEvent: false,
				downSelectedEventSourceElementOnSelectElemenSourceSelector: '',
				downSelectedEventOnSelectElemenSourceToObserve: 'click',

				/* XXX - checar invariantes - */				
				observeDownSelectedOptionsOnSelectElemenTargetEvent: false,
				downSelectedEventTargetElementOnSelectElemenTargetSelector: '',
				downSelectedEventOnSelectElemenTargetToObserve: 'click',

				/* XXX - checar invariantes - */
				observeUpSelectedOptionsOnSelectElemenSourceEvent: false,
				upSelectedEventSourceElementOnSelectElemenSourceSelector: '',
				upSelectedEventOnSelectElemenSourceToObserve: 'click',
				
				/* XXX - checar invariantes - */
				observeUpSelectedOptionsOnSelectElemenTargetEvent: false,
				upSelectedEventTargetElementOnSelectElemenTargetSelector: '',
				upSelectedEventOnSelectElemenTargetToObserve: 'click'
			};

			/**
			 * Opções do objeto.
			 */
			this.options = Object.extend(optionsDefault, optionsUser || { });

			/**
			 * Nome da classe para mensagens de debug.
			 */
			this.classNameForDebug = 'caixa.util.html.select.ManageTwoSelectBoxWithEventsToAddRemoveOptions';

			// Verificação de Design by contract: verifica o Invariant do objeto.
			this.dbcCheckInvariantCondition();
		},

		/**
		 * Design by contract: verificar o Invariant do objeto.
		 *
		 *	1) parentElementSelector deve ser do tipo <code>String</code>.
		 *	1) Opções que devem ser do tipo <code>Boolean</code>:
		 *		1.1) gridColorTable
		 *		1.2) observeAddOptionEvent
		 *		1.3) observeRemoveOptionEvent
		 *	2) Ao menos uma das opções tem de ser <code>true</code>:
		 *		2.2) observeAddOptionEvent
		 *		2.3) observeRemoveOptionEvent
		 *	3) Se observeAddOptionEvent for <code>true</code>, então:
 		 *		3.1) As seguintes opções devem ser do tipo <code>String</code> e nenhuma pode estar vazia:
		 *			3.1.1) addSelectedEventSourceElementSelector
		 *			3.1.2) addSelectedEventToObserve
		 *		3.2) addSelectElementTargetMaximumNumberOfLines deve ser do tipo <code>Number</code>, e maior ou igual a zero (0).
		 *		3.3) addSelectElementTargetMaximumNumberOfLinesReachedAction deve ser null <code>null</code> ou <code>function</code>.
		 *	4) Se observeRemoveOptionEvent for <code>true</code>, então:
 		 *		4.1) As seguintes opções devem ser do tipo <code>String</code> e nenhuma pode estar vazia:
		 *			4.1.1) removeEventSourceElementSelector
		 *			4.1.2) removeEventToObserve
 		 *		4.2) removeCanRemoveLastLine deve ser do tipo <code>Boolean</code>.
		 *	5) Se gridColorTable for <code>true</code>, então:
		 *		5.1) As seguintes opções devem ser do tipo <code>String</code>:
		 *			5.1.1) gridCssClassNameForEvenTableLine
		 *			5.1.2) gridCssClassNameForOddTableLine
		 *		5.2) gridCssClassNameForEvenTableLine não pode estar vazia.
		 */
		dbcCheckInvariantCondition: function() {
			var isInvariantOkay = true;

			isInvariantOkay &=	Object.isString(this.options.parentElementSelector);

			if (isInvariantOkay) {
				isInvariantOkay &=	caixa.util.isBoolean(this.options.observeAddSelectedOptionsEvent) &&
									caixa.util.isBoolean(this.options.observeAddAllOptionsEvent) &&
									caixa.util.isBoolean(this.options.observeRemoveSelectedOptionsEvent) &&
									caixa.util.isBoolean(this.options.observeRemoveAllOptionsEvent) &&
									caixa.util.isBoolean(this.options.removeCanRemoveLastLine);
			}

			if (isInvariantOkay) {
				isInvariantOkay &=	(this.options.observeAddSelectedOptionsEvent || this.options.obsobserveRemoveSelectedOptionsEventerveRemoveOptionEvent) ||
									(this.options.observeAddAllOptionsEvent || this.options.observeRemoveAllOptionsEvent);
			}

			// Opções para addSelectedOptionsEvent
			if (isInvariantOkay) {
				if (this.options.observeAddSelectedOptionsEvent) {
					isInvariantOkay &=	Object.isString(this.options.addSelectedEventSourceElementSelector) &&
										Object.isString(this.options.addSelectedEventToObserve) &&
										Object.isNumber(this.options.addSelectElementTargetMaximumNumberOfLines);

					if (isInvariantOkay) {
						isInvariantOkay &=	(this.options.addSelectElementTargetMaximumNumberOfLinesReachedAction === null) ||
											Object.isFunction(this.options.addSelectElementTargetMaximumNumberOfLinesReachedAction);
					}

					if (isInvariantOkay) {
						isInvariantOkay &=	!(this.options.addSelectedEventSourceElementSelector.blank()) &&
											!(this.options.addSelectedEventToObserve.blank()) &&
											(this.options.addSelectElementTargetMaximumNumberOfLines >= 0);
					}
				}
			}

			// Opções para addAllOptionsEvent
			if (isInvariantOkay) {
				if (this.options.observeAddAllOptionsEvent) {
					isInvariantOkay &=	Object.isString(this.options.addAllEventSourceElementSelector) &&
										Object.isString(this.options.addAllEventToObserve) &&
										Object.isNumber(this.options.addSelectElementTargetMaximumNumberOfLines);

					if (isInvariantOkay) {
						isInvariantOkay &=	(this.options.addSelectElementTargetMaximumNumberOfLinesReachedAction === null) ||
											Object.isFunction(this.options.addSelectElementTargetMaximumNumberOfLinesReachedAction);
					}

					if (isInvariantOkay) {
						isInvariantOkay &=	!(this.options.addAllEventSourceElementSelector.blank()) &&
											!(this.options.addAllEventToObserve.blank()) &&
											(this.options.addSelectElementTargetMaximumNumberOfLines >= 0);
					}
				}
			}

			// Opções para removeSelectedOptionsEvent
			if (isInvariantOkay) {
				if (this.options.observeRemoveSelectedOptionsEvent) {
					isInvariantOkay &=	Object.isString(this.options.removeSelectedEventSourceElementSelector) &&
										Object.isString(this.options.removeSelectedEventToObserve) &&
										caixa.util.isBoolean(this.options.removeCanRemoveLastLine);

					if (isInvariantOkay) {
						isInvariantOkay &=	!(this.options.removeSelectedEventSourceElementSelector.blank()) &&
											!(this.options.removeSelectedEventToObserve.blank());
					}
				}
			}

			// Opções para removeAllOptionsEvent
			if (isInvariantOkay) {
				if (this.options.observeRemoveAllOptionsEvent) {
					isInvariantOkay &=	Object.isString(this.options.removeAllEventSourceElementSelector) &&
										Object.isString(this.options.removeAllEventToObserve) &&
										caixa.util.isBoolean(this.options.removeCanRemoveLastLine);

					if (isInvariantOkay) {
						isInvariantOkay &=	!(this.options.removeAllEventSourceElementSelector.blank()) &&
											!(this.options.removeAllEventToObserve.blank());
					}
				}
			}

			if (!isInvariantOkay) {
				throw(this.classNameForDebug + ": As opcoes do objeto nao respeitam o Invariant da classe.");
			}
		},

		/**
		 * Obtêm o elemento DOM SELECT de origem da operação pelo estilo CSS this.options.selectElementSourceSelector.
		 * Se o parâmetro <param>element</param> não for <code>null</code> nem <code>undefined</code>, busca o estilo
		 * CSS entre os filhos do element DOM.
		 *
		 * @param element
		 *					Elemento DOM que será processado.
		 * @return Elemento DOM que representa o elemento DOM SELECT.
		 */
		getSelectSourceElement: function(element) {
			var selectSource = null;

			if (caixa.util.isNeitherUndefinedNorNull(element)) {
				selectSource = element.select(this.options.selectElementSourceSelector);
			} else {
				selectSource = $$(this.options.selectElementSourceSelector);			
			}

			selectSource = selectSource.flatten();

			if (caixa.util.isNeitherUndefinedNorNull(selectSource)) {
				if (selectSource.size() <= 0) {
					throw(this.classNameForDebug +
						" - [getSelectSourceElement]: Nao foi encontrado elemento definido pelo seletor CSS [" +
						this.options.selectElementSourceSelector + "].");
				}
				
				if (selectSource.size() != 1) {
					throw(this.classNameForDebug +
						" - [getSelectSourceElement]: Foi encontrado mais de 1 elemento definido pelo seletor CSS [" +
						this.options.selectElementSourceSelector + "] Favor definir apenas 1.");
				}

				var onlySelectSource = selectSource.first();

				if (!caixa.util.html.isElementSelect(onlySelectSource)) {
					throw(this.classNameForDebug +
						" - [getSelectSourceElement]: Elemento definido por [" +
						onlySelectSource + "] nao e elemento DOM SELECT.");
				}

				return onlySelectSource;
			} else {
				if (caixa.util.isNeitherUndefinedNorNull(element)) {
					throw(this.classNameForDebug + ": Nao foi possivel encontrar campo [" + element + "] no formulario.");
				} else {
					throw(this.classNameForDebug + ": Nao foi possivel encontrar SELECT que sera origem da operacao no formulario.");
				}
			}

			return selectSource;
		},
		
		/**
		 * Obtêm o número de elementos DOM OPTION no DOM SELECT de destino.
		 * Se o parâmetro <param>element</param> não for <code>null</code> nem <code>undefined</code>,
		 * busca o DOM SELECT de origem entre os filhos de <param>element</param>.
		 *
		 * @param element
		 *					Elemento DOM que será processado.
		 * @return Elemento DOM que representa o elemento DOM SELECT.
		 */
		getSelectTargetElementSize: function(element) {
			var selectTarget = this.getSelectTargetElement(element);
			var selectTargetNumberOfOptions = 0;

			if (caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
				selectTargetNumberOfOptions = selectTarget.length;
			}
			
			return selectTargetNumberOfOptions;
		},

		/**
		 * Obtêm o número de elementos DOM OPTION SELECTED no DOM SELECT de origem.
		 * Se o parâmetro <param>element</param> não for <code>null</code> nem <code>undefined</code>,
		 * busca o DOM SELECT de origem entre os filhos de <param>element</param>.
		 *
		 * @param element
		 *					Elemento DOM que será processado.
		 * @return Elemento DOM que representa o elemento DOM SELECT.
		 */
		getSelectSourceNumberOfOptionsSelected: function(element) {
			var selectSource = this.getSelectSourceElement(element);
			var selectSourceNumberOfOptionsSelected = 0;

			if (caixa.util.isNeitherUndefinedNorNull(selectSource)) {
				selectSourceNumberOfOptionsSelected = caixa.util.html.select.getNumberOfSelectedOptions(selectSource);
			}
			
			return selectSourceNumberOfOptionsSelected;
		},		

		/**
		 * Obtêm o elemento DOM SELECT de destino da operação pelo estilo CSS this.options.selectElementTargetSelector.
		 * Se o parâmetro <param>element</param> não for <code>null</code> nem <code>undefined</code>, busca o estilo
		 * CSS entre os filhos do element DOM.
		 *
		 * @param element
		 *					Elemento DOM que será processado.
		 * @return Elemento DOM que representa o elemento DOM SELECT.
		 */
		getSelectTargetElement: function(element) {
			var selectTarget = null;

			if (caixa.util.isNeitherUndefinedNorNull(element)) {
				selectTarget = element.select(this.options.selectElementTargetSelector);
			} else {
				selectTarget = $$(this.options.selectElementTargetSelector);	
			}

			selectTarget = selectTarget.flatten();

			if (caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
				if (selectTarget.size() <= 0) {
					throw(this.classNameForDebug +
						" - [getSelectTargetElement]: Nao foi encontrado elemento definido pelo seletor CSS [" +
						this.options.selectElementTargetSelector + "].");
				}
				
				if (selectTarget.size() != 1) {
					throw(this.classNameForDebug +
						" - [getSelectTargetElement]: Foi encontrado mais de 1 elemento definido pelo seletor CSS [" +
						this.options.selectElementTargetSelector + "] Favor definir apenas 1.");
				}

				var onlySelectTarget = selectTarget.first();

				if (!caixa.util.html.isElementSelect(onlySelectTarget)) {
					throw(this.classNameForDebug +
						" - [getSelectTargetElement]: Elemento definido por [" +
						onlySelectTarget + "] nao e elemento DOM SELECT.");
				}

				return onlySelectTarget;
			} else {
				if (caixa.util.isNeitherUndefinedNorNull(element)) {
					throw(this.classNameForDebug + ": Nao foi possivel encontrar campo [" + element + "] no formulario.");
				} else {
					throw(this.classNameForDebug + ": Nao foi possivel encontrar SELECT que sera destino da operacao no formulario.");
				}
			}

			return selectTarget;
		},

		/**
		 * Move todas as "OPTION" em um elemento DOM SELECT de origem para outro de destino.
		 * Se o parâmetro <param>elementSource</param> ou <param>elementTarget</param> não forem <code>null</code>
		 * nem <code>undefined</code>, busca pelo estilo CSS entre os filhos dos respectivos elementos DOM.
		 * Se o parâmetro <param>element</param> não for <code>null</code> nem <code>undefined</code>,
		 * busca o DOM SELECT de origem entre os filhos de <param>element</param>.
		 *
		 * @param elementSource
		 *					Elemento DOM que será processado como origem da operação.
		 * @param elementTarget
		 *					Elemento DOM que será processado como destino da operação
		 */
		moveOptionsAllFromSourceSelectToTargetSelect: function(elementSource, elementTarget) {
			var selectSource = this.getSelectSourceElement(elementSource);
			var selectTarget = this.getSelectTargetElement(elementTarget);

			if (caixa.util.isNeitherUndefinedNorNull(selectSource) && caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
				caixa.util.html.select.moveOptionsSelectedFromSourceSelectToTargetSelect(selectSource, selectTarget, false);
			}
		},

		/**
		 * Move todas as "OPTION" em um elemento DOM SELECT de destino para outro de origem.
		 * Se o parâmetro <param>elementSource</param> ou <param>elementTarget</param> não forem <code>null</code>
		 * nem <code>undefined</code>, busca pelo estilo CSS entre os filhos dos respectivos elementos DOM.
		 *
		 * @param elementSource
		 *					Elemento DOM que será processado como origem da operação.
		 * @param elementTarget
		 *					Elemento DOM que será processado como destino da operação
		 */
		moveOptionsAllFromTargetSelectToSourceSelect: function(elementSource, elementTarget) {
			var selectSource = this.getSelectSourceElement(elementSource);
			var selectTarget = this.getSelectTargetElement(elementTarget);

			if (caixa.util.isNeitherUndefinedNorNull(selectSource) && caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
				caixa.util.html.select.moveOptionsSelectedFromSourceSelectToTargetSelect(selectTarget, selectSource, false);
			}
		},

		/**
		 * Move todas as "OPTION" selecionadas em um elemento DOM SELECT de origem para outro de destino.
		 * Se o parâmetro <param>elementSource</param> ou <param>elementTarget</param> não forem <code>null</code>
		 * nem <code>undefined</code>, busca pelo estilo CSS entre os filhos dos respectivos elementos DOM.
		 *
		 * @param elementSource
		 *					Elemento DOM que será processado como origem da operação.
		 * @param elementTarget
		 *					Elemento DOM que será processado como destino da operação
		 */
		moveOptionsSelectedFromSourceSelectToTargetSelect: function(elementSource, elementTarget) {
			var selectSource = this.getSelectSourceElement(elementSource);
			var selectTarget = this.getSelectTargetElement(elementTarget);
	
			if (caixa.util.isNeitherUndefinedNorNull(selectSource) && caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
				caixa.util.html.select.moveOptionsSelectedFromSourceSelectToTargetSelect(selectSource, selectTarget, true);
			}
		},

		/**
		 * Move todas as "OPTION" selecionadas em um elemento DOM SELECT de origem para cima ou para baixo
		 * dentro do elemento.
		 *
		 * @param elementSource
		 *				Elemento DOM que será processado como origem da operação.
		 * @param isDirectionUp
		 *				Move apenas "OPTION" selecionadas "para cima" se <code>true</code>; ou, "para baixo" em caso contrário.
		 */
		moveOptionsSelectedOnSourceSelectUpOrDown: function(elementSource, isDirectionUp) {
			var selectSource = this.getSelectSourceElement(elementSource);

			if (caixa.util.isNeitherUndefinedNorNull(selectSource)) {
				caixa.util.html.select.moveOptionsSelectedUpOrDown(selectSource, isDirectionUp);
			}
		},

		/**
		 * Move todas as "OPTION" selecionadas em um elemento DOM SELECT de destino para cima ou para baixo
		 * dentro do elemento.
		 *
		 * @param elementTarget
		 *				Elemento DOM que será processado como origem da operação.
		 * @param isDirectionUp
		 *				Move apenas "OPTION" selecionadas "para cima" se <code>true</code>; ou, "para baixo" em caso contrário.
		 */
		moveOptionsSelectedOnTargetSelectUpOrDown: function(elementTarget, isDirectionUp) {
			var selectTarget = this.getSelectTargetElement(elementTarget);

			if (caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
				caixa.util.html.select.moveOptionsSelectedUpOrDown(selectTarget, isDirectionUp);
			}
		},
		
		/**
		 * Move todas as "OPTION" selecionadas em um elemento DOM SELECT de destino para outro de origem.
		 * Se o parâmetro <param>elementSource</param> ou <param>elementTarget</param> não forem <code>null</code>
		 * nem <code>undefined</code>, busca pelo estilo CSS entre os filhos dos respectivos elementos DOM.
		 *
		 * @param elementSource
		 *					Elemento DOM que será processado como origem da operação.
		 * @param elementTarget
		 *					Elemento DOM que será processado como destino da operação
		 */
		moveOptionsSelectedFromTargetSelectToSourceSelect: function(elementSource, elementTarget) {
			var selectSource = this.getSelectSourceElement(elementSource);
			var selectTarget = this.getSelectTargetElement(elementTarget);

			if (caixa.util.isNeitherUndefinedNorNull(selectSource) && caixa.util.isNeitherUndefinedNorNull(selectTarget)) {
				caixa.util.html.select.moveOptionsSelectedFromSourceSelectToTargetSelect(selectTarget, selectSource, true);
			}
		},
		
		/**
		 * Observador para adicionar mover DOM SELECT OPTION SELECTED de um DOM SELECT para cima ou para baixo
		 * dentro do elemento. Realiza as operações de acordo com o estilo CSS aplicado no elemento gerador do evento.
		 */
		moveOptionsSelectedUpOrDownEventObserver: function(event) {
			if (caixa.util.isNeitherUndefinedNorNull(event)) {
				// Define se o evento é "na origem" ou "no destino".
				var isOrigem = null;
				
				// Define se o evento é para "cima" ou para "baixo".
				var isDirectionUp = null;

				// Localiza o elemento que originou o evento.
				var eventElement = event.element();
				
				// Verifica a fonte do evento
				// Se é origem
				if (eventElement.match(this.options.downSelectedEventSourceElementOnSelectElemenSourceSelector) ||
					eventElement.match(this.options.upSelectedEventSourceElementOnSelectElemenSourceSelector)) {
					isOrigem = true;
					
						// O evento tem direção para cima?
						isDirectionUp = (
							eventElement.match(this.options.upSelectedEventSourceElementOnSelectElemenSourceSelector) &&
							!eventElement.match(this.options.downSelectedEventSourceElementOnSelectElemenSourceSelector)
						);
				// Ou, se é destino
				} else if (eventElement.match(this.options.downSelectedEventTargetElementOnSelectElemenTargetSelector) ||
					eventElement.match(this.options.upSelectedEventTargetElementOnSelectElemenTargetSelector)) {
					isOrigem = false;
				
					// O evento tem direção para cima?
					isDirectionUp = (
						eventElement.match(this.options.upSelectedEventTargetElementOnSelectElemenTargetSelector) &&
						!eventElement.match(this.options.downSelectedEventTargetElementOnSelectElemenTargetSelector)
					);
				}

				if (!(caixa.util.isNeitherUndefinedNorNull(isOrigem) && caixa.util.isBoolean(isDirectionUp))) {
					throw(this.classNameForDebug + ": Nao foi possivel verificar se o evento de origem da operação é na origem ou no destino.");
				}

				// Se for na origem
				if (isOrigem) {
					moveOptionsSelectedOnSourceSelectUpOrDown(null ,isDirectionUp);
				} else { // Se for no destino
					moveOptionsSelectedOnTargetSelectUpOrDown(null ,isDirectionUp);
				}
			}
		},

		/**
		 * Observador para adicionar mover DOM SELECT OPTION de um DOM SELECT origem para outro de destino; ou,
		 * vice-versa. Realiza as operações de acordo com o estilo CSS aplicado no elemento gerador do evento.
		 */
		moveOptionsSelectedEventObserver: function(event) {
			if (caixa.util.isNeitherUndefinedNorNull(event)) {
				// Define se o evento é "origem para destino" ou "destino para origem".
				var isOrigemParaDestino = null;
				
				// Define se o evento é TODOS ou apenas SELECTED.
				var onlyOptionsSelected = null;

				// Localiza o elemento que originou o evento.
				var eventElement = event.element();

				// Verifica a direção do evento
				// Se é "origem para destino"
				if (eventElement.match(this.options.addSelectedEventSourceElementSelector) ||
					eventElement.match(this.options.addAllEventSourceElementSelector)) {
					isOrigemParaDestino = true;
					
					// O evento é TODOS ou apenas SELECTED?
					onlyOptionsSelected = (
						!eventElement.match(this.options.addAllEventSourceElementSelector) &&
						eventElement.match(this.options.addSelectedEventSourceElementSelector)
					);
				} else {
					// Ou, se é "destino para origem"
					if (eventElement.match(this.options.removeSelectedEventSourceElementSelector) ||
						eventElement.match(this.options.removeAllEventSourceElementSelector)) {
						isOrigemParaDestino = false;
						
						// O evento é TODOS ou apenas SELECTED?
						onlyOptionsSelected = (
							!eventElement.match(this.options.removeAllEventSourceElementSelector) &&
							eventElement.match(this.options.removeSelectedEventSourceElementSelector)
						);
					}
				}

				if (!(caixa.util.isNeitherUndefinedNorNull(isOrigemParaDestino) && caixa.util.isBoolean(isOrigemParaDestino))) {
					throw(this.classNameForDebug + ": Nao foi possivel verificar se o evento de origem da operação é de origem para destino ou vice-versa.");
				}
				
				// Se for de origem para destino
				if (isOrigemParaDestino) {
					/*
					 * Verifica se adicionar nova OPTION ao container parent não ultrapassa limite
					 * de NEGÓCIO.
					 */
					var isAllowedToAdd = true;

 					// Existe limite de linhas? Se existir, verifica se alcançamos o limite.
					// Meus irmãos mais as novas opções devem ser menores que o máximo de filhos possível.
					isAllowedToAdd = (
						(this.options.addSelectElementTargetMaximumNumberOfLines == 0) ||
						(
							(this.options.addSelectElementTargetMaximumNumberOfLines > 0) &&
							(
								this.options.addSelectElementTargetMaximumNumberOfLines >
								(this.getSelectTargetElementSize() + this.getSelectSourceNumberOfOptionsSelected())
							)
						)
					);

					if (!isAllowedToAdd) {
						if (this.options.addSelectElementTargetMaximumNumberOfLinesReachedAction) {
							this.options.addSelectElementTargetMaximumNumberOfLinesReachedAction(this.getSelectSourceElement());
						}
					} else {
						if (onlyOptionsSelected) {
							this.moveOptionsSelectedFromSourceSelectToTargetSelect();
						} else {
							this.moveOptionsAllFromSourceSelectToTargetSelect();
						}
					}
				} else { // Se for destino para origem
					if (onlyOptionsSelected) {
						this.moveOptionsSelectedFromTargetSelectToSourceSelect();
					} else {
						this.moveOptionsAllFromTargetSelectToSourceSelect();
					}
				}
			}
		},

		/**
		 * Adiciona observadores as classes CSS. Estas classes referenciam elementos para mover options de
		 * um DOM SELECT para outro; e/ou, mover DOM OPTION para cima ou para baixo dentro de um DOM SELECT.
		 */
		addObserversCallBack: function(event, element) {
			// Informação dos eventos que deverão/poderão ser observados
			var eventos = [
				{
					enable: this.options.observeAddSelectedOptionsEvent,
					selector: this.options.addSelectedEventSourceElementSelector,
					event: this.options.addSelectedEventToObserve,
					observer: this.moveOptionsSelectedEventObserver
				},
				{
					enable: this.options.observeAddAllOptionsEvent,
					selector: this.options.addAllEventSourceElementSelector,
					event: this.options.addAllEventToObserve,
					observer: this.moveOptionsSelectedEventObserver
				},
				{
					enable: this.options.observeRemoveSelectedOptionsEvent,
					selector: this.options.removeSelectedEventSourceElementSelector,
					event: this.options.removeSelectedEventToObserve,
					observer: this.moveOptionsSelectedEventObserver
				},
				{
					enable: this.options.observeRemoveAllOptionsEvent,
					selector: this.options.removeAllEventSourceElementSelector,
					event: this.options.removeAllEventToObserve,
					observer: this.moveOptionsSelectedEventObserver
				},
				{
					enable: this.options.observeDownSelectedOptionsOnSelectElemenSourceEvent,
					selector: this.options.downSelectedEventSourceElementOnSelectElemenSourceSelector,
					event: this.options.downSelectedEventOnSelectElemenSourceToObserve,
					observer: this.moveOptionsSelectedUpOrDownEventObserver
				},
				{
					enable: this.options.observeDownSelectedOptionsOnSelectElemenTargetEvent,
					selector: this.options.downSelectedEventTargetElementOnSelectElemenTargetSelector,
					event: this.options.downSelectedEventOnSelectElemenTargetToObserve,
					observer: this.moveOptionsSelectedUpOrDownEventObserver
				},
				{
					enable: this.options.observeUpSelectedOptionsOnSelectElemenSourceEvent,
					selector: this.options.upSelectedEventSourceElementOnSelectElemenSourceSelector,
					event: this.options.upSelectedEventOnSelectElemenSourceToObserve,
					observer: this.moveOptionsSelectedUpOrDownEventObserver
				},
				{
					enable: this.options.observeUpSelectedOptionsOnSelectElemenTargetEvent,
					selector: this.options.upSelectedEventTargetElementOnSelectElemenTargetSelector,
					event: this.options.upSelectedEventOnSelectElemenTargetToObserve,
					observer: this.moveOptionsSelectedUpOrDownEventObserver
				}
			];

			eventos.each(function (item) {
				if (item.enable === true) {
					var elementsToObserveForEvent = null;

					if (element == null) {
						elementsToObserveForEvent = $$(item.selector);
					} else {
						elementsToObserveForEvent = element.select(item.selector);
					}

				    elementsToObserveForEvent.invoke('observe', item.event,
				    	item.observer.bindAsEventListener(this));
				    	
			    }
		    }.bind(this));
		},

		/**
		 * Decorator contra o método addObserversCallBack para permitir a seleção de mútiplos
		 * elementos por meio de um seletor CSS.
		 */
		addObserversCallBackOnCssSelector: function(event, cssSelector) {
			var parentElements = $$(cssSelector);

			parentElements.each(function(element) {
				this.addObserversCallBack(event, element);
			}).bind(this);
		},

		/**
		 * Adiciona os observadores após a carga completa da janela.
		 */
		addObserversOnEventWindowLoad: function() {
			if (this.options.parentElementSelector.blank()) {
				Event.observe(window, "load", this.addObserversCallBack.bindAsEventListener(this));
			} else {
				Event.observe(window, "load", this.addObserversCallBackOnCssSelector.bindAsEventListener(this,
					this.options.parentElementSelector));
			}
		},

		/**
		 * Adiciona os observadores após a carga do documento mas antes da carga das imagens.
		 */
		addObserversOnEventDomLoad: function() {
			if (this.options.parentElementSelector.blank()) {
				Event.observe(document, "dom:loaded", this.addObserversCallBack.bindAsEventListener(this));
			} else {
				Event.observe(document, "dom:loaded", this.addObserversCallBackOnCssSelector.bindAsEventListener(this,
					this.options.parentElementSelector));
			}
		}

	});
}