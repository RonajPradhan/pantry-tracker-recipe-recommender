'use client';
import React, { useState, useEffect } from 'react';
import PantryTable from './components/PantryTable';
import AddItems from './components/AddItems';
import Overlay from './components/Overlay';
import { getAndSearchItems } from './firebase/firebase';
import Search from './components/Search';
import axios from 'axios';

const Page = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);
	const [pantryItems, setPantryItems] = useState<any>([{}]);
	const [isLoading, setIsLoading] = useState(true);
	const [isEdit, setIsEdit] = useState(false);
	const [editItem, setEditItem] = useState({});
	const [searchTerm, setSearchTerm] = useState('');
	const [recipe, setRecipe] = useState('');
	const [loadingRecipie, setLoadingRecipie] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAndSearchItems(searchTerm);
				setPantryItems(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [searchTerm]);

	const getRecipe = async () => {
		setLoadingRecipie(true);
		try {
			const response = await axios.post('/api/users', { pantryItems });
			setRecipe(response.data.recipe);
		} catch (error) {
			console.error('Error fetching recipe:', error);
			alert('Error fetching recipe');
		}
		setLoadingRecipie(false);
	};

	return (
		<div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
			<div className="my-3 flex justify-between">
				<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<button
					onClick={() => {
						setIsEdit(false);
						openModal();
					}}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				>
					+
				</button>
			</div>
			<PantryTable
				loading={isLoading}
				data={pantryItems}
				setData={setPantryItems}
				openModal={openModal}
				setEditItem={setEditItem}
				setIsEdit={setIsEdit}
			/>
			<Overlay isOpen={isModalOpen} onClose={closeModal}>
				<div className="p-4 bg-gray-800">
					<AddItems
						data={pantryItems}
						setData={setPantryItems}
						closeModal={closeModal}
						isEdit={isEdit}
						editItem={editItem}
						setIsEdit={setIsEdit}
					/>
				</div>
			</Overlay>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-6 my-6">
				<h1 className="text-4xl font-extrabold mb-6 text-white shadow-md">
					Recipe Suggester
				</h1>
				<button
					onClick={getRecipe}
					disabled={loadingRecipie}
					className={`px-6 py-3 rounded-full text-white transition duration-300 ${
						loadingRecipie
							? 'bg-gray-600 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-800'
					}`}
				>
					{loadingRecipie ? 'Fetching Recipe...' : 'Get Recipe'}
				</button>
				{recipe && (
					<div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-2xl w-3/4 md:w-1/2 lg:w-1/3">
						<h2 className="text-2xl font-bold mb-2 text-white">
							Suggested Recipe:
						</h2>
						<p className="text-gray-300">{recipe}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
