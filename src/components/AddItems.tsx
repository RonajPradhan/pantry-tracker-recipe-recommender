import React, { useEffect, useState } from 'react';
import { addData, updateData } from '../firebase/firebase';
import '../styles/customStyles.css';

const options = [
	{
		label: 'Fruit',
		value: 'fruit',
	},
	{
		label: 'Vegetable',
		value: 'vegetable',
	},
	{
		label: 'Meat',
		value: 'meat',
	},
	{
		label: 'Poultry',
		value: 'poultry',
	},
	{
		label: 'Drinks',
		value: 'drinks',
	},
	{
		label: 'Canned Food',
		value: 'cannedFood',
	},
	{
		label: 'Condiments',
		value: 'condiments',
	},
	{
		label: 'Dog Food',
		value: 'dogFood',
	},
	{
		label: 'Bakery',
		value: 'bakery',
	},
	{
		label: 'Others',
		value: 'others',
	},
];

const AddItems = ({
	setData,
	closeModal,
	isEdit,
	editItem,
	setEditItem,
}: any) => {
	const [inputs, setInputs] = useState({
		productName: '',
		category: '',
		quantity: '',
		price: '',
	});

	useEffect(() => {
		if (isEdit && editItem) {
			setInputs({
				productName: editItem.productName || '',
				category: editItem.category || '',
				price: editItem.price || '',
				quantity: editItem.quantity || '',
			});
		}
	}, [isEdit, editItem]);

	const onHandleChange = (e: any) => {
		const { name, value } = e.target;
		setInputs((prevValue) => ({
			...prevValue,
			[name]: value,
		}));
	};

	const handleSelectChange = (e: any) => {
		setInputs((prevValue) => ({
			...prevValue,
			category: e.target.value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const formattedInputs = {
			...inputs,
			productName: inputs.productName.toLowerCase(),
			quantity: Number(inputs.quantity),
			price: Number(inputs.price),
		};

		if (isEdit) {
			const updatedItem = await updateData(formattedInputs, editItem?.id);
			setData((prevValue: any) =>
				prevValue.map((item: any) =>
					item.id === updatedItem?.id ? inputs : item
				)
			);
		} else {
			const newItem = await addData(formattedInputs);
			setData((prevValue: any) => [...prevValue, newItem]);
		}

		closeModal();
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)} className="max-w-md mx-auto">
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name="productName"
					value={inputs.productName}
					onChange={(e) => onHandleChange(e)}
					id="product_name"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=""
					required
				/>
				<label
					htmlFor="product_name"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Product Name
				</label>
			</div>

			<div className="flex items-end gap-5">
				<div className="relative z-0 w-full mb-5 group">
					<label htmlFor="categorySelect" className="sr-only">
						Category
					</label>
					<select
						id="underline_select"
						onChange={handleSelectChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						value={inputs.category}
					>
						<option value="" disabled hidden className="text-gray-400">
							Choose a category
						</option>
						{options.map((option, i) => (
							<option value={option.value} key={i}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="number"
						name="quantity"
						value={inputs.quantity}
						onChange={(e) => onHandleChange(e)}
						id="quantity"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=""
						required
						min="1"
						step="1"
						pattern="\d*"
						inputMode="numeric"
					/>
					<label
						htmlFor="quantity"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Quantity
					</label>
				</div>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<input
					type="number"
					name="price"
					value={inputs.price}
					onChange={(e) => onHandleChange(e)}
					id="price"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					min="0"
					step="any"
					inputMode="numeric"
					pattern="\d*"
					required
				/>
				<label
					htmlFor="price"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Price per unit
				</label>
			</div>
			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Submit
			</button>
		</form>
	);
};

export default AddItems;
