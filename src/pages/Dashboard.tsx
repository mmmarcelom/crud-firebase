import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Bem-vindo, {user?.email}!</h2>
      <button onClick={logout}>Sair</button>
      <p>Aqui será a área de gestão de clientes.</p>
    </div>
  );
};

export default Dashboard; 