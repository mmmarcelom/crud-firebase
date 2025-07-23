const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } = require('firebase/firestore');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase config (mesma configuração do frontend)
const firebaseConfig = {
  apiKey: "AIzaSyBcvChG7msEXA2-7fdeEn_qRz-I7ygkFwM",
  authDomain: "crud-8a905.firebaseapp.com",
  projectId: "crud-8a905",
  storageBucket: "crud-8a905.firebasestorage.app",
  messagingSenderId: "963044332372",
  appId: "1:963044332372:web:2586d361412db9a365eec1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Rotas
app.get('/api/clientes', async (req, res) => {
  try {
    const clientesCol = collection(db, 'clientes');
    const clientesSnapshot = await getDocs(clientesCol);
    const clientes = clientesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const cliente = req.body;
    
    // Validações básicas
    if (!cliente.nome || !cliente.cpf) {
      return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
    }
    
    // Verificar se CPF já existe
    const clientesCol = collection(db, 'clientes');
    const clientesSnapshot = await getDocs(clientesCol);
    const cpfExiste = clientesSnapshot.docs.some(doc => doc.data().cpf === cliente.cpf);
    
    if (cpfExiste) {
      return res.status(400).json({ error: 'CPF já cadastrado' });
    }
    
    // Adicionar cliente
    const docRef = await addDoc(collection(db, 'clientes'), cliente);
    
    res.status(201).json({
      id: docRef.id,
      ...cliente,
      message: 'Cliente adicionado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.put('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = req.body;
    
    if (!cliente.nome || !cliente.cpf) {
      return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
    }
    
    await updateDoc(doc(db, 'clientes', id), cliente);
    
    res.json({
      id,
      ...cliente,
      message: 'Cliente atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await deleteDoc(doc(db, 'clientes', id));
    
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em: http://localhost:${PORT}/api`);
});

module.exports = app; 