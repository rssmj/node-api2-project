import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialPost = {
	title: '',
	contents: '',
};

export const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState(initialPost);

	useEffect(() => {
		axios
			.get('http://localhost:8888/api/posts')
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(`You got no posts!`, err.response);
			});
	}, []);

	const addPost = () => {
		axios
			.post('http://localhost:8888/api/posts', post)
			.then((res) => {
				console.log(res.data);
				setPost(initialPost);
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(`Added no posts!`, err.response);
			}); 
	};

	const deletePost = (post) => {
		axios
			.delete(`http://localhost:8888/api/posts/${post.id}`)
			.then(() => {
				setPosts(posts.filter((item) => item.id !== post.id));
			})
			.catch((err) => {
				console.log(`Deleted no posts!`, err.response);
			});
	};

	const handleChanges = (e) => {
		setPost({
			...post,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='Posts'>
			<>
				<div className='container'>
					<h1 className='posts-header'>Posts</h1>
					<ul className='posts-container'>
						{posts.map((post) => {
							return (
								<li key={post.id}>
									<p className='post-title'> {post.title}</p>
									<p className='post-content'>{post.contents}</p>
									<span
										className='delete'
										onClick={(e) => {
											e.stopPropagation();
											deletePost(post);
										}}
									>
										DELETE
									</span>
								</li>
							);
						})}
					</ul>
					<div className='form-container'>
						<form onSubmit={addPost}>
							<label>New Post</label>
							<input
								id='title'
								name='title'
								placeholder='title'
								value={post.title}
								onChange={handleChanges}
							/>
							<textarea
								id='contents'
								name='contents'
								placeholder='content'
								value={post.contents}
								onChange={handleChanges}
							/>
							<div>
								<button type='submit'>Add Post</button>
							</div>
						</form>
					</div>
				</div>
			</>
		</div>
	);
};
