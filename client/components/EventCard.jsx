import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function EventCard() {
	const router = useRouter();
	return (
		<Card
			onClick={() => router.push('/events/abababab')}
			sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					sx={{ maxHeight: 160 }}
					component='img'
					height='auto'
					width='auto'
					src='/place2.jpg'
					alt='event image'
				/>
				<CardContent>
					{/* Time and Date */}
					<Typography
						sx={{
							color: '#d1410c',
							fontWeight: 'bold',
							textTransform: 'uppercase',
						}}
						variant='body1'>
						Oct 23, 2021 7:00 PM
					</Typography>
					{/* Event Title */}
					<Typography
						sx={{ marginBottom: '0px' }}
						className='font-bold'
						gutterBottom
						variant='h6'
						component='div'>
						Austin Soul Music Festival
					</Typography>

					{/* Location */}
					<div className='flex flex-row items-center'>
						<Typography className='mr-1' variant='body1' color='text.secondary'>
							Mia Events Center
						</Typography>{' '}
						<span style={{ fontSize: '20px' }}> • </span>
						<Typography className='ml-1' color='text.secondary' variant='body1'>
							Austin, TX
						</Typography>
					</div>
					{/* Attendees */}
					<div className='flex flex-row items-center mb-2'>
						{/* <PermIdentityOutlinedIcon className='mr-1' /> */}
						<Typography variant='body1' color='text.secondary'>
							1000 capacity <span style={{ fontSize: '14px' }}> • </span> 64
							going
						</Typography>
					</div>
					{/* Fee */}
					<Typography variant='body1' color='text.secondary'>
						Fee: $20
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
