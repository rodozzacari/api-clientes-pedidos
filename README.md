# 🚀 API de Cadastro de Clientes e Pedidos

Projeto desenvolvido para fins educacionais e avaliação técnica Full Stack.

O sistema permite:

- Cadastro de clientes
- Login de usuários
- Atualização de dados
- Exclusão de usuários
- Criação de pedidos
- Edição e exclusão de pedidos
- Listagem de usuários e pedidos

---

# 📸 Interface do Sistema

## Cadastro de Usuários

Sistema de cadastro contendo:

- CPF
- RG
- Nome
- Idade
- Email
- Login
- Senha

---

## Login

Após cadastro, o usuário pode acessar o sistema utilizando:

- Login
- Senha

---

## Área do Usuário

Após login o usuário possui acesso a:

✅ Atualização de perfil  
✅ Alteração de senha  
✅ Criação de pedidos  
✅ Edição de pedidos  
✅ Exclusão de pedidos  

---

# 📦 Pedidos

Cada pedido é vinculado ao usuário autenticado.

Exemplos:
- Mouse Gamer
- Headset
- Notebook
- Teclado Mecânico

Cada pedido possui:
- descrição
- quantidade

---

# 🛠 Tecnologias Utilizadas

## Backend
- Node.js
- Express
- bcryptjs
- uuid
- fs-extra
- cors

## Frontend
- HTML5
- CSS3
- JavaScript

---

# 📁 Estrutura do Projeto

```txt
PROJETO-API/
│
├── README.md
│
├── backend/
│   ├── data/
│   │   ├── users.temp.json
│   │   └── orders.temp.json
│   │
│   ├── routes/
│   │   ├── users.js
│   │   └── orders.js
│   │
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── assets/
│   ├── index.html
│   ├── login.html
│   ├── perfil.html
│   ├── style.css
│   └── script.js
```

---

# ⚙️ Instalação do Projeto

## 1️⃣ Clonar repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2️⃣ Entrar na pasta backend

```bash
cd backend
```

---

## 3️⃣ Instalar dependências

```bash
npm install
```

---

# ▶️ Executando o Backend

Dentro da pasta backend execute:

```bash
node server.js
```

Servidor iniciado em:

```txt
http://localhost:3000
```

---

# 🌐 Executando o Frontend

Utilize a extensão:

```txt
Live Server (VSCode)
```

Abra:

```txt
frontend/index.html
```

com:

```txt
Open With Live Server
```

---

# 🔐 Fluxo de Utilização

## 1️⃣ Cadastro

O usuário realiza cadastro informando:

- CPF
- RG
- Nome
- Idade
- Email
- Login
- Senha

---

## 2️⃣ Login

Após cadastro o usuário deve acessar:

```txt
login.html
```

informando:
- login
- senha

---

## 3️⃣ Perfil

Após autenticação o usuário poderá:

✅ atualizar dados  
✅ alterar senha  
✅ criar pedidos  
✅ editar pedidos  
✅ excluir pedidos  

---

# 📡 Endpoints da API

# 👤 Usuários

---

## Cadastro de usuário

```http
POST /users/register
```

### Exemplo JSON

```json
{
  "cpf": "12345678900",
  "rg": "1234567",
  "nome": "Rodrigo",
  "idade": 32,
  "email": "teste@email.com",
  "login": "rodrigo123",
  "senha": "123456"
}
```

---

## Login

```http
POST /users/login
```

### Exemplo

```json
{
  "login": "rodrigo123",
  "senha": "123456"
}
```

---

## Listar usuários

```http
GET /users
```

---

## Atualizar usuário

```http
PUT /users/:id
```

---

## Excluir usuário

```http
DELETE /users/:id
```

---

# 📦 Pedidos

---

## Criar pedido

```http
POST /orders
```

### Exemplo

```json
{
  "id_usuario": "ID_DO_USUARIO",
  "descricao": "Mouse Gamer",
  "quantidade": 2
}
```

---

## Listar pedidos

```http
GET /orders
```

---

## Listar pedidos por usuário

```http
GET /orders/usuario/:id_usuario
```

---

## Atualizar pedido

```http
PUT /orders/:id
```

---

## Excluir pedido

```http
DELETE /orders/:id
```

---

# 💾 Persistência de Dados

Os dados são armazenados em:

```txt
backend/data/users.temp.json
backend/data/orders.temp.json
```

---

# 🎨 Interface

O sistema possui:

✅ Interface moderna  
✅ Layout responsivo  
✅ Login de usuários  
✅ Área de perfil  
✅ CRUD de pedidos  
✅ Listagem de usuários  
✅ Integração frontend + backend  

---

# ✅ Requisitos Atendidos

✔ Cadastro de clientes  
✔ Login de usuário  
✔ Atualização de dados cadastrais  
✔ Exclusão de usuário  
✔ Listagem de usuários  
✔ Criação de pedidos vinculados ao usuário  
✔ Listagem de pedidos geral e por usuário  
✔ README com instruções de instalação e execução  
✔ Documentação clara dos endpoints  

---

# 👨‍💻 Autor

Rodrigo dos Santos Zacari

---

# 📄 Licença

Projeto desenvolvido para fins educacionais e avaliação técnica.

