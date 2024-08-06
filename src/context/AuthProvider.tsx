'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<any | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (admin) => {
			setUser(admin);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
