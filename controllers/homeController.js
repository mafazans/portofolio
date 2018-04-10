exports.homePage = (req, res) => {
	res.render('about', {
		title: `Arif Mafazan Simohartono | About`,
		page: `About me`
	});
}

exports.whatsapp = (req, res) => {
	res.render('whatsapp', {
		title: `Whatsapp everyone`
	});
}

exports.whatsappChat = (req, res) => {
	const nomorHp = req.body.nomorHp;
	let noHp = nomorHp.replace(/^0/, "62");
	res.redirect(`https://api.whatsapp.com/send?phone=${noHp}`);
}