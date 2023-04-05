const express = require('express');
const cors = require('cors');
const helmet = require("helmet");

/* Declaraciones iniciales */
const app = express();
/* Asignando el puerto */
const port = process.env.PORT || 3000;

/* Configuraciones de mi servidor express */
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(helmet());

const corsOptions = {
    origin: process.env.DOMINIO_WEB,
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

/* Manejador de errores global */
app.use((err, req, res, next) => {
    // Manejo de errores
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

/* Enrutamiento */
app.use("/", require("./src/routes"));

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});