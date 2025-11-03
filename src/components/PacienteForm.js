// src/components/PacienteForm.js
import React, { useState, useEffect } from 'react';
import api from '../api'; // instância axios com token já configurada

function PacienteForm({ paciente, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    anoNascimento: new Date().getFullYear()
  });

  useEffect(() => {
    if (paciente) {
      setFormData({
        nome: paciente.nome || '',
        anoNascimento: paciente.anoNascimento || new Date().getFullYear()
      });
    }
  }, [paciente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'anoNascimento' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nome: formData.nome,
        anoNascimento: Number(formData.anoNascimento)
      };

      if (paciente) {
        await api.put(`/Usuario/${paciente.id}`, payload);
      } else {
        await api.post(`/Usuario`, payload);
      }

      onSave();
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
      // mensagem mais descritiva pra debug
      const errMsg = error.response?.data || error.message;
      alert('Erro ao salvar paciente. Veja console (backend stack). \n' + JSON.stringify(errMsg));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{paciente ? 'Editar Paciente' : 'Novo Paciente'}</h3>

      <input
        type="text"
        name="nome"
        placeholder="Nome do Paciente"
        value={formData.nome}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="anoNascimento"
        placeholder="Ano de Nascimento"
        value={formData.anoNascimento}
        onChange={handleChange}
        required
      />

      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default PacienteForm;
