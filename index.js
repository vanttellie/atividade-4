import express from "express";
const host = "0.0.0.0";
const port = 3001;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});