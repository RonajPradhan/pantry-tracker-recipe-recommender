import React from 'react';
import { removeData } from '../firebase/firebase';

const PantryTable = ({
	data,
	loading,
	setData,
	openModal,
	setEditItem,
	setIsEdit,
}: any) => {
	const handleDelete = (id: any) => {
		try {
			removeData(id);
		} catch (err) {
			console.log(err);
		} finally {
			const updatedData = data.filter((i: any) => i.id !== id);
			setData(updatedData);
		}
	};

	const handleEdit = (item: any) => {
		setEditItem(item);
		openModal();
		setIsEdit(true);
	};

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Product Name
						</th>

						<th scope="col" className="px-6 py-3">
							Category
						</th>
						<th scope="col" className="px-6 py-3">
							Quantity
						</th>
						<th scope="col" className="px-6 py-3">
							Price per unit
						</th>
						<th scope="col" className="px-6 py-3">
							Total Price
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{!loading &&
						data.map((item: any, i: any) => (
							<tr
								key={i}
								className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
							>
								<td scope="row" className="px-6 py-4">
									{item.productName}
								</td>
								<td scope="row" className="px-6 py-4">
									{item.category}
								</td>

								<td className="px-6 py-4">{item.quantity}</td>
								<td className="px-6 py-4">${item.price}</td>
								<td className="px-6 py-4">${item.quantity * item.price} </td>
								<td className="px-6 py-4">
									<span
										className="cursor-pointer "
										onClick={() => handleEdit(item)}
									>
										📝
									</span>
									<span
										className="cursor-pointer px-2"
										onClick={() => handleDelete(item.id)}
									>
										❌
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default PantryTable;
