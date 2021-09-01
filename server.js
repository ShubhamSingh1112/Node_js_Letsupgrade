const express = require('express');
const mongoose = require('mongoose');

// applying middleware to convert unreadable data to js object
app.use(express.json());

// type of request

// url

mongoose.connect("mongodb://localhost:27017/pokeapi", {useNewUrlParser:true}, () => {
    console.log("mongo server connected");
})

//create a schema and model for the pokemon collection

const pokemonSchema = new mongoose.Schema({
    name:String,
    type:String,
    imageUrl:String
})

//models for pokemons collection that will be used for all all the operations

const pokemonModel = new mongoose.model('pokemons', pokemonSchema);

// to get all pokemons

app.get("/pokemons", async (req, res) => {
    let pokemons = await pokemonModel.find();
    res.send(pokemons);
})

// to fetch a single pokemon based on id

app.get("/pokemon/:id", async (req, res) => {
    let id=req.params.id;
    let pokemon =await pokemonModel.find({_id:id});
    res.send(pokemon);
})

// to fetch a single pokemon based on type

app.get("/pokemons/type/:type", async (req, res) => {
    let type=req.params.type;
    let pokemon = await pokemonModel.find({type:type});
    res.send(pokemon);
})

// to create a new pokemons instance

app.post("/pokemons", (req, res) => {

    let pokemon=req.body;

    let pokemonObj=new pokemonModel(pokemons, pokemon);
    pokemonObj.save((res,data)=>{
        if(err==null){
            res.send({message: "Pokemon Created"});
        }
    });
})

// endpoint to delete a pokemon

app.delete("/pokemon/:id",(req, res) => {
    
    let id=req.params.id;

    pokemonModel.deleteOne({_id:id},(err,data)=>{
        if(err===null){
            res.send({message: "Pokemon deleted"});
        }
    })
})

// to update a pokemon 

app.put("/pokemon/:id",(req,res)=>{

    let id=req.params.id;
    let pokemon=req.body.pokemon;

    pokemonModel.updateOne({_id:id},pokemon,(err,data)=>{

        if(err===null){
            res.send("Pokemon Updated")
        }
    })
    findByIdUpdate(id,pokemon)
})