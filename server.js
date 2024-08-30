const express = require("express");
const cors = require("cors");
const axios = require("axios")

const app = express();
const port = process.nextTick.PORT || 3000;
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
        res,json(response.data);
    }catch(error){
        res.status(500).json({message:'Erreur lors des récuperation des données News!'});
    }
});

app.listen(port, ()=>{
    console.log(`Serveur proxy en cours d'execution sur le port ${port}`);
})