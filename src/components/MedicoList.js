import React, { useState, useEffect } from 'react';
import api from '../api'; // use a instância com token
import MedicoForm from './MedicoForm';

function MedicoList() {
  const [medicos, setMedicos] = useState([]);
  const [editingMedico, setEditingMedico] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMedicos();
  }, []);

  const fetchMedicos = async () => {
    try {
      const response = await api.get('/medico');
      setMedicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      alert('Erro ao carregar médicos. Verifique se a API está rodando e se o token está válido.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirma exclusão?')) {
      try {
        await api.delete(`/medico/${id}`);
        fetchMedicos();
      } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao deletar médico.');
      }
    }
  };

  const handleEdit = (medico) => {
    setEditingMedico(medico);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingMedico(null);
    fetchMedicos();
  };

  return (
    <div>
      <h2>Lista de Médicos</h2>
      <button onClick={() => { setEditingMedico(null); setShowForm(true); }}>Novo Médico</button>
      
      {showForm && (
        <MedicoForm 
          medico={editingMedico} 
          onSave={handleSave} 
          onCancel={() => { setShowForm(false); setEditingMedico(null); }} 
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map(medico => (
            <tr key={medico.id}>
              <td>{medico.id}</td>
              <td>{medico.nome}</td>
              <td>{medico.especialidade}</td>
              <td>
                <button onClick={() => handleEdit(medico)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(medico.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicoList;
