/**
 * Biblioteca para operações de manipulação de elementos DOM table.
 *
 * Namespace: caixa.util.html.table.
 *
 * @author <a href="mailto:mario.f.ferreira@caixa.gov.br">Mário Sérgio Fujikawa Ferreira
 *         <mario.f.ferreira@caixa.gov.br> (C101038)</a>
 */

/**
 * "Objeto" para verificar as dependências necessárias para utilização do código do pacote
 * de namespace caixa.util.html.table.
 *
 * Namespace: não se aplica
 * Classe: _CheckRequiredDependency
 * Construtor: não se aplica
 * Visibilidade: Privada
 * Métodos públicos estáticos: check()
 */
var _CheckRequiredDependency = {
	NAMESPACE: 'caixa.util.html.table',

	REQUIRED_PROTOTYPE: '1.6.0.3',

	REQUIRED_SCRIPTACULOUS: '1.8.2',

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
		
		// Scriptaculous
		if
		(
			(typeof Scriptaculous == 'undefined') ||
			(typeof Effect == 'undefined') ||
			(convertVersionString(Scriptaculous.Version) < convertVersionString(this.REQUIRED_SCRIPTACULOUS))
		)
		{
			throw(this.NAMESPACE + " requer framework JavaScript script.aculo.us de versao >= " + this.REQUIRED_SCRIPTACULOUS);
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
 * Cria namespace caixa.util.html.table.
 */
if (caixa.util.html.table == null)
	caixa.util.html.table = {};

/**
 * "Classe" para verificar se todos as dependências necessárias para utilização do código do pacote
 * de namespace caixa.util.html.table.
 *
 * Namespace: caixa.util.html.table
 * Classe: CheckRequiredDependency
 * Construtor: não se aplica
 * Visibilidade: Pública
 * Métodos públicos estáticos: check()
 */
if (caixa.util.html.table.CheckRequiredDependency == null) {
	caixa.util.html.table.CheckRequiredDependency = _CheckRequiredDependency;
}

/**
 * "Classe" para verificar se todos as dependências necessárias para utilização do código do pacote
 * de namespace caixa.util.html.table.
 *
 * Namespace: caixa.util.html.table
 * Classe: ManageWithEventsToAddRemoveLines
 * Construtor: ManageWithEventsToAddRemoveLines
 * Visibilidade: Pública
 * Métodos públicos estáticos:	addObserversCallBack, addObserversCallBackOnCssSelector,
 * 								addObserversOnEventWindowLoad, addObserversOnEventDomLoad
 * Exemplo:
 * 
 *	ManageWithEventsToAddRemoveLines({
 * 			observeAddLineEvent: true,
 *			addEventSourceElementSelector: '.adicionarLinha',
 *			addMaximumNumberOfLines: 20,
 *
 *			observeRemoveLineEvent: true,
 *			removeEventSourceElementSelector: '.removerLinha',
 *
 *			gridColorTable: true,
 *			gridCssClassNameForEvenTableLine: 'background'
 *	});
 */
if (caixa.util.html.table.ManageWithEventsToAddRemoveLines == null) {
	caixa.util.html.table.ManageWithEventsToAddRemoveLines = Class.create({
		initialize: function(optionsUser) {
			// Opções default.
			var optionsDefault = {
				parentElementSelector: '',

				observeAddLineEvent: false,
				addEventSourceElementSelector: '',
				addEventToObserve: 'click',
				addMaximumNumberOfLines: 0,
				addMaximumNumberOfLinesReachedAction: null,

				observeRemoveLineEvent: false,
				removeEventSourceElementSelector: '',
				removeEventToObserve: 'click',
				removeCanRemoveLastLine: false,

				gridColorTable: false,
				gridCssClassNameForEvenTableLine: '',
				gridCssClassNameForOddTableLine: ''
			};

			/**
			 * Opções do objeto.
			 */
			this.options = Object.extend(optionsDefault, optionsUser || { });

			// Verificação de Design by contract: verifica o Invariant do objeto.
			this.dbcCheckInvariantCondition();
		},

		/**
		 * Design by contract: verificar o Invariant do objeto.
		 *
		 *	1) parentElementSelector deve ser do tipo <code>String</code>.
		 *	1) Opções que devem ser do tipo <code>Boolean</code>:
		 *		1.1) gridColorTable
		 *		1.2) observeAddLineEvent
		 *		1.3) observeRemoveLineEvent
		 *	2) Ao menos uma das opções tem de ser <code>true</code>:
		 *		2.2) observeAddLineEvent
		 *		2.3) observeRemoveLineEvent
		 *	3) Se observeAddLineEvent for <code>true</code>, então:
 		 *		3.1) As seguintes opções devem ser do tipo <code>String</code> e nenhuma pode estar vazia:
		 *			3.1.1) addEventSourceElementSelector
		 *			3.1.2) addEventToObserve
		 *		3.2) addMaximumNumberOfLines deve ser do tipo <code>Number</code>, e maior ou igual a zero (0).
		 *		3.3) addMaximumNumberOfLinesReachedAction deve ser null <code>null</code> ou <code>function</code>.
		 *	4) Se observeRemoveLineEvent for <code>true</code>, então:
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
				isInvariantOkay &=	caixa.util.isBoolean(this.options.gridColorTable) &&
									caixa.util.isBoolean(this.options.observeAddLineEvent) &&
									caixa.util.isBoolean(this.options.observeRemoveLineEvent);
			}

			if (isInvariantOkay) {
				isInvariantOkay &= this.options.observeAddLineEvent || this.options.observeRemoveLineEvent;
			}

			// Opções para addLineEvent
			if (isInvariantOkay) {
				if (this.options.observeAddLineEvent) {
					isInvariantOkay &=	Object.isString(this.options.addEventSourceElementSelector) &&
										Object.isString(this.options.addEventToObserve) &&
										Object.isNumber(this.options.addMaximumNumberOfLines);

					if (isInvariantOkay) {
						isInvariantOkay &=	(this.options.addMaximumNumberOfLinesReachedAction == null) ||
											Object.isFunction(this.options.addMaximumNumberOfLinesReachedAction);
					}

					if (isInvariantOkay) {
						isInvariantOkay &=	!(this.options.addEventSourceElementSelector.blank()) &&
											!(this.options.addEventToObserve.blank()) &&
											(this.options.addMaximumNumberOfLines >= 0);
					}
				}
			}

			// Opções para removeLineEvent
			if (isInvariantOkay) {
				if (this.options.observeRemoveLineEvent) {
					isInvariantOkay &=	Object.isString(this.options.removeEventSourceElementSelector) &&
										Object.isString(this.options.removeEventToObserve) &&
										caixa.util.isBoolean(this.options.removeCanRemoveLastLine);

					if (isInvariantOkay) {
						isInvariantOkay &=	!(this.options.removeEventSourceElementSelector.blank()) &&
											!(this.options.removeEventToObserve.blank());
					}
				}
			}

			// Opções para stripTableLines
			if (isInvariantOkay) {
				if (this.options.gridColorTable) {
					isInvariantOkay &=	Object.isString(this.options.gridCssClassNameForEvenTableLine) &&
										Object.isString(this.options.gridCssClassNameForOddTableLine);

					if (isInvariantOkay) {
						isInvariantOkay &=	!(this.options.gridCssClassNameForEvenTableLine.blank());
					}
				}
			}

			if (!isInvariantOkay) {
				throw("As opcoes do objeto nao respeitam o Invariant da classe.");
			}
		},

		/**
		 * Limpa a propriedade value de todos os elementos DOM filhos
		 * input de propriedade type=text.
		 */
		clearValueOfElementChildrenThatAreInputText: function(element) {
			// Recupera todos os campos texto filhos do elemento.
			var inputTextElements = element.select('input[type=text]');

			if (caixa.util.isNeitherUndefinedNorNull(inputTextElements)) {
				// Limpa o campo.
				inputTextElements.invoke('clear');
			}
		},
	
		/**
		 * Força foco no 1o elemento DOM filho input de propriedade type=text.
		 */
		focusOnElementFirstChildThatIsInputText: function(element) {
			// Recupera o 1o campo texto filho do elemento.
			var firstInputTextElement = element.down('input[type=text]');

			if (caixa.util.isNeitherUndefinedNorNull(firstInputTextElement)) {
				// Força foco no elemento.
				firstInputTextElement.focus();
			}
		},

		/**
		 * Zebrar (grid color) todos os elementos DOM filhos  TR.
		 */
		gridColorElementChildrenThatAreTR: function(element) {
			if (this.options.gridColorTable) {
				if (caixa.util.isNeitherUndefinedNorNull(element)) {
					// Recupera os filhos de element.
					var children = element.childElements();

					// Cache dos CSS Class Names.					
					var gridCssClassNameForEvenTableLine = this.options.gridCssClassNameForEvenTableLine;
					var gridCssClassNameForOddTableLine = this.options.gridCssClassNameForOddTableLine;

					/*
					 * Se o Class Name para linha ímpar estiver "vazio", realmente força vazio.
					 * Isto garante que se for vazio, não será adicionado ou removido dos Class Names aplicados ao
					 * elemento.
					 */
					if (gridCssClassNameForOddTableLine.blank()) {
						gridCssClassNameForOddTableLine = '';
					}

					for (var index = 0, length = children.length; index < length; ++index) {
						var item = children[index];

						// Seleciona apenas os filhos que sejam TR.
						if (item.match('tr')) {
							// É linha par? Zero (0) é par.
							var isEvenLine = ((index % 2) === 0);

							item.addClassName(
								isEvenLine ? gridCssClassNameForEvenTableLine :
									gridCssClassNameForOddTableLine
							);
							item.removeClassName(
								isEvenLine ? gridCssClassNameForOddTableLine :
									gridCssClassNameForEvenTableLine
							);
						}
					}
				}
			}
		},

		/**
		 * Observador para adicionar linha a tabela.
		 *
		 * 1) Localiza a TR contendo o evento recebido.
		 * 2) Verifica se adicionar nova TR ao container parent não ultrapassa limite
		 *    de NEGÓCIO de 20 linhas.
		 * 3) Realiza uma cópia desta.
		 * 4) Limpa o conteúdo de todos os elementos filhos
		 *    input de propriedade type=text da cópia.
		 * 5) Re-adiciona os observadores a esta cópia.
		 * 6) Insere a cópia como a linha imediatamente abaixo.
		 * 7) Apresenta a cópia.
		 * 8) Força foco no 1o filho input de propriedade
		 *    type=text da cópia.
		 */
		addLineEventObserver: function(event) {
			// Localiza a tag TR container deste evento.
			var currentRow = Event.findElement(event, 'tr');

			if (caixa.util.isNeitherUndefinedNorNull(currentRow)) {
				/*
				 * Verifica se adicionar nova TR ao container parent não ultrapassa limite
				 * de NEGÓCIO de 20 linhas.
				 */
				var isAllowedToAdd = true;

				// Existe limite de linhas? Se existir, verifica se alcançamos o limite.
				if (this.options.addMaximumNumberOfLines > 0) {
					var siblings = currentRow.adjacent('tr');

					// Meus irmãos mais eu devem ser menores que o máximo de filhos possível.
					isAllowedToAdd = ((siblings.length + 1) < this.options.addMaximumNumberOfLines);
				}

				if (!isAllowedToAdd) {
					if (this.options.addMaximumNumberOfLinesReachedAction != null) {
						this.options.addMaximumNumberOfLinesReachedAction(currentRow);
					}
				} else {
					// Copia a linha da tabela.
					var newRow = currentRow.cloneNode(true);

					// Oculta o elemento por default.			
					newRow.hide();

					/*
					 * Insere a nova linha abaixo da linha atual.
					 * Insere o mais cedo possível para incrementar
					 * o número de linhas no container.
					 */
					currentRow.insert({ after: newRow });

					// Limpa todos os campos texto da nova linha.
					this.clearValueOfElementChildrenThatAreInputText(newRow);

					/*
					 * O Internet Explorer 6 apresentou problema de duplicação de eventos
					 * quando tentamos re-registrar os observadores.
					 */
					if (!Prototype.Browser.IE) {
						// Re-adiciona observadores a esta linha.
						this.addObserversCallBack(null, newRow);
					}

					// Apresenta o elemento com efeito.
					new Effect.Appear(newRow, {
						duration: .7,

						beforeStart: function(effect) {
							// Elemento em que foi aplicado o efeito e que será adicionado.
							var element = effect.element;

							// Armazena o container do elemento que será adicionado.
							var containerTable = element.up();

							if (this.options.gridColorTable) {
								// Zebra a tabela.
								this.gridColorElementChildrenThatAreTR(containerTable);
							}
						}.bind(this),

						afterFinish: function(effect) {
							// Elemento em que foi aplicado o efeito e que será adicionado.
							var element = effect.element;

							// Força foco no 1o elemento DOM filho input de propriedade type=text.
							this.focusOnElementFirstChildThatIsInputText(element);
						}.bind(this)
					});
				}
			}
		},
	
		/**
		 * Observador para remover linha da tabela.
		 *
		 * 1) Localiza a TR contendo o evento recebido.
		 * 2) Verifica se é a última TR no container parent.
		 * 3) Se for a última, limpa o conteúdo de todos os elementos filhos
		 *    input de propriedade type=text.
		 * 4) Se não for a última, remove esta do container parent.
		 */
		removeLineEventObserver: function(event) {
			// Localiza a tag TR container deste evento.
			var currentRow = Event.findElement(event, 'tr');

			if (caixa.util.isNeitherUndefinedNorNull(currentRow)) {
				// Verificar se esta TR é a última TR no container parent.
				var isLastRow = false;

				// A última linha pode ser removida? Se não puder, verifica se somos a última linha.
				if (!this.options.removeCanRemoveLastLine) {
					var siblings = currentRow.adjacent('tr');

					// Existem irmãos?
					isLastRow = (siblings.length <= 0);
				}

				// Se esta for a última linha.
				if (isLastRow) {
					// Limpa todos os campos texto da linha.
					this.clearValueOfElementChildrenThatAreInputText(currentRow);

					// Força foco no 1o elemento DOM filho input de propriedade type=text.
					this.focusOnElementFirstChildThatIsInputText(currentRow);
				} else { // Se não for a única linha.
					/*
					 * XXX
					 * Esta linha ainda faz parte do documento? Ou seja, tem parentNode?
					 * Protege conta eventos múltiplos sobre o mesmo elemento.
					 *
					 * A proteção correta é exclusão mútua na execução do método observador
					 * ou enfileiramento de eventos.
					 */
				    if (caixa.util.isNeitherUndefinedNorNull(currentRow.parentNode)) {
						// Remove o elemento com efeito.
						new Effect.Fade(currentRow, {
							duration: .4,

							afterFinish: function(effect) {
								// Elemento em que foi aplicado o efeito e que será removido.
								var element = effect.element;

								// Armazena o container do elemento que será removido.
								var containerTable = element.up();

								/*
								 * XXX
								 * Protege novamente.
								 */
							    if (caixa.util.isNeitherUndefinedNorNull(currentRow.parentNode)) {
									// Remove o elemento do container parent.
									element.remove();

									if (this.options.gridColorTable) {
										// Zebra a tabela.
										this.gridColorElementChildrenThatAreTR(containerTable);
									}
								}
							}.bind(this)
						});
					}
				}
			}
		},

		/**
		 * Adiciona observadores as classes CSS removerLinha e adicionarLinha.
		 * Estas classes referenciam elementos para remover a respectiva linha
		 * ou adicionar uma nova linha abaixo.
		 */
		addObserversCallBack: function(event, element) {
			if (this.options.observeAddLineEvent === true) {
				var elementsToObserveForAddLineEvent = null;

				if (element == null) {
					elementsToObserveForAddLineEvent = $$(this.options.addEventSourceElementSelector);
				} else {
					elementsToObserveForAddLineEvent = element.select(this.options.addEventSourceElementSelector);
				}
				
			    elementsToObserveForAddLineEvent.invoke('observe', this.options.addEventToObserve, this.addLineEventObserver.bindAsEventListener(this));
		    }

			if (this.options.observeRemoveLineEvent === true) {
				var elementsToObserveForRemoveLineEvent = null;

				if (element == null) {
					elementsToObserveForRemoveLineEvent = $$(this.options.removeEventSourceElementSelector);
				} else {
					elementsToObserveForRemoveLineEvent = element.select(this.options.removeEventSourceElementSelector);
				}

			    elementsToObserveForRemoveLineEvent.invoke('observe', this.options.removeEventToObserve, this.removeLineEventObserver.bindAsEventListener(this));
			}
		},

		/**
		 * Decorator contra o método addObserversCallBack para permitir a seleção de mútiplos
		 * elementos por meio de um seletor CSS.
		 */
		addObserversCallBackOnCssSelector: function(event, cssSelector) {
			var parentElements = $$(cssSelector);

			parentElements.each(function(element) {
				this.addObserversCallBack(event, element);
			}.bind(this));
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