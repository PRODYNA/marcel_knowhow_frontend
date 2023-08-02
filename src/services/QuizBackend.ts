import { QuizQuestion } from "../domain/QuizQuestion";

type QuestionServerResponse = {
	questions: QuizQuestion[];
}

type ResultsServerRequest = {
	questions: QuizQuestion[];
	answers: boolean[];
	reactTimes: number[];
}

type ResultsServerResponse = {
	ratio: number;
}


const quizBackend = {
	
	getQuestionsAsync: async (): Promise<QuizQuestion[]> => {
		const endpoint = `${import.meta.env.VITE_APP_API_URL}/items`;
		console.log(`Calling server at "${endpoint}"`);
		const response = await fetch(
			endpoint, 
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		const json: unknown = await response.json();
		const serverResponse = json as QuestionServerResponse;
		console.log(`Server responded with "${serverResponse.questions.length}" questions.`);
		return serverResponse.questions;
	},

	postResultsAsync: async (questions: QuizQuestion[], answers: boolean[], reactTimes: number[]): Promise<number> => {
		const endpoint = `${import.meta.env.VITE_APP_API_URL}/quizz_results`;
		console.log(`Calling server at "${endpoint}"`);
		const resultsRequest: ResultsServerRequest = {
			questions: questions,
			answers: answers,
			reactTimes: reactTimes,
		};
		const response = await fetch(
			endpoint, 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(resultsRequest)
			}
		);
		const json: unknown = await response.json();
		const serverResponse = json as ResultsServerResponse;
		console.log(`Server responded with ratio "${serverResponse.ratio}".`);
		return serverResponse.ratio;
	},
}

export default quizBackend;