package br.com.mcsit.basico;

import br.com.mcsit.basico.Endereco;

public class Pessoa{
	private Long cpf ;
	private String nome;
	private Endereco endereco = new Endereco();
	
	public Long getCpf() {
		return cpf;
	}
	public void setCpf(Long cpf) {
		this.cpf = cpf;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Endereco getEndereco() {
		return endereco;
	}
	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	
}
