'use client';
import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import { login, auth } from '@/firebase/firebase';
import { useAuth } from '@/context/AuthProvider';
import Dashboard from './dashboard/page';

const Page = () => {
	const [userDetails, setUserDetails] = useState<any | null>();
	const [loading, setLoading] = useState<boolean>(true);
	const user = useAuth();

	useEffect(() => {
		setUserDetails(user);
		setLoading(false);
	}, [user]);

	return (
		<>
			{userDetails ? <Dashboard loading={loading} /> : <Login login={login} />}
		</>
	);
};

export default Page;
