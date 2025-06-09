import express from "express";
const host = "0.0.0.0";
const port = 3001;
var listaUsuarios = [];
var listaProdutos = [];
const app = express();

import path from "path";
import { escape } from "querystring";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});

//PÁGINA INICIAL
app.get("/", (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

//PÁGINA DE LOGIN
app.get('/login', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "public", "login.html"));
});

//GUARDAR NOME DE USUÁRIOS E VERIFICAÇÃO DO LOGIN
app.post("/login", (requisicao, resposta) => {
    const email = requisicao.body.email;
    const password = requisicao.body.password;

    if (email && password) {
        listaUsuarios.push({
            email: email
        });
        resposta.redirect("/");
    }
    else {
        let conteudo = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8" />
            <title>Minha Aplicação</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <link rel="stylesheet" href="/login.css" />
        </head>
        <body>
            <nav class="navbar fixed-top navbar-dark bg-dark">
                <div class="container d-flex justify-content-between align-items-center">
                    <a class="navbar-brand" href="/">ProdManager</a>
                    <div class="nav-items">
                        <a class="nav-item nav-link" href="#">Todos os produtos</a>
                        <a class="nav-item nav-link" href="#">Cadastrar produtos</a>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                    </div>
                </div>
            </nav>

            <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
                <div class="container" style="max-width: 500px;">
                    <h2 class="mb-4">Bem-vindo de volta</h2>
                    <form method="POST" action="/login">
                        <div class="mb-3">`;

        if (!email) {
            conteudo = conteudo + `
                                <label class="form-label">E-mail</label>
                                <div class="input-group">
                                    <input type="email" class="form-control" placeholder="nome@email.com" id="email" name="email">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                </div>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
        }

        else {
            conteudo = conteudo + `
                                <label class="form-label">E-mail</label>
                                <div class="input-group">
                                    <input type="email" class="form-control" placeholder="nome@email.com" id="email" name="email">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                </div>
                                `;
        }

        conteudo = conteudo + `
                        </div>

                        <div class="mb-3">`
            ;
        if (!password) {
            conteudo = conteudo + `
                                <label class="form-label">Senha</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" placeholder="Digite sua senha..." id="password" name="password">
                                    <span class="input-group-text password-toggle"><i class="fas fa-eye"></i></span>
                                </div>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
        }

        else {
            conteudo = conteudo + `
                                <label class="form-label">Senha</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" placeholder="Digite sua senha..." id="password" name="password">
                                    <span class="input-group-text password-toggle"><i class="fas fa-eye"></i></span>
                                </div>
                                `;
        }

        conteudo = conteudo + `
                        </div>

                        <div class="form-check">
                            <div>
                                <input type="checkbox" class="form-check-input" id="remember" name="remember">
                                <label class="form-check-label" for="remember">Lembrar de mim</label>
                            </div>
                            <a href="#" class="text-decoration-none">Esqueci a senha</a>
                        </div>

                        <button type="submit" class="btn btn-login text-white">Login</button>

                        <div class="divider">
                            <span>ou continue com</span>
                        </div>

                        <div class="social-login">
                            <button type="button" class="btn btn-social" onclick="window.location.href='https://www.google.com';">
                                <i class="fab fa-google"></i>Google
                            </button>
                            <button type="button" class="btn btn-social" onclick="window.location.href='https://www.facebook.com';">
                                <i class="fab fa-facebook-f"></i>Facebook
                            </button>
                        </div>

                        <div class="register-link">
                            Não tem uma conta? <a href="#" class="text-decoration-none">Cadastre-se agora</a>
                        </div>
                    </form>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
        resposta.send(conteudo);
    }
});

