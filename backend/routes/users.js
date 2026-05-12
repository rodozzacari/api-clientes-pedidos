const express = require("express");
const router = express.Router();

const fs = require("fs-extra");
const path = require("path");

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const usersFile = path.join(__dirname, "../data/users.temp.json");

function readUsers() {
    return fs.readJsonSync(usersFile);
}

function saveUsers(users) {
    fs.writeJsonSync(usersFile, users, { spaces: 2 });
}

//
// CADASTRO
//
router.post("/register", async (req, res) => {

    const { cpf, rg, nome, idade, email, login, senha } = req.body;

    const users = readUsers();

    const existe = users.find(
        u =>
            u.login === login
    );

    if (existe) {
        return res.status(400).json({
            message: "Login já existe"
        });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = {
        id: uuidv4(),
        cpf,
        rg,
        nome,
        idade,
        email,
        login,
        senha: senhaHash,
        ativo: true
    };

    users.push(novoUsuario);

    saveUsers(users);

    res.status(201).json({
        message: "Usuário cadastrado",
        usuario: novoUsuario
    });

});

//
// LOGIN
//
router.post("/login", async (req, res) => {

    const { login, senha } = req.body;

    const users = readUsers();

    const usuario = users.find(
        u => u.login === login && u.ativo
    );

    if (!usuario) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
    );

    if (!senhaCorreta) {
        return res.status(401).json({
            message: "Senha inválida"
        });
    }

    res.json({
        message: "Login realizado",
        usuario
    });

});

//
// LISTAR USUÁRIOS
//
router.get("/", (req, res) => {

    const users = readUsers();

    const ativos = users.filter(
        u => u.ativo === true
    );

    res.json(users);

});

//
// ATUALIZAR
//
router.put("/:id", async (req, res) => {

    const users = readUsers();

    const index = users.findIndex(
        u => u.id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    const usuario = users[index];

    const campos = req.body;

    if (campos.senha) {
        campos.senha = await bcrypt.hash(campos.senha, 10);
    }

    users[index] = {
        ...usuario,
        ...campos
    };

    saveUsers(users);

    res.json({
        message: "Usuário atualizado",
        usuario: users[index]
    });

});

//
// EXCLUSÃO FÍSICA
//
router.delete("/:id", (req, res) => {

    let users = readUsers();

    users = users.filter(
        u => u.id !== req.params.id
    );

    saveUsers(users);

    res.json({
        message: "Usuário removido"
    });

});

module.exports = router;