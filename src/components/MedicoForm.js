import React, { useState, useEffect } from 'react';
import api from '../api'; // use a instância com token

function MedicoForm({ medico, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: ''
  });

  useEffect(() => {
    if (medico) {
      setFormData({ nome: medico.nome, especialidade: medico.especialidade });
    }
  }, [medico]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (medico) {
        await api.put(`/medico/${medico.id}`, formData);
      } else {
        await api.post(`/medico`, formData);
      }
      onSave();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar médico.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{medico ? 'Editar Médico' : 'Novo Médico'}</h3>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="especialidade"
        placeholder="Especialidade"
        value={formData.especialidade}
        onChange={handleChange}
        required
      />
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default MedicoForm;
