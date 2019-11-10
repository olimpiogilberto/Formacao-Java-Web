package br.com.mcsit.model;

import java.sql.*;

import br.com.mcsit.basico.*;

public class UsuarioDAO {
	private Connection conexao;

	public UsuarioDAO() {
		this.conexao = FabricaConexao.abreConexao();
	}

	public Usuario consultarPorCodigo(Usuario dados) {

		try {
			String sql = "SELECT * FROM TBUsuario WHERE Codigo = ?";

			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setLong(1, dados.getCodigo());

			ResultSet resultado = stm.executeQuery();

			if (resultado.next()) {
				dados.setNome(resultado.getString("Nome"));
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

	public Usuario login(Usuario dados) {

		try {
			String sql = "SELECT * FROM TBUsuario WHERE login = ? AND senha = ?";

			PreparedStatement stm = conexao.prepareStatement(sql);
			stm.setString(1, dados.getLogin());
			stm.setString(2, dados.getSenha());

			ResultSet resultado = stm.executeQuery();

			if (resultado.next()) {
				dados.setCodigo(resultado.getInt("CODIGO"));
				dados.setNome(resultado.getString("NOME"));
				dados.setLogin(resultado.getString("LOGIN"));
				dados.setSenha(resultado.getString("SENHA"));

				return dados;

			} else {
				return null;

			}

		} catch (SQLException erro) {
			System.out.println("SQLCODE : " + erro.getErrorCode() + "\nERRO: "
					+ erro + "\nESTADO: " + erro.getSQLState() + "\nMENSAGEM: "
					+ erro.getMessage());
			return null;

		}

	}

}
