package br.com.mcsit.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.com.mcsit.basico.Disciplina;


public class DisciplinaDAO {
	private Connection conexao;
	
	
	public DisciplinaDAO(){
		this.conexao = FabricaConexao.abreConexao();
	}
	public List<Disciplina> listAll(){
		
		try{
			String sql = "SELECT * FROM TBDisciplinas ORDER BY codigo";
			
			PreparedStatement stm = conexao.prepareStatement(sql);
			ResultSet resultado = stm.executeQuery();
			List<Disciplina> lista = new ArrayList<Disciplina>();
			
		while (resultado.next()){
			Disciplina d = new Disciplina();
			d.setCodigo(resultado.getInt("CODIGO"));
			d.setNome(resultado.getString("NOME"));
			lista.add(d);
		}
		return lista;
		
		}catch (SQLException erro){
			System.out.println("Erro método listAll: " + erro);
			return null;
		}
		
	}
	
public List<Disciplina> listAll(int curso){
		
		try{
			String sql = "SELECT * FROM TBDisciplinas WHERE COD_CURSO = ? ORDER BY codigo ";
			
			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setInt(1, curso);
			
			ResultSet resultado = stm.executeQuery();
			List<Disciplina> lista = new ArrayList<Disciplina>();
			
		while (resultado.next()){
			Disciplina d = new Disciplina();
			d.setCodigo(resultado.getInt("CODIGO"));
			d.setNome(resultado.getString("NOME"));
			d.getCurso().setCodigo(resultado.getInt("COD_CURSO"));
			lista.add(d);
		}
		return lista;
		
		}catch (SQLException erro){
			System.out.println("Erro método listByCourse: " + erro);
			return null;
		}
		
	}

}
