const express = require("express");
const cors = require("cors");
require("./db");

const app = express(); 
app.use(express.json());
app.use(cors());

const artistRoutes = require("./routes/artists");
app.use("/artists", artistRoutes);

const albumRoutes = require("./routes/albums");
app.use("/albums", albumRoutes);

const songRoutes = require("./routes/songs");
app.use("/songs", songRoutes);

app.get("/", (req, res) => {
    res.send("server is running"); 
})
app.listen((5000), () => {
    console.log("listening on port 5000");
});

// curl -H "Content-Type:application/json" -d "{\"name\": \"The Hoosiers\", \"genre\": \"indie-pop\", \"monthlyListeners\": 600000}" -X POST http://localhost:5000/artists