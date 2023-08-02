import { QuizQuestion } from "./QuizQuestion";

const EMPTY_QUIZ_ANSWERS: boolean[] = [
	false, false, false, false, false, false, false, false, false, false
];

const REACT_TIMES: number[] = [
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];

export default class QuizState {

	showStart: boolean;
	showQuestion: boolean;
	showResult: boolean;
	quizQuestions: QuizQuestion[];
	quizAnswers: boolean[];
	reactTimes: number[];
	questionIndex: number;

	constructor(
	){
		this.showStart = true;
		this.showQuestion = false;
		this.showResult = false;
		this.quizQuestions = [];
		this.quizAnswers = [...EMPTY_QUIZ_ANSWERS];
		this.reactTimes = [...REACT_TIMES];
		this.questionIndex = -1;
	}
}