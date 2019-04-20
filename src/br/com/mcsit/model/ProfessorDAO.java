package br.com.mcsit.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


import br.com.mcsit.basico.Professor;

public class ProfessorDAO {
	private Connection conexao;
	
	public ProfessorDAO(){
		this.conexao = FabricaConexao.abreConexao();
	}

	public boolean cadastrar(Professor dados){
		
		try{
			String sql = "INSERT TBProfessor (cpf, nome, rgf, disciplina, cep, rua, bairro)" +
					"VALUES (?, ?, ?, ?, ?, ?, ?)";
					
			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(1, dados.getCpf());
			stm.setString(2, dados.getNome());
			stm.setLong(3, dados.getRgf());
			stm.setString(4, dados.getDisciplina());
			stm.setLong(5, dados.getEndereco().getCep());
			stm.setString(6, dados.getEndereco().getRua());
			stm.setString(7, dados.getEndereco().getBairro());
			
			boolean erro = stm.execute();
			
			return !erro;
			
		}
		catch(SQLException erro){
			System.out.println("Erro: " + erro);
			return false;
		}
	}

	public boolean alterar(Professor dados){
		
		try{
			String sql = "UPDATE TBProfessor SET Nome = ?, RGF = ?, "+
					"disciplina = ?, CEP = ?, Rua = ?, Bairro = ?" +
					"WHERE CPF = ?";
					
			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(7, dados.getCpf());
			stm.setString(1, dados.getNome());
			stm.setLong(2, dados.getRgf());
			stm.setString(3, dados.getDisciplina());
			stm.setLong(4, dados.getEndereco().getCep());
			stm.setString(5, dados.getEndereco().getRua());
			stm.setString(6, dados.getEndereco().getBairro());
			
			boolean erro = stm.execute();
			
			return !erro;
			
		}
		catch(SQLException erro){
			System.out.println("Erro: " + erro);
			return false;
		}
	}

	public boolean excluir(Professor dados){
	
		try{
			String sql = "DELETE FROM TBProfessor WHERE CPF = ?";
					
			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(1, dados.getCpf());
						
			boolean erro = stm.execute();
			
			return !erro;
			
		}
		catch(SQLException erro){
			System.out.println("Erro: " + erro);
		    return false;
			
		}
	}	
	
	public Professor consultarPorCpf(Professor dados){
		
		try{
			String sql = "SELECT * FROM TBProfessor WHERE CPF = ?";
					
			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(1, dados.getCpf());
						
			ResultSet resultado = stm.executeQuery();
			
			if(resultado.next()){
				dados.setNome(resultado.getString("Nome"));
				dados.setRgf(resultado.getInt("RGF"));
				dados.setDisciplina(resultado.getString("Disciplina"));
				dados.getEndereco().setCep(resultado.getLong("CEP"));
				dados.getEndereco().setRua(resultado.getString("Rua"));
				dados.getEndereco().setBairro(resultado.getString("Bairro"));
				
				return dados;
				
			}else{
				return null;
				
			
			}
			
		}
		catch(SQLException erro){
			System.out.println("Erro: " + erro);
			return null; 
			
		}
		
	}
	
public List<Professor> consultarPorNome(Professor dados){
		
		try{
			String sql = "SELECT * FROM TBProfessor WHERE NOME LIKE ? ORDER BY NOME";
					
			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setString(1, "%" +dados.getNome() + "%");
						
			ResultSet resultado = stm.executeQuery();
			List<Professor>lista = new ArrayList<Professor>();
			
			while(resultado.next()){
				Professor p = new Professor();
				p.setCpf(resultado.getLong("CPF"));
				p.setRgf(resultado.getInt("RGF"));
				p.setNome(resultado.getString("NOME"));
				p.setDisciplina(resultado.getString("Disciplina"));
				p.getEndereco().setCep(resultado.getLong("CEP"));
				p.getEndereco().setRua(resultado.getString("Rua"));
				p.getEndereco().setBairro(resultado.getString("Bairro"));
				
				lista.add(p);
				
			}
				return lista;
						
		}
		catch(SQLException erro){
			System.out.println("Erro: " + erro);
			return null; 
			
		}
		
	}
	
}







