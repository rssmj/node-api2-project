const express = require('express');
const Posts = require('../data/db.js');
const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
	Posts.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The posts information could not be retrieved.',
			});
		});
});

// GET post by id
router.get('/:id', (req, res) => {
	const { id } = req.params;
	Posts.findById(id)
		.then((post) => {
			post.length !== 0
				? res.status(200).json(post)
				: res.status(404).json({
						message: `The post with the specified ID: ${id} does not exist.`,
				  });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The post information could not be retrieved.',
			});
		});
});

// GET post comments
router.get('/:id/comments', (req, res) => {
	const { id } = req.params;
	Posts.findPostComments(id)
		.then((comments) => {
			comments.length !== 0
				? res.status(200).json(comments)
				: res.status(404).json({
						message: `The post with the specified ID: ${id} does not exist.`,
				  });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The comments information could not be retrieved.',
			});
		});
});

// POST new
router.post('/', (req, res) => {
	const { id } = req.params;
	const body = req.body;
	Posts.insert(body, id)
		.then((body) => {
			!(body.title || body.contents)
				? res.status(201).json(body)
				: res.status(400).json({
						errorMessage: 'Please provide title and contents for the post.',
				  });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'There was an error while saving the post to the database',
			});
		});
});

// POST new comment
router.post('/:id/comments', (req, res) => {
	const { id } = req.params;
	const body = req.body;
	Posts.insertComment(body)
		.then((comment) => {
			body.text || body.post_id
				? res.status(201).json(comment)
				: res
						.status(400)
						.json({ errorMessage: 'Please provide text for the comment.' });
		})
		.catch((error) => {
			console.log(error);
			res.status(404).json({
				message: `The comment with the specified ID: ${id} does not exist.`,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'There was an error while saving the comment to the database',
			});
		});
});

// UPDATE post
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const body = req.body;
	Posts.update(id, body)
		.then(() => {
			Posts.findById(id).then((post) => {
				body.title || body.contents
					? res.status(200).json(post)
					: res.status(400).json({
							error: 'Please provide title and contents for the post.',
					  });
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(404).json({
				message: `The post with the specified ID: ${id} does not exist.`,
			});
		})
		.catch((error) => {
			console.log(error);
			res
				.status(500)
				.json({ error: 'The post information could not be modified' });
		});
});

// DELETE post
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Posts.findById(id).then((deletePost) => {
		Posts.remove(req.params.id)
			.then(() => {
				res.status(200).json({ DELETED: `Post ID: ${id}`, Post: deletePost });
			})
			.catch((error) => {
				console.log(error);
				res.status(404).json({
					message: `The post with the specified ID: ${id} does not exist.`,
				});
			})
			.catch((error) => {
				console.log('error from removing post', error);
				res.status(500).json({ error: 'The post could not be removed.' });
			});
	});
});

module.exports = router;
