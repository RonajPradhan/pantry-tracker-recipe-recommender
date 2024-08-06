'use client';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

const Navbar = () => {
	const user = useAuth();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			router.push('/');
		} catch (err) {
			console.log(err);
		}
	};

	if (!user) {
		return null;
	}

	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white font-bold text-xl">
					<Link href="/">Pantry Tracker</Link>
				</div>
				<div className="hidden md:flex">
					<Link
						href="/"
						className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Home
					</Link>
					<Link
						href="/getRecipe"
						className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Get Recipe
					</Link>
					<button
						onClick={handleLogout}
						className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Logout
					</button>
				</div>
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Menu
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden">
					<Link
						href="/"
						className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Home
					</Link>
					<Link
						href="/about"
						className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						About
					</Link>
					<Link
						href="/contact"
						className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Contact
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
