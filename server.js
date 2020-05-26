const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');
const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-adjacent-01296',
    user : 'postgres',
    password : 'postgre@123',
    database : 'smartbrain'
  }
});
 
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
	res.send('it is working');
	// res.send(database.users);
})

app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt) });

app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res) => { image.handleImage(req,res,db)})

app.post('/imageurl',(req,res) => { image.handleApiCall(req,res) })

app.listen(process.env.PORT || 3002, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})

/*
/ --> res =returns 'this is working'
/signin --> POST = return success/fail (requires database as it checks the user's password)
/register --> POST = returns user
/profile/:userId --> GET = returns that particular user page
/image --> PUT = returns updated user
*/