import React, { useState, useEffect } from 'react';
import api from "../api";



import ConsultaForm from './ConsultaForm';

function ConsultaList() {
  const [consultas, setConsultas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [editingConsulta, setEditingConsulta] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    carregarConsultas();
    carregarMedicos();
    carregarPacientes();
  }, []);

  const carregarConsultas = async () => {
    try {
      const response = await api.get('/consulta');
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  const carregarMedicos = async () => {
    try {
      const response = await api.get('/medico');
      setMedicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  const carregarPacientes = async () => {
    try {
      const response = await api.get('/usuario');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirma exclusão?')) {
      await api.delete(`/consulta/${id}`);
      carregarConsultas();
    }
  };

  const handleEdit = (consulta) => {
    setEditingConsulta(consulta);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingConsulta(null);
    carregarConsultas();
  };

  return (
    <div>
      <h2>Consultas</h2>
      <button onClick={() => { setEditingConsulta(null); setShowForm(true); }}>
        Nova Consulta
      </button>

      {showForm && (
        <ConsultaForm
          consulta={editingConsulta}
          medicos={medicos}
          pacientes={pacientes}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Médico</th>
            <th>Paciente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{new Date(c.dataConsulta).toLocaleString()}</td>
              <td>{c.medico?.nome || '—'}</td>
              <td>{c.usuario?.nome || '—'}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaList;
