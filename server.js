const express = require("express");
const cors = require("cors");
const axios = require("axios")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const newsAPIKey = process.env.NEWS_API_KEY;

app.use(cors());

app.get('/news', async(req,res)=>{
    try{
        const response = await axios.get("https://newsapi.org/v2/everything",{
            params:{
                q:'weather OR climate OR storm OR rain OR temperature',
                pageSize : 10,
                apikey : newsAPIKey
            }
        });
        res.json(response.data);
    }catch (error) {
        console.error("Erreur lors de l'appel à l'API News:", error.response ? error.response.data : error.message);
        res.status(500).json({message:'Erreur lors des récupération des données News!'});
    }
    });
console.log(newsAPIKey)
app.listen(port, ()=>{
    console.log(newsAPIKey)
    console.log(`Serveur proxy en cours d'execution sur le port ${port}`);
})