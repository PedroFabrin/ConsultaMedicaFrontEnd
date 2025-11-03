import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://localhost:7248/api/Secretaria/verificarSecretaria",
        {
          email: usuario,
          senha: senha
        }
      );

      const { access_token } = response.data;
      // Salva o token no localStorage
      localStorage.setItem("token", access_token);

      // ⚡ Atualiza o token no App.js, redirecionando para a app
      onLoginSuccess(access_token);

    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErro("Usuário ou senha incorretos.");
        } else if (error.response.status === 400) {
          setErro("Dados inválidos. Preencha todos os campos obrigatórios.");
        } else {
          setErro("Erro ao conectar com o servidor.");
        }
      } else {
        setErro("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

export default Login;
