const express = require("express");
const router = express.Router();

const fs = require("fs-extra");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const ordersFile = path.join(
    __dirname,
    "../data/orders.temp.json"
);

function readOrders() {

    if (!fs.existsSync(ordersFile)) {
        fs.writeJsonSync(ordersFile, []);
    }

    return fs.readJsonSync(ordersFile);

}

function saveOrders(orders) {

    fs.writeJsonSync(
        ordersFile,
        orders,
        { spaces: 2 }
    );

}

//
// CRIAR PEDIDO
//
router.post("/", (req, res) => {

    const {
        id_usuario,
        descricao,
        quantidade
    } = req.body;

    const orders = readOrders();

    const novoPedido = {

        id: uuidv4(),

        id_usuario,

        descricao,

        quantidade

    };

    orders.push(novoPedido);

    saveOrders(orders);

    res.status(201).json({

        message: "Pedido criado",

        pedido: novoPedido

    });

});

//
// LISTAR TODOS
//
router.get("/", (req, res) => {

    const orders = readOrders();

    res.json(orders);

});

//
// LISTAR POR USUÁRIO
//
router.get("/usuario/:id_usuario", (req, res) => {

    const orders = readOrders();

    const pedidosUsuario = orders.filter(
        o => o.id_usuario === req.params.id_usuario
    );

    res.json(pedidosUsuario);

});

//
// ATUALIZAR PEDIDO
//
router.put("/:id", (req, res) => {

    const orders = readOrders();

    const index = orders.findIndex(
        o => o.id === req.params.id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Pedido não encontrado"
        });

    }

    orders[index] = {

        ...orders[index],

        ...req.body

    };

    saveOrders(orders);

    res.json({

        message: "Pedido atualizado",

        pedido: orders[index]

    });

});

//
// EXCLUIR PEDIDO
//
router.delete("/:id", (req, res) => {

    let orders = readOrders();

    orders = orders.filter(
        o => o.id !== req.params.id
    );

    saveOrders(orders);

    res.json({
        message: "Pedido removido"
    });

});

module.exports = router;