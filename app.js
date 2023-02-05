/*Dependencias de venom-bot
(para poderlas instalar en linux -distribucion Debian):

sudo apt-get install libxkbcommon-x11-0
sudo apt-get install libgtk-3-0
sudo apt-get install libgbm1

*/


const venom = require('venom-bot');
const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch');
const app = express()
const puerto= process.env.PORT || 8080;
app.use(cors())


/* Venomn  */

venom
  .create(
	//session
    'sessionName', //Pass the name of the client you want to start the bot
    //catchQR
    (base64Qrimg, asciiQR, attempts, urlCode) => {
      
      fetch("https://script.google.com/macros/s/AKfycbxFV8xXd4KZXvlckWPA8Xwec7DpCmF_551J_yzXABm19c7XMGRxan80RKAcAH1R5SQk/exec", {
		"method":"POST",
"headers": {
      "Content-Type": "application/json"
   
    },
		"body":JSON.stringify({"qr":base64Qrimg})
	}).then((res)=>{console.log("resultado de qr: " + res)})
	.catch((err)=>{console.log("ocurrio un error: " + err)})
	
      
    }
)
  .then(async (client) => {
  
    /* express server */
    await iniciarServidor(client)
    })
  .catch((erro) => {
    console.log(erro);
  });

app.use('/send-message/',express.json())
function iniciarServidor(client){

app.post('/send-message/', async function (req, res) {
    //console.log(req.body);

        await client.sendText(req.body.phoneNumber+'@c.us', req.body.text)
        .then((result) => {
            res.json(result);
            res.end()
          })
          .catch((erro) => {
            res.json(erro);
            res.end()
          });
   
    
    })
// para mantener viva la consola:
	app.use('/jaja/',express.json())
	app.post('/jaja/', async function (req, res) {
    console.log(req.body);
    res.json({res:"ok"});
    res.end();  
    
    })
	
    app.listen(puerto,()=>{
    console.log("escuchando en el puerto" + puerto)
    return true
    })

}
