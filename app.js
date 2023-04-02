const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Declaraciones iniciales */
const app = express();

/* Configuraciones de mi servidor express */
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(__dirname + '/public'));
app.use(cors());

/* Enrutamiento */
app.use("/", require("./routes"));


/* Puerto de heroku */
let port = process.env.PORT;
/* si no se ha configurado el puerto o el puerto es una cadena vacía */
if (port == null || port == "") {
  // entonces usaremos el puerto 3000
  port = 3000;
}
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});