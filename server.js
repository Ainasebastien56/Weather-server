const express = require("express");
const cors = require("cors");
const axios = require("axios")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const newsAPIKey = process.env.NEWS_API_KEY;
const weatherAPIKey = process.env.WEATHER_API_KEY;
const mapAPIKey = process.env.MAP_API_KEY;

app.use(cors());

//get Weather news
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

//get Weather
 app.get('/weather', async(req,res)=>{

        const city = req.query.city;
        const days = req.query.days

        if(!city){
            return res.status(400).json({error:'City is required'})
        }

        try{
            const response = await axios.get("https://api.weatherapi.com/v1/forecast.json",{
                params:{
                    key : weatherAPIKey,
                    q:city,
                    days:days
                }
            });            
            res.json(response.data);
        }catch (error) {
            console.error("Erreur lors de l'appel à l'API News:", error.response ? error.response.data : error.message);
            res.status(500).json({message:'Erreur lors des récupération des données News!'});
        }
        });

//get Weather Map
app.get('/weather_map', async(req,res)=>{
    
        const lat = req.query.lat;
        const lon = req.query.lon;

         try{
                const response = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
                    params:{
                        lat:lat,
                        lon : lon,
                        units:'metric',
                        appid:mapAPIKey

                    }
                });
                res.json(response.data);
            }catch (error) {
                console.error("Erreur lors de l'appel à l'API News:", error.response ? error.response.data : error.message);
                res.status(500).json({message:'Erreur lors des récupération des données News!'});
            }
            });

app.listen(port, ()=>{
    console.log(`Serveur proxy en cours d'execution sur le port ${port}`);
})