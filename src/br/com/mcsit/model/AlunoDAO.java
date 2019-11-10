package br.com.mcsit.model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import br.com.mcsit.basico.*;

public class AlunoDAO {
	private Connection conexao;

	public AlunoDAO() {
		this.conexao = FabricaConexao.abreConexao();
	}

	public boolean cadastrar(Aluno dados) {

		try {
			String sql = "INSERT TBAluno (ra, cpf, nome, curso, rua, numero, bairro, cep)"
					+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(1, dados.getRa());
			stm.setLong(2, dados.getCpf());
			stm.setString(3, dados.getNome());
			stm.setString(4, dados.getCurso());
			stm.setString(5, dados.getEndereco().getRua());
			stm.setInt(6, dados.getEndereco().getNumero());
			stm.setString(7, dados.getEndereco().getBairro());
			stm.setLong(8, dados.getEndereco().getCep());

			boolean erro = stm.execute();

			return !erro;

		} catch (SQLException erro) {
			System.out.println(this.getClass() + "\nSQLCODE : "
					+ erro.getErrorCode() + "\nERRO: " + erro + "\nESTADO: "
					+ erro.getSQLState() + "\nMENSAGEM: " + erro.getMessage());
			return false;
		}
	}

	public boolean alterar(Aluno dados) {

		try {
			String sql = "UPDATE TBAluno SET Nome = ?, CPF = ?, "
					+ "curso = ?, CEP = ?, Rua = ?, Bairro = ?"
					+ "WHERE RA = ?";

			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(7, dados.getRa());
			stm.setString(1, dados.getNome());
			stm.setLong(2, dados.getCpf());
			stm.setString(3, dados.getCurso());
			stm.setLong(4, dados.getEndereco().getCep());
			stm.setString(5, dados.getEndereco().getRua());
			stm.setString(6, dados.getEndereco().getBairro());

			boolean erro = stm.execute();

			return !erro;

		} catch (SQLException erro) {
			System.out.println(this.getClass() + "SQLCODE : "
					+ erro.getErrorCode() + "\nERRO: " + erro + "\nESTADO: "
					+ erro.getSQLState() + "\nMENSAGEM: " + erro.getMessage());
			return false;
		}
	}

	public boolean excluir(Aluno dados) {

		try {
			String sql = "DELETE FROM TBAluno WHERE CPF = ?";

			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(1, dados.getCpf());

			boolean erro = stm.execute();

			return !erro;

		} catch (SQLException erro) {
			System.out.println(this.getClass() + "\nSQLCODE : "
					+ erro.getErrorCode() + "\nERRO: " + erro + "\nESTADO: "
					+ erro.getSQLState() + "\nMENSAGEM: " + erro.getMessage());
			return false;

		}
	}

	public Aluno consultarPorCpf(Aluno dados) {

		try {
			String sql = "SELECT * FROM TBAluno WHERE CPF = ?";

			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(1, dados.getCpf());

			ResultSet resultado = stm.executeQuery();

			if (resultado.next()) {
				dados.setNome(resultado.getString("Nome"));
				dados.setRa(resultado.getInt("RA"));
				dados.setCurso(resultado.getString("CURSO"));
				dados.getEndereco().setCep(resultado.getLong("CEP"));
				dados.getEndereco().setRua(resultado.getString("Rua"));
				dados.getEndereco().setBairro(resultado.getString("Bairro"));

				return dados;

			} else {
				return null;

			}

		} catch (SQLException erro) {
			System.out.println(this.getClass() + "\nSQLCODE : "
					+ erro.getErrorCode() + "\nERRO: " + erro + "\nESTADO: "
					+ erro.getSQLState() + "\nMENSAGEM: " + erro.getMessage());
			return null;

		}

	}

	public List<Aluno> consultarPorNome(Aluno dados) {

		try {
			String sql = "SELECT * FROM TBAluno WHERE NOME LIKE ? ORDER BY NOME";

			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setString(1, "%" + dados.getNome() + "%");

			ResultSet resultado = stm.executeQuery();
			List<Aluno> lista = new ArrayList<Aluno>();

			while (resultado.next()) {
				Aluno a = new Aluno();
				a.setRa(resultado.getInt("RA"));
				a.setNome(resultado.getString("Nome"));
				a.setCpf(resultado.getLong("CPF"));
				a.setCurso(resultado.getString("CURSO"));
				a.getEndereco().setCep(resultado.getLong("CEP"));
				a.getEndereco().setRua(resultado.getString("Rua"));
				a.getEndereco().setBairro(resultado.getString("Bairro"));

				lista.add(a);

			}
			return lista;

		} catch (SQLException erro) {
			System.out.println(this.getClass() + "\nSQLCODE: "
					+ erro.getErrorCode() + "\nERRO: " + erro + "\nESTADO: "
					+ erro.getSQLState() + "\nMENSAGEM: " + erro.getMessage());
			return null;

		}

	}

}
