import axios from 'axios';
import React from 'react';

const page = ({
	recipe,
	loadingRecipe,
	setRecipe,
	setLoadingRecipe,
	PantryItems,
}: any) => {
	const getRecipe = async () => {
		setLoadingRecipe(true);
		try {
			const response = await axios.post('/api/users', { PantryItems });
			setRecipe(response.data.recipe);
		} catch (error) {
			console.error('Error fetching recipe:', error);
			alert('Error fetching recipe');
		}
		setLoadingRecipe(false);
	};

	const clearRecipe = () => {
		setRecipe('');
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-6 my-6">
			<h1 className="text-4xl font-extrabold mb-6 text-white shadow-md">
				Recipe Suggester
			</h1>
			<button
				onClick={getRecipe}
				disabled={loadingRecipe}
				className={`px-6 py-3 rounded-full text-white transition duration-300 ${
					loadingRecipe
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-blue-600 hover:bg-blue-800'
				}`}
			>
				{loadingRecipe ? 'Fetching Recipe...' : 'Get Recipe'}
			</button>
			{recipe && (
				<div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-2xl w-1/2 md:w-1/2 lg:w-1/2">
					<h2 className="text-2xl font-bold mb-2 text-white">
						Suggested Recipe:
					</h2>
					<p className="text-gray-300">{recipe}</p>
				</div>
			)}
			<button
				onClick={clearRecipe}
				disabled={recipe.length === 0}
				className={`my-6 px-6 py-3 rounded-full text-white transition duration-300 ${
					recipe.length === 0
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-red-600 hover:bg-red-800'
				}`}
			>
				Clear Recipe
			</button>
		</div>
	);
};

export default page;
