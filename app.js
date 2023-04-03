const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Declaraciones iniciales */
const app = express();
/* Asignando el puerto */
const port = process.env.PORT || 3000;

/* Configuraciones de mi servidor express */
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(__dirname + '/public'));
app.use(cors());

/* Enrutamiento */
app.use("/", require("./src/routes"));

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});