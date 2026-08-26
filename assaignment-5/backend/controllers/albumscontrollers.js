const db = require("../db");

exports.getAll = (req, res) => {
    db.all("SELECT * FROM albums", [], (err, rows) => {
        if(err){ return res.status(500).json({error: err.message}); }
        res.json(rows); 
    });
};

exports.getOne = (req, res) => {
    const id = req.params.id; 
    db.get("SELECT * FROM albums WHERE albumID =?", [id], (err, row) => {
        if(err){return res.status(500).json({error: err.message}); }
        res.json(row); 
    });
};

exports.create = (req, res) => {
    const {albumName, albumYear, numListens, artistID} = req.body; 
    db.run("INSERT INTO albums (albumName, albumYear, numListens, artistID) VALUES (?, ?, ?, ?)", [albumName, albumYear, numListens, artistID], 
        function(err){
            if(err){ return res.status(500).json({error: err.message}); }
            res.json({ message: "created", artistID: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const id = req.params.id;
    const {albumName, albumYear, numListens, artistID} = req.body; 
    db.run(`UPDATE albums SET albumName =?, albumYear =?, numListens =?, artistID =? WHERE albumID =?`, [albumName, albumYear, numListens, artistID, id], 
        function (err){
            if(err){ return res.status(500).json({error: err.message}); }
            res.json({message: "album updated"});  
        }
    );
};

exports.delete = (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM albums WHERE albumID = ?", [id],
        function (err) {
            if(err) {return res.status(500).json({error: err.message}); }
            res.json({message: "deleted"}); 
        }
    );
};