//PÁGINA DE CADASTRO
app.get('/cadastro', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

//GUARDAR NOME DE PRODUTOS E VERIFICAÇÃO DOS CADASTROS
app.post("/cadastro", (requisicao, resposta) => {
    const codigo_barras = requisicao.body.codigo_barras;
    const descricao = requisicao.body.descricao;
    const preco_custo = requisicao.body.preco_custo;
    const preco_venda = requisicao.body.preco_venda;
    const validade = requisicao.body.validade;
    const estoque = requisicao.body.estoque;
    const fabricante = requisicao.body.fabricante;

    if (codigo_barras?.trim() && descricao?.trim() && preco_custo?.trim() && preco_venda?.trim() && validade?.trim() && estoque?.trim() && fabricante?.trim() && estoque !== undefined && estoque !== "") {
        listaProdutos.push({
            codigo_barras: codigo_barras,
            descricao: descricao,
            preco_custo: preco_custo,
            preco_venda: preco_venda,
            validade: validade,
            estoque: estoque,
            fabricante: fabricante
        });
        resposta.redirect("/produtos");
    }

    else {
        let conteudo = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8" />
            <title>Minha Aplicação</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <link rel="stylesheet" href="/cadastro.css"/>
        </head>
        <body>
            <nav class="navbar fixed-top navbar-dark bg-dark">
                <div class="container d-flex justify-content-between align-items-center">
                    <a class="navbar-brand" href="/">ProdManager</a>
                    <div class="nav-items">
                        <a class="nav-item nav-link" href="#">Todos os produtos</a>
                        <a class="nav-item nav-link" href="#">Cadastrar produtos</a>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                    </div>
                </div>
            </nav>

            <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
                <div class="container" style="max-width: 500px;">
                    <h2 class="mb-4">Cadastro de Produto</h2>
                    <form method="POST" action="/cadastro">

                        <div class="mb-3">
        `;

        if (!codigo_barras) {
            conteudo = conteudo + `
            <label class="form-label">Código de barras</label>
                <div class="input-group">
                    <input type="text" class="form-control" name="codigo_barras" id="codigo_barras" value="${codigo_barras}" placeholder="Ex: 7891234567890">
                    <span class="input-group-text"><i class="fas fa-barcode"></i></span>
                </div>
            <span class="text-danger">Campo obrigatório</span>
            `;
        }
        else {
            conteudo = conteudo + `
            <label class="form-label">Código de barras</label>
                <div class="input-group">
                    <input type="text" class="form-control" name="codigo_barras" id="codigo_barras" value="${codigo_barras}" placeholder="Ex: 7891234567890">
                    <span class="input-group-text"><i class="fas fa-barcode"></i></span>
                </div>
            `;
        }

        conteudo = conteudo + `
        </div>

                <div class="mb-3">
            `;

        if (!descricao) {
            conteudo = conteudo + `
            <label class="form-label">Descrição do produto</label>
                <div class="input-group">
                    <input type="text" class="form-control" name="descricao" id="descricao" value="${descricao}" placeholder="Ex: Sabonete Líquido 500ml">
                    <span class="input-group-text"><i class="fas fa-box"></i></span>
                </div>
            <span class="text-danger">Campo obrigatório</span>
            `;
        }
        else {
            conteudo = conteudo + `
            <label class="form-label">Descrição do produto</label>
                <div class="input-group">
                    <input type="text" class="form-control" name="descricao" id="descricao" value="${descricao}" placeholder="Ex: Sabonete Líquido 500ml">
                    <span class="input-group-text"><i class="fas fa-box"></i></span>
                </div>
            `;
        }

        conteudo = conteudo + `
        </div>

                <div class="mb-3">
            `;

        if (!preco_custo) {
            conteudo = conteudo + `
            <label class="form-label">Preço de custo</label>
                <div class="input-group">
                    <input type="number" step="0.01" class="form-control" name="preco_custo" id="preco_custo" value="${preco_custo}" placeholder="Ex: 5.99">
                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                </div>
            <span class="text-danger">Campo obrigatório</span>
            `;
        }
        else {
            conteudo = conteudo + `
            <label class="form-label">Preço de custo</label>
                <div class="input-group">
                    <input type="number" step="0.01" class="form-control" name="preco_custo" id="preco_custo" value="${preco_custo}" placeholder="Ex: 5.99">
                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                </div>
            `;
        }

        conteudo = conteudo + `
        </div>

                <div class="mb-3">
            `;

        if (!preco_venda) {
            conteudo = conteudo + `
            <label class="form-label">Preço de venda</label>
                <div class="input-group">
                    <input type="number" step="0.01" class="form-control" name="preco_venda" id="preco_venda" value="${preco_venda}" placeholder="Ex: 9.99">
                    <span class="input-group-text"><i class="fas fa-tag"></i></span>
                </div>
            <span class="text-danger">Campo obrigatório</span>
            `;
        }
        else {
            conteudo = conteudo + `
            <label class="form-label">Preço de venda</label>
                <div class="input-group">
                    <input type="number" step="0.01" class="form-control" name="preco_venda" id="preco_venda" value="${preco_venda}" placeholder="Ex: 9.99">
                    <span class="input-group-text"><i class="fas fa-tag"></i></span>
                </div>
            `;
        }

        conteudo = conteudo + `
        </div>

                <div class="mb-3">
            `;

        if (!validade) {
            conteudo = conteudo + `
            <label class="form-label">Data de validade</label>
                <div class="input-group">
                    <input type="date" class="form-control" name="validade" id="validade" value="${validade}">
                    <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
                </div>
            <span class="text-danger">Campo obrigatório</span>
            `;
        }
        else {
            conteudo = conteudo + `
            <label class="form-label">Data de validade</label>
                <div class="input-group">
                    <input type="date" class="form-control" name="validade" id="validade" value="${validade}">
                    <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
                </div>
            `;
        }

        conteudo = conteudo + `
        </div>

                <div class="mb-3">
            `;

        if (!estoque) {
            conteudo = conteudo + `
            <label class="form-label">Quantidade em estoque</label>
                <div class="input-group">
                    <input type="number" class="form-control" name="estoque" id="estoque" value="${estoque}" placeholder="Ex: 150">
                    <span class="input-group-text"><i class="fas fa-cubes"></i></span>
                </div>
            <span class="text-danger">Campo obrigatório</span>
            `;
        }
        else {
            conteudo = conteudo + `
            <label class="form-label">Quantidade em estoque</label>
                <div class="input-group">
                    <input type="number" class="form-control" name="estoque" id="estoque" value="${estoque}" placeholder="Ex: 150">
                    <span class="input-group-text"><i class="fas fa-cubes"></i></span>
                </div>
            `;
        }

        conteudo = conteudo + `
        </div>

                <div class="mb-4">
            `;

        if (!fabricante) {
            conteudo = conteudo + `
            <label class="form-label">Nome do fabricante</label>
                <div class="input-group">
                    <input type="text" class="form-control" name="fabricante" id="fabricante" value="${fabricante}" placeholder="Ex: Natura, Dove...">
                    <span class="input-group-text"><i class="fas fa-industry"></i></span>
                </div>
            <span class="text-danger">Campo obrigatório</span>
            `;
        }
        else {
            conteudo = conteudo + `
            <label class="form-label">Nome do fabricante</label>
                <div class="input-group">
                    <input type="text" class="form-control" name="fabricante" id="fabricante" value="${fabricante}" placeholder="Ex: Natura, Dove...">
                    <span class="input-group-text"><i class="fas fa-industry"></i></span>
                </div>
            `;
        }

        conteudo = conteudo + `
        </div>
                        <button type="submit" class="btn btn-login text-white">Cadastrar produto</button>
                    </form>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
        resposta.send(conteudo);
        resposta.redirect('/produtos');
    }
});

//PÁGINA DE PRODUTOS
app.get('/produtos', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "public", "produtos.html"));
});

app.get("/api/produtos", (requisicao, resposta) => {
    resposta.json(listaProdutos);
});

//NÃO DEIXANDO O USUÁRIO CADASTRAR PRODUTOS DESLOGADO
app.get("/cadastro", (requisicao, resposta) => {
    if (requisicao.session.user) {
        resposta.sendFile(path.join(__dirname, "public", "cadastro.html"));
    } else {
        resposta.send("Você precisa estar logado para acessar o cadastro de produtos. <a href='/login'>Faça login</a>");
    }
});

app.post("/login", (requisicao, resposta) => {
    const { email } = requisicao.body;
    if (email) {
        requisicao.session.user = email;
        console.log('Usuário logado:', requisicao.session.user);
        resposta.redirect("/cadastro");
    } else {
        resposta.redirect("/login");
    }
});
