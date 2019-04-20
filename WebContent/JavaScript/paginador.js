/*******************************************************************************
 * Autor: Adriano Pamplona
 * Data de criação: 01/05/2007
 * Versão: 1.0.0
 *******************************************************************************
 * Objetivo: 
 *		Funções para uso da paginação.
 *******************************************************************************
 * Dependências: 
 *		Nenhuma
 *******************************************************************************
 * métodos do objeto:
 *		acaoLinkPagina(formulario, acao, parametro, pagina)
 *******************************************************************************
 * Exemplo:
 * 		N/A
 *******************************************************************************
 */

/**
 * Função responsável pela submissão ao clicar no link da paginação.
 * 
 * @formulario
 * @acao
 * @parametro
 * @pagina
 */
function acaoLinkPagina(formulario, acao, parametro, pagina) {
	formulario = document.getElementsByName(formulario)[0];
	formulario.action = acao;
	formulario[parametro].value = pagina;
	formulario.submit();
}
