// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import {
	addDoc,
	getFirestore,
	collection,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
	query,
	where,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAAmvTQHuMZ-rdO1tFluhLZacfzfubx868',
	authDomain: 'pantry-tracker-45a89.firebaseapp.com',
	projectId: 'pantry-tracker-45a89',
	storageBucket: 'pantry-tracker-45a89.appspot.com',
	messagingSenderId: '105790116801',
	appId: '1:105790116801:web:c58368f6adbc83271b5540',
	measurementId: 'G-SC0WXGLNJL',
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const analytics = getAnalytics(app);

const db = getFirestore(app);

export async function addData(data: any) {
	const col = collection(db, 'items');
	try {
		const docRef = await addDoc(col, data);
		const newItem = { ...data, id: docRef?.id };
		return newItem;
	} catch (err) {
		console.log(err);
	}
}

export async function removeData(id: any) {
	try {
		const ref = doc(db, 'items', id);
		await deleteDoc(ref);
		console.log('Document successfully removed!');
	} catch (err) {
		console.log(err);
	}
}

export async function updateData(data: any, id: any) {
	try {
		const ref = doc(db, 'items', id);
		await updateDoc(ref, data);
		console.log('Document successfully updated!');
		const updatedItem = { ...data, id: ref.id };
		return updatedItem;
	} catch (err) {
		console.log(err);
	}
}

export async function getAndSearchItems(searchTerm: string) {
	let q;
	if (searchTerm) {
		q = query(
			collection(db, 'items'),
			where('productName', '>=', searchTerm),
			where('productName', '<=', searchTerm + '\uf8ff')
		);
	} else {
		q = query(collection(db, 'items'));
	}

	try {
		const snapshot = await getDocs(q);
		const items = snapshot.docs.map((doc) => {
			const { productName, category, price, quantity } = doc.data();
			return {
				id: doc.id,
				productName,
				category,
				price,
				quantity,
			};
		});
		return items;
	} catch (err) {
		console.log(err);
	}
}

export async function register(email: string, password: string) {
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredentials.user;
	} catch (err) {
		console.log(err);
	}
}

export async function login(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (err) {
		console.log(err);
	}
}
