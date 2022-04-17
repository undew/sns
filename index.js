const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = process.env.PORT || 3001
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'sns'
});

app.use(session({
  secret: "testing",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// authentication
passport.serializeUser(function(username, done) {
  console.log('serializeUser');
  done(null, username);
});

passport.deserializeUser(function(username, done) {
  console.log('deserializeUser');
  done(null, {name:username});
});




// ----------------------------------------------------

app.post('/signin',(req,res)=>{
  let email = req.body.email;
  let pass = req.body.pass;
  let sql = "SELECT * FROM users WHERE email = ? AND pass = ?";
  connection.query(sql,[email,Number(pass)],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("接続終了(正常)");
      res.json({results: results});
    }
  );
})



app.get("/api", (req, res) => {
  connection.query(
    "SELECT id,name,content,DATE_FORMAT(created_at,'%Y-%m-%d %H:%i:%s') as 'created_at' FROM posting;",
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("接続終了(正常)");
      res.json({results: results});
    }
  );
});



app.post('/insert',(req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let content = req.body.content;
    connection.query(
        'INSERT INTO posting(id,name,content) VALUES(?,?,?);',[id,name,content],
        function(err,results,fields){
            connection.query(
              'SELECT * FROM posting',
              function(err,results,field){
                res.json({results:results})
              }
            )
        }
    )
})




app.listen(port, () => {
  console.log(`listening on *:${port}`);
})