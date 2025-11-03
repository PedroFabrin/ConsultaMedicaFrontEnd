import React, { useState, useEffect } from 'react';
import api from '../api';

function ConsultaForm({ consulta, medicos, pacientes, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: 0,
    idMedico: '',
    idUsuario: '',
    dataConsulta: '',
  });

  useEffect(() => {
    if (consulta) {
      setForm({
        id: consulta.id,
        idMedico: consulta.idMedico,
        idUsuario: consulta.idUsuario,
        dataConsulta: consulta.dataConsulta?.slice(0, 16) || '',
      });
    } else {
      setForm({
        id: 0,
        idMedico: '',
        idUsuario: '',
        dataConsulta: '',
      });
    }
  }, [consulta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id === 0)
        await api.post('/consulta', form);
      else
        await api.put('/consulta', form);
  
      onSave();
    } catch (err) {
      console.error('Erro ao salvar consulta:', err);
      alert('Erro ao salvar consulta.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>{form.id === 0 ? 'Nova Consulta' : 'Editar Consulta'}</h3>

      <label>Médico:</label>
      <select
        name="idMedico"
        value={form.idMedico}
        onChange={handleChange}
        required
      >
        <option value="">Selecione um médico</option>
        {medicos.length > 0 ? (
          medicos.map((m) => (
            <option key={m.id} value={m.id}>{m.nome}</option>
          ))
        ) : (
          <option disabled>Nenhum médico encontrado</option>
        )}
      </select>

      <label>Paciente:</label>
      <select
        name="idUsuario"
        value={form.idUsuario}
        onChange={handleChange}
        required
      >
        <option value="">Selecione um paciente</option>
        {pacientes.length > 0 ? (
          pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))
        ) : (
          <option disabled>Nenhum paciente encontrado</option>
        )}
      </select>

      <label>Data da consulta:</label>
      <input
        type="datetime-local"
        name="dataConsulta"
        value={form.dataConsulta}
        onChange={handleChange}
        required
      />

      <div style={{ marginTop: 10 }}>
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default ConsultaForm;
