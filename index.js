// para cargar variables de .env file
require('dotenv').config();

// engine para plantillas de emails
const mjml2html = require('mjml');

// para el server
const http = require('http');
const server = new http.Server();


server.on( 'request', (req, res) => {
	// carga contenido de archivo con plantilla en lenguaje MJML
    const mjmlCode = require('fs').readFileSync("template-ejemplo.mjml", "utf-8");
    const options = {};
    // convierte MJML a HTML apto para enviar correo HTML
    const htmlObj = mjml2html(mjmlCode, options);

    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write( "API KEY: "+process.env.API_KEY_SENDGRID+"<br /><br />" );
    res.write( htmlObj.html );
    res.end();
});

// corre el servidor en el puerto especificado
const port = 5500
server.listen( port );
console.log("Servidor escuchando en puerto "+port);
