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
      
      fetch("https://script.google.com/macros/s/AKfycbzOCkNXEVlmxzQ0ZniXeKQYzsHYAiisN5xG63AtagAFo3jA0JdVcK_kCSSnrTguVs9E/exec", {
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

function iniciarServidor(client){

app.get('/send-message/:phonenumber/:text', async function (req, res) {
    console.log(req.params);

        await client.sendText(req.params.phonenumber+'@c.us', req.params.text)
        .then((result) => {
            res.json(result);
            res.close()
          })
          .catch((erro) => {
            res.json(erro);
            res.close()
          });
   
    
    })
    app.listen(puerto,()=>{
    console.log("escuchando en el puerto" + puerto)
    return true
    })

}
