const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const signin = require('./controllers/Signin');
const register = require('./controllers/Register');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'lmlkrt$321',
    database : 'smart-brain'
  }
});

db.select('*').from('users');

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*const database = {
	users: [
		{
			id:'123',
			name:'John',
			email:'john@gmail.com',
			password: 'cookies',
			entries:0,
			timestamp: new Date()
		},
		{
			id:'124',
			name:'Sally',
			email:'sally@gmail.com',
			password: 'bananas',
			entries:0,
			timestamp: new Date()
		}
	]
};
fetchUser = (params) => {
	const {id} = params;
	let found = false;
	let matchedUser = {};
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			matchedUser = user;
		}
	});
	return (found ? matchedUser : false);
}*/

app.get('/', (req, res) => { res.json(database.users); })

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleGetProfile(req, res, db) })
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
	console.log('app is running on port 3000');
})