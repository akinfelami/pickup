import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import TimerIcon from '@mui/icons-material/Timer';
import IosShareIcon from '@mui/icons-material/IosShare';
import Head from 'next/head';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const EventDetails = dynamic(
	() => {
		const router = useRouter();
		const { id } = router.query;
		console.log(id);

		const Item = styled(Paper)(({ theme }) => ({
			backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
			...theme.typography.body2,
			padding: theme.spacing(2),
		}));

		const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 });
		const ZOOM_LEVEL = 9;
		const mapRef = useRef();

		return (
			<div>
				<Head>
					<title>Event Details</title>
					<meta name='description' content='Event Details' />
				</Head>
				<div
					class='relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center'
					style={{
						backgroundImage: 'url(/place2.jpg)',
						height: '350px',
					}}>
					<div
						class='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed'
						style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
				</div>
				<div className='ml-5'>
					<Typography
						sx={{
							marginTop: '20px',
							color: '#d1410c',
							fontWeight: 'bold',
							textTransform: 'uppercase',
						}}
						variant='body1'>
						Thursday, Oct 23, 2021 5:00PM CDT
					</Typography>
					<Typography
						sx={{ marginBottom: '0px' }}
						className='font-bold sm:text-4xl text-2xl'>
						Austin Soul Music Festival
					</Typography>
					<Typography variant='body1'>Mia Events Center, Austin TX</Typography>
				</div>
				<Box sx={{ flexGrow: 1, padding: 3 }}>
					<Grid container spacing={5}>
						<Grid item xs={12} sm={7}>
							<Item>
								<Typography className='font-bold' variant='h6'>
									About the Event
								</Typography>
								<Typography variant='body1' className='text-justify'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</Typography>
								<div className='flex flex-col space-y-5 mt-5'>
									<div className='flex flex-row space-x-3'>
										<PeopleIcon />
										<Typography>6 people attending</Typography>
									</div>
									<div className='flex flex-row space-x-3'>
										<PersonIcon />
										<Typography>Hosted by John Doe</Typography>
									</div>
									<div className='flex flex-row space-x-3'>
										<TimerIcon />
										<Typography>Duration: 2 hours</Typography>
									</div>
								</div>
							</Item>
						</Grid>
						<Grid item xs={12} sm={5}>
							<Item>
								<Typography className='font-bold' variant='h6'>
									Location
								</Typography>
								<Typography variant='body1'>
									Mia Events Center, Austin TX
								</Typography>
								<Typography variant='body1'>
									1234 Main St, Austin, TX 78701
								</Typography>
								<Typography variant='body1'>512-555-5555</Typography>
							</Item>
						</Grid>
						<MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							/>
							{location.loaded && !location.error && (
								<Marker
									position={[
										location.coordinates.lat,
										location.coordinates.lng,
									]}></Marker>
							)}
						</MapContainer>
					</Grid>
				</Box>
			</div>
		);
	},
	{
		ssr: false,
	}
);

export default EventDetails;
