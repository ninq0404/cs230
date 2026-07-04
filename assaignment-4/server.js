const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const express = require('express');
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
 res.send("Server is running");
});

app.listen(3000, () => {
 console.log("Listening on port 3000");
});


// CREATE TABLE
const sql = `
CREATE TABLE IF NOT EXISTS books
 (
  id integer primary key autoincrement,
  title text not null,
  author text not null,
  year integer not null,
  status text not null
  check (status in ('to-read', 'reading', 'completed'))
);  `;

db.run(sql, (err) => {
  if(err){console.error(err.message)
  }else{
  console.log("Table ready"); }
});

module.exports = db

// const initialiseSql = `insert into books (title, author, year, status ) values
//     ('Percy Jackson & the Olympians', 'Rick Riordan', 2005, 'completed'), 
//     ('Gone with the Wind', 'Margaret Mitchell', 1936, 'to-read'), 
//     ('The Book of Dust', 'Philip Pullman', 2017, 'reading')
// `;

// db.run(initialiseSql, (err) => {
//   if(err){console.error(err.message)
//   }else{
//   console.log("Initial users inserted"); }
// }); 

db.all("SELECT * FROM books", (err, rows) => {
  if (err) { console.error(err.message)
  }console.log("All users:", rows);
});

//get
//return all the books
app.get('/books', (req, res) => {

  db.all("select * from books", (err, rows) => {
    if(err){ res.status(500).send(err.message)
  }else {
  res.status(200).json(rows) }
   });
});

//get books id 
app.get('/books/:id', (req, res) => {
  const {id} = req.params; 
  db.all("select * from books where id = ?", [req.params.id], (err, rows) => {
    if(err){ res.status(404).send(err.message)
    }else if (rows.length ==0){
    return res.status(404).json({message: "book not found"}); }

    res.status(200).json(rows) 
  });
});

//book id
//where staus == reading
app.get('/books/:status', (req, res) => {
  db.all("select * from books where status = ? ", [req.params.status], (err, rows) => {
    if(err){ res.status(404).send(err.message)
    }else if (rows.length ==0){
    return res.status(404).json({message: "No Books With This Status"}); }

    res.status(200).json(rows) 
  });

});

//post
//validate everything is included, make sure the statuses are the correct values
//we checked that the status code is valid in our table creation
//parameterized query with the values(?)
//print status code and id of new book
app.post('/books', (req, res) => {
  const {title, author, year, status} = req.body;
  //const sql = `insert into books (title, author, year, status) values(?, ?, ?, ?)`;

  if(!title || !author || !year || !status) {return res.status(404).json({message: "Missing Paramater"}); }

  db.run("insert into books (title, author, year, status) values(?, ?, ?, ?)", [title, author, year, status], function(err){
    if(err){ return res.status(500).send(err);
    }else if(this.changes ===0){ 
      return res.status(404).json({message: "No Books Added"}); 
    } res.status(201).json({id: this.lastID, title});
  });
});
// curl -H "Content-Type:application/json" -d "{\"title\": \"Harry Potter\", \"author\": \"JK Rowling\", \"year\": 1997, \"status\": \"to-read\"}" -X POST http://localhost:3000/books 


//put
//update only the name, email, id
//we checked that the status code is valid in our table creation
//use where to decide what to update
//if no changes (book doesn't exist) return 404
app.put('/books/:id', (req, res) => {
  const {id} = req.params;
  const {title, year, status} = req.body || {};
  const sql = `update books set title = ?, year = ?, status = ? where id = ?`;

  db.run(sql, [title, year, status, id], function(err){
    if(err){ return res.status(500).send(err);
    } else if(this.changes ===0){return res.status(404).json({message: "No Books Updated"}); }
    res.status(201).json({id, title, year, status});
  });
});
// curl -X PUT http://localhost:3000/books/23 -H "Content-Type: application/json" -d "{\"title\": \"Gone With The Wind\", \"year\": 1936, \"status\": \"completed\"}"

// delete
// use where with id to pick book to delete
// statement if delete successful
app.delete('/books/:id', (req, res) => {
  const sql = "delete from books where id = ?";

  db.run(sql, [req.params.id], function(err){
    if(err){return res.status(500).json(err);
    } else if(this.changes === 0){ return res.status(404).json({message: "Nothing Deleted"}); }
    res.status(201).json({message: "Delete Successfull"});
  });
});
//curl -X DELETE http://localhost:3000/books/23

	