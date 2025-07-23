import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Cliente } from '../types';

interface ClienteFormProps {
  onClienteAdicionado?: () => void;
  clienteInicial?: Cliente | null;
  modo?: 'criar' | 'editar';
  docId?: string | null;
}

const initialState: Cliente = {
  nome: '',
  cpf: '',
  rg: '',
  estadoCivil: '',
  nacionalidade: '',
  profissao: '',
  endereco: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: ''
};

const ClienteForm: React.FC<ClienteFormProps> = ({ onClienteAdicionado, clienteInicial, modo = 'criar', docId }) => {
  const [cliente, setCliente] = useState<Cliente>(clienteInicial || initialState);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (clienteInicial) setCliente(clienteInicial);
  }, [clienteInicial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    try {
      if (modo === 'editar' && docId) {
        await updateDoc(doc(db, 'clientes', docId), cliente as any);
      } else {
        await addDoc(collection(db, 'clientes'), cliente as any);
      }
      setCliente(initialState);
      if (onClienteAdicionado) onClienteAdicionado();
    } catch (err) {
      setErro('Erro ao salvar cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>{modo === 'editar' ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {Object.keys(initialState).map((campo) => (
          <div key={campo} style={{ flex: '1 1 200px', minWidth: 200 }}>
            <label>
              {campo.charAt(0).toUpperCase() + campo.slice(1)}:<br />
              <input
                type="text"
                name={campo}
                value={cliente[campo as keyof Cliente]}
                onChange={handleChange}
                required
                disabled={campo === 'cpf' && modo === 'editar'}
              />
            </label>
          </div>
        ))}
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: 16 }}>
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
};

export default ClienteForm; 