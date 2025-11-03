// src/components/PacienteList.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import PacienteForm from './PacienteForm';

function PacienteList() {
  const [pacientes, setPacientes] = useState([]);
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const res = await api.get('/Usuario');
      setPacientes(res.data);
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
      alert('Erro ao carregar pacientes. Verifique o servidor.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirma exclusão?')) return;
    try {
      await api.delete(`/Usuario/${id}`);
      fetchPacientes();
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Erro ao deletar paciente.');
    }
  };

  const handleEdit = (p) => {
    setEditingPaciente(p);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingPaciente(null);
    fetchPacientes();
  };

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <button onClick={() => { setEditingPaciente(null); setShowForm(true); }}>
        Novo Paciente
      </button>

      {showForm && (
        <PacienteForm
          paciente={editingPaciente}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingPaciente(null); }}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ano Nasc.</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.anoNascimento}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacienteList;
