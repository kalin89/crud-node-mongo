const indexCtr = {};

indexCtr.renderIndex = (req, res) => {
	res.render('index');
};

indexCtr.renderAbout = (req, res) => {
	res.render('about');
};

module.exports = indexCtr;
