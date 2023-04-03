require('dotenv').config();
const nodemailer = require('nodemailer');

/* Configurar el correo electrónico */
const transporter = nodemailer.createTransport({
    host: process.env.HOST_CORREO,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
});

module.exports = function (cualNotificacion, nombre, email, mensaje, telefono, empresa) {
    /*     0. Notificación de formulario de contacto - administrador.
        1. Notificación de formulario de contacto - cliente. */

    /* Mensaje dependiendo de la notificacion */
    let notificaciones = [
        {
            subject: `Nuevo mensaje de ${nombre}`,
            titulo: "Nuevo formulario de contacto recibido",
            contenido: `Nombre del remitente: ${nombre}.<br>Empresa: ${empresa}.<br>Correo electrónico del remitente: ${email}.<br>Número de teléfono del remitente: ${telefono}.<br>Mensaje: ${mensaje}.`
        },
        {
            subject: `Hemos recibido tu mensaje ${nombre}`,
            titulo: "Pronto nos pondremos en contacto contigo",
            contenido: "Hola " + nombre + ". Hemos recibido tu mensaje y en breve nuestro equipo de soporte se pondrá en contacto contigo."
        }
    ];

    /* Plantilla de correo */
    let mensajeHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <style>
            body {
                margin: 0;
            }
    
            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
            h1{ font-size: 30px !important;}
            h2{ font-size: 25px !important;}
            h3{ font-size: 18px !important;}
            h4{ font-size: 16px !important;}
            p, a{font-size: 15px !important;}
    
            .claseBoton{
                width: 30%;
                    background-color: #79ae92;
                    color: #fff; 
                    border-radius: 5px;
                    padding: 10px 30px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    margin: auto;
                    transition-duration: 0.4s;
                    cursor: pointer;
            }
            .claseBoton:hover{
                background-color: #1c5560;
            }
            .imag{
                width: 20px;
                height: 20px;
            }
            .contA{
                margin: 0px 5px 0 5px;
            }
        </style>
    </head>
    <body>
        <div style="background-color: #f5f5f5;">
            <div style="padding: 20px 10px 20px 10px;">
                <!-- Imagen inicial -->
                <div style="background-color: #101010; padding: 20px 0px; width: 100%; text-align: center;">
                </div>
                <!-- Imagen inicial -->
    
                <!-- Contenido -->
                <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                    <h1>${notificaciones[cualNotificacion].titulo}</h1>
                    <p>${notificaciones[cualNotificacion].contenido}</p>
    
                    <p>Gracias por tu tiempo.</p>
                    <div style="margin: auto;">
                        <img src="cid:logo" alt="Logo" style="width: 50px; height: 50px;">
                    </div>
                    <p style="margin-bottom: 35px;"><i>Atentamente:</i><br><strong>Tecnología y Suministros S.A. de C.V.</strong></p>
    
                    <a class="claseBoton" href="https://pruebatecsum.netlify.app/">Tecnología y Suministros</a>
                </div>
                <!-- Contenido principal -->
    
                <!-- Footer -->
                <div>
                    <p style="background-color: #101010; padding: 20px 0px; font-size: 12px !important; text-align: center; color: #fff;">
                        <strong>Tecnología y Suministros © 2023. Todos los derechos reservados.</strong>
                    </p>
                </div>
                <!-- Footer -->
            </div>
        </div>
    </body>
    </html>`;

    /* Notificar o enviar correo */
    transporter.verify().then(console.log).catch(console.error);
    const emailVentas = process.env.EMAIL_VENTAS;
    const emailAdmin = process.env.EMAIL_ADMIN;
    if (cualNotificacion === 0) {
        transporter.sendMail({
            from: `Tecnología y Suministros ${emailVentas}`,
            to: emailVentas,
            cc: emailAdmin,
            subject: notificaciones[cualNotificacion].subject,
            text: notificaciones[cualNotificacion].notificacion,
            html: mensajeHtml,
            attachments: [
                {
                    filename: 'logo.png',
                    path: 'public/images/logo.png',
                    cid: 'logo'
                },
            ],
        }).then(info => {
            console.log({ info });
        }).catch(console.error);
    } else {
        transporter.sendMail({
            from: `Tecnología y Suministros ${emailVentas}`,
            to: email,
            subject: notificaciones[cualNotificacion].subject,
            text: notificaciones[cualNotificacion].notificacion,
            html: mensajeHtml,
            attachments: [
                {
                    filename: 'logo.png',
                    path: 'public/images/logo.png',
                    cid: 'logo'
                },
            ],
        }).then(info => {
            console.log({ info });
        }).catch(console.error);
    }
}
