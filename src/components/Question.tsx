import { Typography, Container, Button, Grid } from '@mui/material';

import QuizState from '../domain/QuizState';
import quizMaster from '../services/QuizMaster';

type QuestionProps = {
	quizState: QuizState;
	setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
	indicateAnswer: (correct: boolean) => void;
	alertError: (error: string) => void;	
	children?: React.ReactNode;
}


const Question: React.FC<QuestionProps> = ( {quizState, setQuizState, indicateAnswer: indicateLastAnswer} ) => {
	
	const answerQuestion = async ( yesAnswered: boolean): Promise<void> => {
		const answerCorrect = quizMaster.checkAnswer(quizState, yesAnswered);
		indicateLastAnswer(answerCorrect);

		console.log(`Question.answerQuestion(${yesAnswered})`);
		quizState.quizAnswers[quizState.questionIndex] = yesAnswered;
		const answersCopy = quizMaster.provideAnswersCopy(quizState);

		const lastQuestionReached = quizState.questionIndex === (quizMaster.MAX_QUESTIONS-1);
		if (lastQuestionReached === false) {
			setQuizState((prevState) => {
				return {
					...prevState,
					questionIndex: prevState.questionIndex + 1,
					answers: answersCopy,
				}
			});
		} else {
			setQuizState((prevState) => {
				return {
					...prevState,
					showQuestion: false,
					showResult: true,
					answers: answersCopy,
				}
			});
		}
	}

	return (
		<>
			<Container maxWidth="sm" >
				<Typography variant="h2" align="center" color="textPrimary" gutterBottom>
					Question No. {quizState.questionIndex + 1}
				</Typography>
				<Typography variant="h5" align="center" color="textSecondary" paragraph >
					{quizState.quizQuestions[quizState.questionIndex].question}
				</Typography>

				<div>
					<Grid container spacing={2} justifyContent="center">
						<Grid item>
							<Button 
								onClick={() => answerQuestion(true)}
								variant="contained" 
								color="primary"
							>
								Yes
							</Button>
						</Grid>
						<Grid item>
							<Button 
								onClick={() => answerQuestion(false)}
								variant="outlined" 
								color="primary"
							>
								No
							</Button>
						</Grid>
					</Grid>
				</div>
			</Container>
		</>
	)
}

export default Question;