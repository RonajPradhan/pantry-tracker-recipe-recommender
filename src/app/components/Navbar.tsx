"use client"
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

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
						href="/about"
						className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						About
					</Link>
					<Link
						href="/contact"
						className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Contact
					</Link>
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
