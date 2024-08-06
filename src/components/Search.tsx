import React from 'react';

const Search = ({ searchTerm, setSearchTerm }: any) => {
	return (
		<div>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
					<svg
						className="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-2l4 4"
						/>
					</svg>
				</div>
				<input
					type="text"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Items..."
					onChange={(e: any) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
			</div>
		</div>
	);
};

export default Search;
