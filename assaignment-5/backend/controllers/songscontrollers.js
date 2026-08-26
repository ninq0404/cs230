const db = require("../db");

exports.getAll = (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if(err){ return res.status(500).json({error: err.message}); }
        res.json(rows); 
    });
};

exports.getOne = (req, res) => {
    const id = req.params.id; 
    db.get("SELECT * FROM songs WHERE songID =?", [id], (err, row) => {
        if(err){return res.status(500).json({error: err.message}); }
        res.json(row); 
    });
};

exports.create = (req, res) => {
    const {songName, songYear, albumID} = req.body; 
    db.run("INSERT INTO songs (songName, songYear, albumID) VALUES (?, ?, ?)", [songName, songYear, albumID], 
        function(err){
            if(err){ return res.status(500).json({error: err.message}); }
            res.json({ message: "created", songID: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const id = req.params.id;
    const {songName, songYear, albumID} = req.body; 
    db.run(`UPDATE songs SET songName =?, songYear =?, albumID =? WHERE songtID =?`, [songName, songYear, albumID, id], 
        function (err){
            if(err){ return res.status(500).json({error: err.message}); }
            res.json({message: "song updated"});  
        }
    );
};

exports.delete = (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM songs WHERE songID = ?", [id],
        function (err) {
            if(err) {return res.status(500).json({error: err.message}); }
            res.json({message: "deleted"}); 
        }
    );
};