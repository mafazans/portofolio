exports.blogIndex = (req, res) => {
	res.render('./blog/index', {
		title: `Arif Mafazan Simohartono | Blog`,
		page: `Blog`
	});
}