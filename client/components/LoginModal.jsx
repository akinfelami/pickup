import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Box from '@mui/material/Box';

const LoginModal = ({ isOpen, handleCloseModal }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		handleClose();
	};

	return (
		<div>
			<Dialog
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				open={isOpen}
				onClose={handleCloseModal}>
				<Image
					style={{ margin: 'auto' }}
					src='/logo.png'
					alt='Logo'
					width={100}
					height={100}
				/>
				<DialogTitle sx={{ margin: 'auto', padding: '0', fontWeight: 'bold' }}>
					Login
				</DialogTitle>
				<p className='m-auto mt-1 text-lg'>Not a member yet? Sign up</p>
				<DialogContent sx={{ alignItems: 'center', justifyContent: 'center' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							{...register('email', { required: 'Email is required' })}
							label='Email'
							fullWidth
							margin='normal'
							error={errors.email}
							helperText={errors.email?.message}
							className='mb-4 rounded'
						/>
						<TextField
							{...register('password', { required: 'Password is required' })}
							label='Password'
							type='password'
							margin='normal'
							fullWidth
							error={errors.password}
							helperText={errors.password?.message}
							className='mb-4 rounded'
						/>
						<Button
							disableElevation
							className='bg-primary-default hover:bg-primary-light text-white mt-5 rounded w-full h-12 text-lg'
							variant='contained'
							type='submit'>
							Login
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default LoginModal;
