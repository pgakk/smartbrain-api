const handleGetProfile = (req, res, db) => {
	const {id} = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if(user.length)
				res.json(user[0]);
			else
				res.status(400).json('Not found');
		})
		.catch(err => res.status(400).json('error getting profile'));
	/*
	const user = fetchUser(req.params);
	return (user ? res.json(user) : res.status(404).json('user not found'));
	*/
}

module.exports = {
	handleGetProfile
}