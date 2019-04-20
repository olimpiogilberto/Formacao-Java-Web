package br.com.mcsit.model;

import java.sql.*;

import br.com.mcsit.basico.*;

public class LoginDAO {
	private Connection conexao;
	
	public LoginDAO(){
		this.conexao = FabricaConexao.abreConexao();
	}

		
	public Usuario login(Usuario dados){
		
		try{
			String sql = "SELECT * FROM TBUsuario WHERE login = ? AND senha = ?";
					
			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setString(1, dados.getLogin());
			stm.setString(2, dados.getSenha());
			
			ResultSet resultado = stm.executeQuery();
			
			if(resultado.next()){
				dados.setCodigo(resultado.getInt("CODIGO"));
				dados.setNome(resultado.getString("NOME"));
				dados.setLogin(resultado.getString("LOGIN"));
				dados.setSenha(resultado.getString("SENHA"));
				
				
				return dados;
				
			}else{
				return null;
				
			
			}
			
		}
		catch(SQLException erro){
			System.out.println("SQLCODE : " + erro.getErrorCode()
					+"\nERRO: " +erro
					+"\nESTADO: " +erro.getSQLState()
					+"\nMENSAGEM: " +erro.getMessage());
			return null; 
			
		}
		
	}
	
		
	
}








