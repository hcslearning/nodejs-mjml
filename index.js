// para cargar variables de .env file
require('dotenv').config();

// engine para plantillas de emails
const mjml2html = require('mjml');

// para el server
const http = require('http');
const url = require('url');
const server = new http.Server();

function enviarMail(destinatario, subject, plainMail, htmlMail) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey( process.env.API_KEY_SENDGRID );
    const msg = {
        to: destinatario,
        from: process.env.MAIL_FROM,
        subject: subject,
        text: plainMail,
        html: htmlMail
    };
    sgMail.send( msg ).then( () => console.log("Mail enviado") ).catch( (err) => {console.log("Error al enviar el correo: ");console.dir(err)} );
}


server.on( 'request', (req, res) => {
	// carga contenido de archivo con plantilla en lenguaje MJML
    const mjmlCode = require('fs').readFileSync("template-ejemplo.mjml", "utf-8");
    const options = {};
    // convierte MJML a HTML apto para enviar correo HTML
    const htmlObj = mjml2html(mjmlCode, options);

    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write( "API KEY: "+process.env.API_KEY_SENDGRID+"<br /><br />" );
    
    // procesa query parameters from URL
    const query = url.parse( req.url, true).query;
    const destinatario = query.to;
    
	// enviar correo
	console.dir( {destinatario, subject: "Correo de prueba", plain: "texto plano de prueba"} );
	enviarMail( destinatario, "Correo de prueba", "texto plano de prueba", htmlObj.html);
    
    res.write( htmlObj.html );
    res.end();
});

// corre el servidor en el puerto especificado
const port = 5500
server.listen( port );
console.log("Servidor escuchando en puerto "+port);
