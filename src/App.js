import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedicoList from './components/MedicoList';
import ConsultaList from './components/ConsultaList';
import PacienteList from './components/PacienteList';
import Login from './components/Login';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('medicos'); // aba ativa
  const [token, setToken] = useState(null); // token de login

  // Recupera token salvo no localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // volta para a tela de login
  };

  // Se não estiver logado, mostra o Login
  if (!token) {
    return <Login onLoginSuccess={setToken} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Cadastro de Consultas Médicas</h1>
        <nav>
          <button
            onClick={() => setActiveTab('medicos')}
            className={activeTab === 'medicos' ? 'active' : ''}
          >
            Médicos
          </button>
          <button
            onClick={() => setActiveTab('consultas')}
            className={activeTab === 'consultas' ? 'active' : ''}
          >
            Consultas
          </button>
          <button
            onClick={() => setActiveTab('pacientes')}
            className={activeTab === 'pacientes' ? 'active' : ''}
          >
            Pacientes
          </button>
          <button
            onClick={handleLogout}
            style={{ marginLeft: '20px', backgroundColor: '#c62828', color: '#fff' }}
          >
            Sair
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'medicos' && <MedicoList token={token} />}
        {activeTab === 'consultas' && <ConsultaList token={token} />}
        {activeTab === 'pacientes' && <PacienteList token={token} />}
      </main>
    </div>
  );
}

export default App;
