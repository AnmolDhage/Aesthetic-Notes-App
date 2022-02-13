const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cruddatabase'
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());

app.get('/api/display', (req, res) => {
  const sqlSelect = "SELECT * FROM  movie_reviews";
  db.query(sqlSelect, (err, result) => {
    if (!err) {
      res.send(result)
    } else {
      console.log(err);
    }
  })
})


app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (!err) {
      console.log(result);
    } else {
      console.log(`error caught ${err}`)
    }
  })
});


app.delete('/api/delete/:movieId', (req, res) => {
  const id = req.params.movieId;
  const sqlDelete = "DELETE FROM movie_reviews WHERE id=?";
  db.query(sqlDelete, id, (err, result) => {
    if (!err) {
      console.log(result);
    } else {
      console.log(`error caught ${err}`)
    }
  })
})


app.put('/api/update', (req, res) => {
  const id = req.body.mId;
  const value = req.body.mValue;
  const sqlUpdate = "UPDATE movie_reviews SET movieReview=? WHERE id=?";
  db.query(sqlUpdate, [value, id], (err, result) => {
    if (!err) {
      console.log(result);
    } else {
      console.log(`error caught ${err}`)
    }
  })
})

app.listen(3001, () => {
  console.log("running on port 3001")
})

