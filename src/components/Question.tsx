import { Typography, Container, Button, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';

// import illustrationImage from '../assets/ai_generated/illustration_1.png';

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
	
    const [startTime, setStartTime] = useState<number>(Date.now()); // Add this state variable
	const [illustrationSrc, setIllustrationSrc] = useState<string>("");

    useEffect(() => {
        setStartTime(Date.now()); // Update start time whenever the question changes

		(async () => {
			const questionId = quizState.quizQuestions[quizState.questionIndex].id;
			const src = `../assets/ai_generated/illustration_${questionId}.png`;
			const imageModule = await import(/* @vite-ignore */ src);
			setIllustrationSrc(imageModule.default);
		})();
    }, [quizState.questionIndex]);	

	const answerQuestion = async ( yesAnswered: boolean): Promise<void> => {
		const endTime = Date.now();
		const timeTaken = endTime - startTime; // Time taken in milliseconds

		const answerCorrect = quizMaster.checkAnswer(quizState, yesAnswered);
		indicateLastAnswer(answerCorrect);

		console.log(`Question.answerQuestion(${yesAnswered})`);
		quizState.quizAnswers[quizState.questionIndex] = yesAnswered;
		quizState.reactTimes[quizState.questionIndex] = timeTaken;

		const lastQuestionReached = quizState.questionIndex === (quizMaster.MAX_QUESTIONS-1);
		if (lastQuestionReached === false) {
			setQuizState((prevState) => {
				return {
					...prevState,
					questionIndex: prevState.questionIndex + 1,
					answers: prevState.quizAnswers,
				}
			});
		} else {
			setQuizState((prevState) => {
				return {
					...prevState,
					showQuestion: false,
					showResult: true,
					answers: prevState.quizAnswers,
					reactTimes: prevState.reactTimes,
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
				<Box display="flex" justifyContent="center">
				<img src={illustrationSrc} alt="test" style={{ width: '512px' }}/>
				</Box>
				<Typography 
					variant="h5" 
					align="center" 
					color="textSecondary" 
					paragraph 
					sx={{ maxWidth: '512px', margin: '0 auto' }}  // The margin centers the Typography horizontally
				>
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