import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Link from 'next/link';

const drawerWidth = 240;

const DrawerAppBar = ({ navs, rightAlignedComponents }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle}>
			<List
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{navs.map((nav) => (
					<Link href={nav.link} className='text-black no-underline'>
						<ListItem key={nav.label} disablePadding>
							<ListItemButton sx={{ textAlign: 'center' }}>
								<ListItemText primary={nav.label} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
				{rightAlignedComponents.map((component) => (
					<Box className='mt-3'>{component}</Box>
				))}
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				color='default'
				component='nav'
				elevation={0}
				position='static'
				className='h-14'>
				<Toolbar
					variant='dense'
					className='pt-1 pb-1'
					sx={{
						display: 'flex',
					}}>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						PICKUP
					</Typography>

					<Box className='hidden mt-1 sm:flex'>
						<div className='ml-2 min-w-0'>
							{rightAlignedComponents.map((component) => (
								<>{component}</>
							))}
						</div>
						{navs.map((nav) => (
							<Link href={nav.link}>
								<Button className='text-black capitalize'>{nav.label}</Button>
							</Link>
						))}
					</Box>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerToggle}
						className='default sm:hidden'>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					container={() => document.getElementById('__next')}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					anchor='right'
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					className='block sm:hidden'
					sx={{
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

export default DrawerAppBar;
