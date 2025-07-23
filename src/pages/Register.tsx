import React, { useState } from 'react';
import ClienteForm from '../components/ClienteForm';
import { useNavigate } from 'react-router-dom';

const RegisterCliente: React.FC = () => {
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleClienteAdicionado = () => {
    setSucesso(true);
  };

  return (
    <div>
      <h1>Cadastrar Cliente</h1>
      {sucesso ? (
        <div>
          <p>Cliente cadastrado com sucesso!</p>
          <button onClick={() => navigate('/clientes')}>Voltar para listagem</button>
        </div>
      ) : (
        <ClienteForm onClienteAdicionado={handleClienteAdicionado} />
      )}
    </div>
  );
};

export default RegisterCliente; 