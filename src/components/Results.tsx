import React from 'react';
import { Typography, Container, Button, Grid, Backdrop, CircularProgress } from '@mui/material';
import QuizState from '../domain/QuizState';
import quizMaster from '../services/QuizMaster';


type ResultsProps = {
	quizState: QuizState;
	setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
	alertError: (error: string) => void;	
	children?: React.ReactNode;
}

const Results: React.FC<ResultsProps> = ( {quizState, setQuizState, alertError} ) => {

	const [showLoadingBackdrop, setShowLoadingBackdrop] = React.useState<boolean>(false);
	const [correctnessRatio, setCorrectnessRatio] = React.useState<number>(0);
	
	React.useEffect(() => {
		if (quizMaster.MAX_QUESTIONS === quizState.questionIndex + 1) {
			quizState.questionIndex = -1;
			console.log("Sending results to server...");
			setShowLoadingBackdrop(true);
			quizMaster.publishResultsAsync(quizState).then((ratio) => {
				console.log("Results sent to server.");
				console.log(`Ratio: ${ratio}`);
				setCorrectnessRatio(ratio);
			}).catch((error) => {
				const errMessage = `Error sending results to server: ${error}`
				console.error(errMessage);
				alertError(errMessage);
			}).finally(() => {
				setShowLoadingBackdrop(false);
			});
		}
	}, []);


	const restartQuiz = async () => {
		console.log("Loading questions...");
		setShowLoadingBackdrop(true);
		const questions = await quizMaster.provideTenRandomQuestionsAsync();
		setShowLoadingBackdrop(false);
		setQuizState((prevState) => {
			return {
				...prevState,
				showResult: false,
				showQuestion: true,
				quizQuestions: questions,
				questionIndex: 0,
			}
		});
	}

	return (
		<>
			<Container maxWidth="sm">
				<Typography variant="h2" align="center" color="textPrimary" gutterBottom>
					Results
				</Typography>
				<Typography variant="h5" align="center" color="textSecondary" paragraph>
					You answered {correctnessRatio*100}% correctly!
				</Typography>

				<div>
					<Grid container spacing={2} justifyContent="center">
						<Grid item>
							<Button 
								onClick={restartQuiz}
								variant="contained" 
								color="primary" 
								size='large' 
							>
								Restart
							</Button>
						</Grid>
					</Grid>
				</div>
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

export default Results
