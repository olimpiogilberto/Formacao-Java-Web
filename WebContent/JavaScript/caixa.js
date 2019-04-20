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
 * Cria namespace caixa.util.date.
 */
if (caixa.util.date == null)
	caixa.util.date = {};

/**
 * "Classe" para criacao e manipulacao de objetos do tipo Semestre.
 *
 * Namespace: caixa.util.date
 * Classe: Semestre
 * Construtor: Semestre(stringSemestre)
 *
 * @author <a href="mailto:gustavo.rocha@caixa.gov.br">Gustavo de Moura Rocha
 *         <gustavo.rocha@caixa.gov.br> (C101215)</a>
 */
if (caixa.util.date.Semestre == null) {
	/**
	 * Construtor.
	 * 
	 * Exemplo:
	 * 
	 * Semestre("1/2009");
	 * 
	 * @param stringSemestre
	 *            Semestre em string no formato "9/9999".
	 */
	caixa.util.date.Semestre = function(stringSemestre) {
		this.stringSemestre = stringSemestre;
		this.dataInicial = null;
		this.dataFinal = null;
		this._converterDatas();
	};
	
	caixa.util.date.Semestre.prototype = {
		_converterDatas : function() {
			if (this.stringSemestre == null || this.stringSemestre == "" || this.stringSemestre.length != 6) {
				return;
			}
			var semestre = this.stringSemestre.substr(0,1);
			var ano = this.stringSemestre.substr(2,4);
			if (semestre == "1") {
				this.dataInicial = caixa.util.date.converterData("01/01/" + ano);
				this.dataFinal = caixa.util.date.converterData("30/06/" + ano);
			} else if (semestre == "2") {
				this.dataInicial = caixa.util.date.converterData("01/07/" + ano);
				this.dataFinal = caixa.util.date.converterData("31/12/" + ano);
			}
		}
	};
}

if (caixa.util.date.converterData == null) {
	caixa.util.date.converterData = function(stringDate) {
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
}

