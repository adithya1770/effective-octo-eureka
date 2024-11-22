const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get('/nutrition', async (req, res) => {
    try{
        const reqQuery = req.query.query;
        const nutritionResponse = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${reqQuery}`, {
            headers: {'X-Api-Key': 'bZreDU5pa9FcE1i0OwhrRQ==lD7y1i6rrKeXApfK'}
        });
        if(nutritionResponse){
            const nutritionResponseNew = await nutritionResponse.json();
            console.log(nutritionResponseNew);
            res.status(200).json(nutritionResponseNew);
        }
    }
    catch{
        res.status(400).json({"message": "Couldn't fetch"});
    }
})

app.listen(5000, () => {
    console.log("Server is on");
})