handleRegister = (req, res, db, bcrypt) => {
	const {email, name, password} = req.body;
	if(!email || !name || !password)
		return res.status(400).json('improper details');

	var hash = bcrypt.hashSync(password);
	
	db.transaction(trx => {
		trx.insert({
			hash,
			email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert(
					{
						name,
						email : loginEmail[0],
						joined : new Date()
					}
				)
				.then(user => res.json(user[0]));
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(err => res.status(400).json('unable to register'));

	/*
	const id = Number(database.users[database.users.length -1].id) + 1;
	database.users.push({
		id:id,
		name:name,
		email:email,
		password: password,
		entries:0,
		timestamp: new Date()
	})
	res.json(database.users[database.users.length -1]);
	*/
	
}

module.exports = {
	handleRegister
}