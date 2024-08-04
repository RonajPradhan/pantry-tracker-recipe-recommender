// import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY,
// });

export async function POST(req: any) {
	
	console.log('Request received:', req.method);

	// const { pantryItems } = req.json();

	// if (!pantryItems || Array.isArray(pantryItems)) {
	// 	return NextResponse.json(
	// 		{ message: 'Invalid pantry items' },
	// 		{ status: 400 }
	// 	);
	// }

	// const prompt = createPrompt(pantryItems);

	// try {
	// 	const response = await openai.completions.create({
	// 		model: 'text-davinci-003',
	// 		prompt: prompt,
	// 		max_tokens: 150,
	// 	});

	// 	const recipe = response.choices[0].text.trim();
	// 	return NextResponse.json({ recipe });
	// } catch (error) {
	// 	console.log('Error fetching recipe from OpenAI: ' + error);
	// 	return NextResponse.json(
	// 		{ message: 'Error fetching recipe from OpenAI' },
	// 		{ status: 500 }
	// 	);
	// }
}

// function createPrompt(pantryItems: any) {
// 	let prompt = `Here is a list of all the ingredients I have in my pantry:\n`;
// 	pantryItems.forEach((item: any) => {
// 		prompt += `-${item.productName} (${item.category}, ${item.quantity}, ${item.price})\n`;
// 	});
// 	prompt += `\nCan you suggest a recipe I can make with these ingredients?`;
// 	return prompt;
// }
