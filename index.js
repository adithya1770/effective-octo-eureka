const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();
require('./auth');

app.use(cors({origin: '*'}));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/oauth', passport.authenticate('google', {scope: ['email', 'profile']}))

app.get('/rules', (req, res) => {
    res.send('no rules - contact adithyaps929@gmail.com for rules');
})

app.post('/compiler', async (req, res) => {
    const payloadBody = req.body;
    try {
        const response = await fetch("https://api.jdoodle.com/v1/execute", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payloadBody),
        });
        const responseNew = await response.json();
        res.status(200).json(responseNew);
    } catch (error) {
        console.error("Error during API call:", error);
        res.status(500).json({ error: "Something went wrong with the JDoodle API" });
    }
});

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