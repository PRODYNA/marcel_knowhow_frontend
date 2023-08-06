import React from 'react';
import { Typography, Container, Button, Grid, Backdrop, CircularProgress } from '@mui/material';
import QuizState from '../domain/QuizState';
import quizMaster from '../services/QuizMaster';
import testImage from '../assets/ai_generated/illustration_1.png';

type StartQuizProps = {
	quizState: QuizState;
	setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
	alertError: (error: string) => void;
	children?: React.ReactNode;
}


const StartQuiz: React.FC<StartQuizProps> = ( {setQuizState, alertError} ) => {
	
	const [showLoadingBackdrop, setShowLoadingBackdrop] = React.useState<boolean>(false);

	const startQuiz = async () => {
		console.log("Loading questions...");
		setShowLoadingBackdrop(true);
		try {
			const questions = await quizMaster.provideTenRandomQuestionsAsync();
			setShowLoadingBackdrop(false);
			setQuizState((prevState) => {
				return {
					...prevState,
					showStart: false,
					showQuestion: true,
					quizQuestions: questions,
					questionIndex: 0,
				}
			});
		} catch (error) {
			const errMessage = `Error loading questions: ${error}`
			console.error(errMessage);
			alertError(errMessage);
			setShowLoadingBackdrop(false);
		}
	}

	return (
		<>
			<Container maxWidth="sm">
				<Typography variant="h2" align="center" color="textPrimary" gutterBottom>
					History Quiz
				</Typography>
				<Typography variant="h5" align="center" color="textSecondary" paragraph>
					You will be asked 10 AI-generated questions about the history of Europe.
					Answer with the buttons "yes" and "no".
					Your results will be shown at the end.
				</Typography>

				<div>
					<Grid container spacing={2} justifyContent="center">
						<Grid item>
							<Button 
								onClick={startQuiz}
								variant="contained" 
								color="primary" 
								size='large' 
							>
								Start
							</Button>
						</Grid>
					</Grid>
				</div>
				<img src={testImage} alt="test" />
			</Container>

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={showLoadingBackdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	)
}

export default StartQuiz
