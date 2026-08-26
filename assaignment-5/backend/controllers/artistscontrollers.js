const db = require("../db");

exports.getAll = (req, res) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
        if(err){ return res.status(500).json({error: err.message}); }
        res.json(rows); 
    });
};

exports.getOne = (req, res) => {
    const id = req.params.id; 
    db.get("SELECT * FROM artists WHERE artistID =?", [id], (err, row) => {
        if(err){return res.status(500).json({error: err.message}); }
        res.json(row); 
    });
};

exports.create = (req, res) => {
    const {name, genre, monthlyListeners} = req.body; 
    db.run("INSERT INTO artists (name, genre, monthlyListeners) VALUES (?, ?, ?)", [name, genre, monthlyListeners], 
        function(err){
            if(err){ return res.status(500).json({error: err.message}); }
            res.json({ message: "created", artistID: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const id = req.params.id;
    const {name, genre, monthlyListeners} = req.body; 
    db.run(`UPDATE artists SET name =?, genre =?, monthlyListeners =? WHERE artistID =?`, [name, genre, monthlyListeners, id], 
        function (err){
            if(err){ return res.status(500).json({error: err.message}); }
            res.json({message: "Artist updated"});  
        }
    );
};

exports.delete = (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM artists WHERE artistID = ?", [id],
        function (err) {
            if(err) {return res.status(500).json({error: err.message}); }
            res.json({message: "deleted"}); 
        }
    );
};