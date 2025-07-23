import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Cliente } from '../types';
import ClienteForm from '../components/ClienteForm';

interface ClienteComId extends Cliente {
  _docId: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<ClienteComId[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<ClienteComId | null>(null);

  const fetchClientes = async () => {
    setLoading(true);
    const clientesCol = collection(db, 'clientes');
    const clientesSnapshot = await getDocs(clientesCol);
    const clientesList = clientesSnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        nome: data.nome || '',
        cpf: data.cpf || '',
        rg: data.rg || '',
        estadoCivil: data.estadoCivil || '',
        nacionalidade: data.nacionalidade || '',
        profissao: data.profissao || '',
        endereco: data.endereco || '',
        complemento: data.complemento || '',
        bairro: data.bairro || '',
        cidade: data.cidade || '',
        estado: data.estado || '',
        cep: data.cep || '',
        _docId: docSnap.id
      } as ClienteComId;
    });
    setClientes(clientesList);
    setLoading(false);
  };

  const handleDelete = async (cpf: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;
    setLoading(true);
    try {
      const clientesCol = collection(db, 'clientes');
      const clientesSnapshot = await getDocs(clientesCol);
      const docToDelete = clientesSnapshot.docs.find(doc => doc.data().cpf === cpf);
      if (docToDelete) {
        await deleteDoc(doc(db, 'clientes', docToDelete.id));
        fetchClientes();
      }
    } catch (err) {
      alert('Erro ao excluir cliente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cliente: ClienteComId) => {
    setEditando(cliente);
  };

  const handleEditFinish = () => {
    setEditando(null);
    fetchClientes();
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
              <th>Estado Civil</th>
              <th>Nacionalidade</th>
              <th>Profissão</th>
              <th>Endereço</th>
              <th>Complemento</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>CEP</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, idx) => (
              <tr key={idx}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.rg}</td>
                <td>{cliente.estadoCivil}</td>
                <td>{cliente.nacionalidade}</td>
                <td>{cliente.profissao}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.complemento}</td>
                <td>{cliente.bairro}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.estado}</td>
                <td>{cliente.cep}</td>
                <td>
                  <button onClick={() => handleEdit(cliente)}>Editar</button>
                  <button onClick={() => handleDelete(cliente.cpf)} style={{marginLeft: 8}}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editando && (
        <div style={{marginTop: 32, border: '1px solid #ccc', padding: 16, borderRadius: 8}}>
          <ClienteForm
            modo="editar"
            clienteInicial={editando}
            docId={editando._docId}
            onClienteAdicionado={handleEditFinish}
          />
          <button onClick={() => setEditando(null)} style={{marginTop: 8}}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Clientes; 