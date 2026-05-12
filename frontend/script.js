const API = "http://localhost:3000/users";

async function cadastrar() {

    const dados = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        rg: document.getElementById("rg").value,
        idade: document.getElementById("idade").value,
        email: document.getElementById("email").value,
        login: document.getElementById("login").value,
        senha: document.getElementById("senha").value
    };

    const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const result = await response.json();

    alert(result.message);

    if (document.getElementById("usuarios")) {

        listarUsuarios();

    }

}

async function listarUsuarios() {

    try {

        const responseUsuarios =
            await fetch("http://localhost:3000/users");

        const usuarios =
            await responseUsuarios.json();

        const responsePedidos =
            await fetch("http://localhost:3000/orders");

        const pedidos =
            await responsePedidos.json();

        const div =
            document.getElementById("usuarios");

        if (!div) return;

        div.innerHTML = "";

        usuarios.forEach(usuario => {

            const pedidosUsuario = pedidos.filter(

                pedido =>
                    pedido.id_usuario === usuario.id

            );

            let pedidosHTML = "";

            if (pedidosUsuario.length === 0) {

                pedidosHTML = `
                    <p>Nenhum pedido</p>
                `;

            } else {

                pedidosUsuario.forEach(pedido => {

                    pedidosHTML += `

                        <div class="pedido">

                            <p>
                                <b>Produto:</b>
                                ${pedido.descricao}
                            </p>

                            <p>
                                <b>Quantidade:</b>
                                ${pedido.quantidade}
                            </p>

                        </div>

                    `;

                });

            }

            div.innerHTML += `

                <div class="usuario">

                    <h3>${usuario.nome}</h3>

                    <p>
                        <b>Email:</b>
                        ${usuario.email}
                    </p>

                    <p>
                        <b>Login:</b>
                        ${usuario.login}
                    </p>

                    <h4>Pedidos</h4>

                    ${pedidosHTML}

                    <button onclick="deletar('${usuario.id}')">
                        Excluir Usuário
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Erro ao listar usuários");

    }

}

async function deletar(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    listarUsuarios();

}

async function fazerLogin() {

    const login = document.getElementById("login").value;

    const senha = document.getElementById("senha").value;

    const response = await fetch(
        "http://localhost:3000/users/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                login,
                senha
            })
        }
    );

    const result = await response.json();

    if (!response.ok) {
        alert(result.message);
        return;
    }

    localStorage.setItem(
        "usuario",
        JSON.stringify(result.usuario)
    );

    alert("Login realizado");

    window.location.href = "perfil.html";

}

function carregarPerfil() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    if (!usuario) {

        window.location.href = "login.html";

        return;
    }

    document.getElementById("cpf").value =
        usuario.cpf;

    document.getElementById("rg").value =
        usuario.rg;

    document.getElementById("nome").value =
        usuario.nome;

    document.getElementById("idade").value =
        usuario.idade;

    document.getElementById("email").value =
        usuario.email;

    document.getElementById("login").value =
        usuario.login;

    listarPedidos();
}

async function atualizarPerfil() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    const dados = {

        cpf:
            document.getElementById("cpf").value,

        rg:
            document.getElementById("rg").value,

        nome:
            document.getElementById("nome").value,

        idade:
            document.getElementById("idade").value,

        email:
            document.getElementById("email").value,

        login:
            document.getElementById("login").value

    };

    const senha =
        document.getElementById("senha").value;

    // Só atualiza senha se preencher
    if (senha.trim() !== "") {
        dados.senha = senha;
    }

    const response = await fetch(
        `http://localhost:3000/users/${usuario.id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        alert(result.message);
        return;
    }

    alert("Dados atualizados");

    localStorage.setItem(
        "usuario",
        JSON.stringify(result.usuario)
    );

}

function logout() {

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}

if (window.location.pathname.includes("perfil.html")) {

    carregarPerfil();

}

async function criarPedido() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    const descricao =
        document.getElementById(
            "descricaoPedido"
        ).value;

    const quantidade =
        document.getElementById(
            "quantidadePedido"
        ).value;

    const response = await fetch(
        "http://localhost:3000/orders",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id_usuario: usuario.id,

                descricao,

                quantidade

            })

        }
    );

    const result = await response.json();

    alert(result.message);

    listarPedidos();

}

async function listarPedidos() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    const response = await fetch(
        `http://localhost:3000/orders/usuario/${usuario.id}`
    );

    const pedidos = await response.json();

    const div =
        document.getElementById("listaPedidos");

    div.innerHTML = "";

    pedidos.forEach(pedido => {

        div.innerHTML += `

            <div class="usuario">

                <p>
                    <b>Produto:</b>
                    ${pedido.descricao}
                </p>

                <p>
                    <b>Quantidade:</b>
                    ${pedido.quantidade}
                </p>

                <button onclick="editarPedido('${pedido.id}')">
                    Editar
                </button>

                <button onclick="excluirPedido('${pedido.id}')">
                    Excluir
                </button>

            </div>

        `;

    });

}

async function excluirPedido(id) {

    await fetch(
        `http://localhost:3000/orders/${id}`,
        {
            method: "DELETE"
        }
    );

    listarPedidos();

}

async function editarPedido(id) {

    const descricao = prompt(
        "Nova descrição:"
    );

    const quantidade = prompt(
        "Nova quantidade:"
    );

    await fetch(
        `http://localhost:3000/orders/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                descricao,

                quantidade

            })

        }
    );

    listarPedidos();

}

function voltarUsuarios() {

    window.location.href = "index.html";

}

listarUsuarios();