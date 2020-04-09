import React from 'react';
import { Main } from './components/main.js';
import { Posts } from './components/posts.js';
import { Route } from 'react-router-dom';

import './App.scss';

export const App = () => {
	return (
		<div className='App'>
			<>
				<Route path='/posts'>
					<Posts />
				</Route>
				<Route exact path='/'>
					<Main />
				</Route>
			</>
		</div>
	);
};
