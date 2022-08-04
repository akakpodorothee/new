const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "stats_joueurs",
}); 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM joueurs";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
}); 
 app.post("/api/post", (req, res) => {
     const {wines, losses, pointe_scored} = req.body;
     const sqlInsert = "INSERT INTO joueurs (?, ?, ?)";
     db.query(sqlInsert, [wines, losses, pointe_scored], (error, result) => {
        if(error) {
            console.log(error);
        }
     });
 });

app.get("/", (req, res) => {
    // const sqlInsert = 
    // "INSERT INTO joueurs (wines, losses, pointe_scored) VALUES (10, 20, 60)";
    //    db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    //    });
    
});
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})