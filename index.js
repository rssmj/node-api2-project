require('dotenv').config(); 
const server = require('./server.js');
const port = process.env.PORT || 8888;
server.listen(port, () => {
	console.log(`\n [-__-]${port}[-__-] \n`);
});
