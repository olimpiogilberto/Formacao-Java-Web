package br.com.mcsit.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.com.mcsit.basico.*;

public class CursoDAO {

	private Connection conexao;
	
	
	public CursoDAO(){
		this.conexao = FabricaConexao.abreConexao();
	}
	public List<Curso> listAll(){
		
		try{
			String sql = "SELECT * FROM TBCursos ORDER BY Codigo";
			
			PreparedStatement stm = conexao.prepareStatement(sql);
			ResultSet resultado = stm.executeQuery();
			List<Curso> lista = new ArrayList<Curso>();
			
		while (resultado.next()){
			Curso c = new Curso();
			c.setCodigo(resultado.getInt("CODIGO"));
			c.setNome(resultado.getString("NOME"));
			lista.add(c);
		}
		return lista;
		
		}catch(SQLException erro){
			System.out.println(this.getClass()
					+"\nSQLCODE : " + erro.getErrorCode()
					+"\nERRO: " +erro
					+"\nESTADO: " +erro.getSQLState()
					+"\nMENSAGEM: " +erro.getMessage());
			return null; 
			
		}
		
		
	}

}

