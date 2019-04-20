/**
 * Biblioteca para operações genéricas.
 *
 * Namespace: caixa.util.
 *
 * @author <a href="mailto:mario.f.ferreira@caixa.gov.br">Mário Sérgio Fujikawa Ferreira
 *         <mario.f.ferreira@caixa.gov.br> (C101038)</a>
 */

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
 * Verifica se uma declaração JavaScript está definida. Ou seja, não está <code>undefined</code> e não é <code>null</code>.
 *
 * Namespace: caixa.util
 * Método: isNeitherUndefinedNorNull
 */
if (caixa.util.isNeitherUndefinedNorNull == null) {
	caixa.util.isNeitherUndefinedNorNull = function(statement) {
		return ((statement !== undefined) && (statement != null));
	};
}

/**
 * Complementa o comportamento <code>typeof</code> do JavaScript padrão. Corrige o retorno incorreto quando utilizado
 * com referências a objetos <code>Array</code> e referência <code>null</code>.
 *
 * <pre>
 * - Se utilizar typeOf em uma referência a um objeto Array será produzido 'Array' ao invés de 'object' como ditado por
 *   typeof.
 * - Se utilizar typeOf em referência null será produzido 'null' ao invés de 'object' como ditado por typeof.
 * </pre>
 *  
 * Namespace: caixa.util
 * Método: typeOf
 *
 * Obtido em: Crockford, Douglas. Remedial JavaScript. Disponível em: <http://javascript.crockford.com/remedial.html>.
 *            Acesso em: 13 ago. 2009.
 */
if (caixa.util.typeOf == null) {
	caixa.util.typeOf = function(object) {
		var s = typeof object;
		if (s === 'object') {
			if (object) {
				if (
					typeof object.length === 'number' &&
					!(object.propertyIsEnumerable('length')) &&
					typeof object.splice === 'function'
					)
				{
					s = 'array';
				}
			} else {
				s = 'null';
			}
		}
		return s;
	};
}

/**
 * Verifica se uma referência de objeto é de um objeto do tipo <code>Boolean</code>.
 *
 * Namespace: caixa.util
 * Método: isBoolean
 */
if (caixa.util.isBoolean == null) {
	caixa.util.isBoolean = function(object) {
		return (typeof(object) === 'boolean');
	};
}