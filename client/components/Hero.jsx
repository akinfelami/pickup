import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, MenuItem, TextField, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

function Hero() {
	const locations = [
		{ value: 'location1', label: 'Location 1' },
		{ value: 'location2', label: 'Location 2' },
		{ value: 'location3', label: 'Location 3' },
		// ... more locations
	];
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className='px-4 sm:px-6 w-full mx-auto'>
			<div className='flex flex-col text-primary mt-6 sm:mt-4 mb-10 justify-between'>
				<div className='w-full'>
					<h1 className='sm:text-5xl text-3xl font-bold'>
						Welcome, Akinfolami 👋
					</h1>
					<p className='font-bold text-2xl mt-5'>Discover Events</p>
				</div>
			</div>
			<div className='flex flex-row items-center'>
				<h2 className='text-2xl font-bold mr-3'>Poplular in </h2>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-row'>
					{/* Location dropdown */}
					<TextField
						id='standard-search'
						placeholder='Choose a location'
						{...register('location', { required: true })}
						type='search'
						variant='standard'
					/>

					{/* Submit button */}
					{/* <Button type='submit' variant='contained'>
					Submit
				</Button> */}
				</form>
			</div>
		</div>
	);
}

export default Hero;
