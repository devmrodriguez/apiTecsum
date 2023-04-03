require('dotenv').config(); 
const router = require('express').Router();
const correoNotificacion = require('../funciones/notificacionCorreo');

/* Funciones */

/* Ruta raíz */
router.route('/').get(function (req, resp) {
    resp.send('API is running');
});

/* Ruta para el envío de correos */
router.route("/contacto")
    .post(function (req, res) {
        try{
            let nombre = req.body.nombre;
            let email = req.body.email;
            let telefono = req.body.telefono;
            let empresa = req.body.empresa;
            let mensaje = req.body.mensaje;
        
            /* Enviando correo a administrador */
            correoNotificacion(0, nombre, email, mensaje, telefono, empresa); 
            /* Enviando correo a cliente */
            correoNotificacion(1, nombre, email, mensaje, telefono, empresa); 
            res.status(200).send("Correo enviado correctamente");
        }catch(error){
            console.log(error);
            res.status(500).send("Error al enviar el correo");
        }
    });


module.exports = router;