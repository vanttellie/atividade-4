import express from "express";
const host = "0.0.0.0";
const port = 3001;
var listaUsuarios = [];
const app = express();

import path from "path";
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

app.use(express.static('public', { setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
}}));

//PÁGINA DE LOGIN
app.get('/login', (requisicao, resposta) => {
  resposta.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (requisicao, resposta) => {
    const email = requisicao.body.email;
    const password = requisicao.body.password;
    
    if (email && password)
    {
        listaUsuarios.push({
            email: email,
            password: password
        });
        resposta.redirect("/");
    }
    else
    {
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

                            if(!email)
                            {
                                conteudo = conteudo + `
                                <label class="form-label">E-mail</label>
                                <div class="input-group">
                                    <input type="email" class="form-control" placeholder="nome@email.com" id="email" name="email">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                </div>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
                            }

                            else
                            {
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
                            if(!password)
                            {
                                conteudo = conteudo + `
                                <label class="form-label">Senha</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" placeholder="Digite sua senha..." id="password" name="password">
                                    <span class="input-group-text password-toggle"><i class="fas fa-eye"></i></span>
                                </div>
                                <span class="text-danger">Campo obrigatório</span>
                                `;
                            }

                            else
                            {
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