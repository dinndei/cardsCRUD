import express from "express";
import cors from "cors";
import axios from "axios";

let cards = [
    { id: 1, text: "card a", color: "orange" },
    { id: 2, text: "card b", color: "yellow" },
    { id: 3, text: "card c", color: "green" },
    { id: 4, text: "card d", color: "pink" }
]
let cardCounter = 4;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("cards before send",cards);
    res.send(cards);
});
app.get("/:id", (req, res) => {
    let id = req.params.id;
    let card = cards.find(item => item.id == id);
    if (!card)
        res.status(404).send("card not found");
    res.send(card);
});
app.delete("/:id", (req, res) => {
    let initialLength=cards.length;
    let id = req.params.id;
    cards=cards.filter(Boolean);//null לסנן
    cards = cards.filter(item => item.id != id);
    if (cards.length < initialLength) {
        console.log(cards);
        res.send(`card ${id} deleted`);
    } else {
        res.status(404).send(`card with ID ${id} not found`);
    }
});
app.put("/:id", (req, res) => {
    let id = req.params.id;
    let card = req.body;
    let index = cards.findIndex(item => item.id == id);
    console.log("id",id);
    console.log("card",card);
    console.log("index",index);
    if (index !== -1){
        cards[index] = card;
        res.send(`card ${id} updated`);
    }
    else
    res.status(400).send("could not update");
});
app.post("/", (req, res) => {
    console.log("req",req);

    let card = req.body;
    console.log("card",card);
    let newcard = {
        id: ++cardCounter,
        ...card
    }
    cards.push(newcard);
    res.send(`card ${newcard.id} added`);
});

let port = 5000;

app.listen(port, ()=>{console.log(`app is listening on port ${port}`)})