import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='flex flex-col flex-grow items-center mb-8'>
				<Hero />
			</div>
			<div className='px-4 sm:px-6 w-full mx-auto'>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<EventCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EventCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EventCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EventCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EventCard />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EventCard />
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Home;
