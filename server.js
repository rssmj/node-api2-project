const express = require('express');
const server = express().use(express.json());
const postsRouter = require('./posts/postsRouter.js');

server.get('/', (req, res) => {
	res.status(200).json({ message: `--> --> -->` });
});

server.use('/api/posts', postsRouter);

module.exports = server;
