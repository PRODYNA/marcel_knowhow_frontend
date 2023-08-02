import { QuizQuestion } from "../domain/QuizQuestion";
import QuizState from "../domain/QuizState";
import quizBackend from "./QuizBackend";


const quizMaster = {

	MAX_QUESTIONS: 10,
	
	provideTenRandomQuestionsAsync: async () => {
		const loadedQuestions = await quizBackend.getQuestionsAsync();
		const selectedQuestions = quizMaster._randomSelect10Questions(loadedQuestions);
		return selectedQuestions;
	},

	_randomSelect10Questions: (questions: QuizQuestion[]) => {
		const copiedQuestions = [...questions];		
		if (copiedQuestions.length < 10) {
			throw new Error(`Not enough questions in the list. There are only ${copiedQuestions.length} questions.`);
		}

		const selectedQuestions: QuizQuestion[] = [];
		for (let i = 0; i < 10; i++) {
			const randomIndex = Math.floor(Math.random() * copiedQuestions.length);
			const randomQuestion = copiedQuestions[randomIndex];
			copiedQuestions.splice(randomIndex, 1);
			selectedQuestions.push(randomQuestion);
		}
		return selectedQuestions;
	},

	publishResultsAsync: async (quizState: QuizState): Promise<number> => {
		const ratio = await quizBackend.postResultsAsync(
			quizState.quizQuestions, 
			quizState.quizAnswers,
			quizState.reactTimes,
		);
		return ratio;
	},

	checkAnswer(quizState: QuizState, yesAnswered: boolean) {
		const currentQuestion = quizState.quizQuestions[quizState.questionIndex];
		const correctness = currentQuestion.yes_answer === yesAnswered;
		return correctness;
	}

}

export default quizMaster;