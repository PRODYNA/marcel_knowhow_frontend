import { QuizQuestion } from "./QuizQuestion";

const EMPTY_QUIZ_ANSWERS: boolean[] = [
	false, false, false, false, false, false, false, false, false, false
];

export default class QuizState {

	showStart: boolean;
	showQuestion: boolean;
	showResult: boolean;
	quizQuestions: QuizQuestion[];
	quizAnswers: boolean[];
	questionIndex: number;

	constructor(
	){
		this.questionIndex = -1;
		this.showStart = true;
		this.showQuestion = false;
		this.showResult = false;
		this.quizQuestions = [];
		this.quizAnswers = [...EMPTY_QUIZ_ANSWERS];
	}
}