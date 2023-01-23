const venom = require('venom-bot');
const express = require('express')
const cors = require('cors')
const app = express()
const puerto= process.env.PORT || 3000;
app.use(cors())


/* Venomn  */

venom
  .create()
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