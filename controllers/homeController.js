exports.homePage = (req, res) => {
	res.render('about', {
		title: `Arif Mafazan Simohartono | About`,
		page: `About me`
	});
}