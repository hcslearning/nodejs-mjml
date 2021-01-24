const mjml2html = require('mjml');

const http = require('http');
const server = new http.Server();


server.on( 'request', (req, res) => {
    const mjmlCode = `
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text>
                Hello World!
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;
    const mjmlCode2 = require('fs').readFileSync("template-ejemplo.mjml", "utf-8");

    const options = {};
    const htmlObj = mjml2html(mjmlCode2, options);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write( htmlObj.html );
    res.end();
});

server.listen(5000);
console.log("Servidor escuchando en puerto 5000");
