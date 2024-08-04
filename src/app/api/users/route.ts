import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export async function GET() {
	return NextResponse.json({
		hello: 'world',
	});
}

export async function POST(req: any) {
	const body = await req.json();
	const { pantryItems } = body;
	if (!pantryItems || !Array.isArray(pantryItems)) {
		return NextResponse.json(
			{ message: 'Invalid pantry items' },
			{ status: 400 }
		);
	}
	const prompt = createPrompt(pantryItems);
	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: prompt },
			],
			max_tokens: 150,
		});

		const recipe = response.choices[0].message.content?.trim();
		return NextResponse.json({ recipe });
	} catch (error) {
		console.log('Error fetching recipe from OpenAI: ' + error);
		return NextResponse.json(
			{ message: 'Error fetching recipe from OpenAI' },
			{ status: 500 }
		);
	}
}

function createPrompt(pantryItems: any) {
	let prompt = `Here is a list of all the ingredients I have in my pantry:\n`;
	pantryItems.forEach((item: any) => {
		prompt += `-${item.productName} (${item.category}, ${item.quantity}, ${item.price})\n`;
	});
	prompt += `\nCan you suggest a recipe I can make with these ingredients? Please list them in a nice format.`;
	return prompt;
}
