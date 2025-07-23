# CRUD Firebase - Clientes

Projeto de CRUD de clientes usando React + TypeScript + Firebase, com backend Express para APIs REST.

## 🚀 Como rodar o projeto

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar o backend (servidor Express)
```bash
npm run dev:server
```
O servidor estará disponível em: `http://localhost:3000`

### 3. Rodar o frontend (React + Vite)
```bash
npm run dev
```
O frontend estará disponível em: `http://localhost:5173`

## 📡 APIs disponíveis

### Base URL: `http://localhost:3000/api`

#### GET `/clientes`
- **Descrição**: Lista todos os clientes
- **Resposta**: Array de clientes com IDs

#### POST `/clientes`
- **Descrição**: Adiciona um novo cliente
- **Body**:
```json
{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "rg": "12.345.678-9",
  "estadoCivil": "Solteiro",
  "nacionalidade": "Brasileiro",
  "profissao": "Desenvolvedor",
  "endereco": "Rua das Flores, 123",
  "complemento": "Apto 45",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234-567"
}
```

#### PUT `/clientes/:id`
- **Descrição**: Atualiza um cliente existente
- **Body**: Mesmo formato do POST

#### DELETE `/clientes/:id`
- **Descrição**: Remove um cliente

#### GET `/health`
- **Descrição**: Verifica se o servidor está funcionando

## 🧪 Testando com Insomnia

### Configuração da POST request:

1. **Método**: POST
2. **URL**: `http://localhost:3000/api/clientes`
3. **Headers**:
   ```
   Content-Type: application/json
   ```
4. **Body** (JSON):
   ```json
   {
     "nome": "Maria Santos",
     "cpf": "987.654.321-00",
     "rg": "98.765.432-1",
     "estadoCivil": "Casada",
     "nacionalidade": "Brasileira",
     "profissao": "Advogada",
     "endereco": "Av. Paulista, 1000",
     "complemento": "Sala 101",
     "bairro": "Bela Vista",
     "cidade": "São Paulo",
     "estado": "SP",
     "cep": "01310-100"
   }
   ```

## 🔧 Scripts disponíveis

- `npm run dev` - Roda o frontend
- `npm run dev:server` - Roda o backend com nodemon (auto-reload)
- `npm run server` - Roda o backend
- `npm run build` - Build do frontend
- `npm run preview` - Preview do build
- `npm run lint` - Lint do código

## 📁 Estrutura do projeto

```
crud-firebase/
├── src/
│   ├── components/
│   │   ├── ClienteForm.tsx
│   │   └── PrivateRoute.tsx
│   ├── pages/
│   │   ├── Clientes.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── services/
│   │   └── firebase.ts
│   └── types.ts
├── server.js
└── package.json
```

## 🔐 Autenticação

O projeto usa Firebase Authentication. As rotas do frontend são protegidas por `PrivateRoute`.

## 🗄️ Banco de dados

Firebase Firestore com coleção `clientes`.
