const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b69bea40fc9f4121a51ae94d378a9111'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('unable to work with the API'))
}

const handleImage = (db) => (req, res) => {
	const {id} = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('unable to get entries'));
	/*
	const user = fetchUser(req.body);
	if(!user)
		return res.status(404).json('user not found');
	else {
		user.entries++; 
		return res.json(user.entries);
	}	
	*/	
}

module.exports = {
	handleImage,
	handleApiCall
}