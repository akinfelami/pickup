import React, { ReactNode } from 'react';
import DrawerAppBar from '../components/MenuBar';
import LoginModal from '../components/LoginModal';
import { Button } from '@mui/material';

const Layout = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const navs = [
		{ label: 'My Events', link: '/events/view' },
		{ label: 'Profile', link: '/profile' },
	];

	const rightAlignedComponents = [
		<Button size='medium' onClick={() => setIsOpen(!isOpen)}>
			Log in
		</Button>,
		<Button size='medium'> Sign up</Button>,
		<Button size='medium'> Create Event</Button>,
	];

	return (
		<main>
			<LoginModal isOpen={isOpen} handleCloseModal={handleCloseModal} />
			<DrawerAppBar
				navs={navs}
				rightAlignedComponents={rightAlignedComponents}
			/>
			{children}
		</main>
	);
};

export default Layout;
