require('dotenv').config();
const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
	console.log('Listen on por:', app.get('port'));
});
