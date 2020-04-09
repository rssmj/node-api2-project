import React from 'react';
import { useHistory } from 'react-router-dom';

export const Main = () => {
	const history = useHistory();

	const handleClick = (e) => {
		e.preventDefault();
		history.push('/posts');
	};
	return (
		<div className='Main'>
			<>
				<div classname='main-container' onClick={handleClick}>
					<h1 className='bleep'>[-_-]</h1>
					<p className='enter'>enter</p>
				</div>
			</>
		</div>
	);
};
