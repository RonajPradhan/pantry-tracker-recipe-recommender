import React from 'react';

const Overlay = ({ isOpen, onClose, children }: any) => {
	if (!isOpen) return null;
	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
				onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
			>
				<button
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
					onClick={onClose}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				{children}
			</div>
		</div>
	);
};

export default Overlay;
