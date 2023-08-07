import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useEffect } from 'react';
import { Alert, AlertTitle, Container, CssBaseline } from '@mui/material';
import JniAppBar from './components/JniAppBar';
import StartQuiz from './components/StartQuiz';
import RenderSwitch from './components/RenderSwitch';
import QuizState from './domain/QuizState';
import Question from './components/Question';
import Results from './components/Results';
import Footer from './components/Footer';

const INDICATE_RIGHT_COLOR = 'green';
const INDICATE_WRONG_COLOR = 'red';

const App = () => {

	const [quizState, setQuizState] = React.useState<QuizState>(new QuizState());
	const [showAlert, setShowAlert] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>();
	const [indicate, setIndicate] = React.useState<boolean>(false);
	const [indicateColor, setIndicateColor] = React.useState<string>('inherit');

	useEffect(() => {
		if (indicate) {
			const timer = setTimeout(() => {
				setIndicate(false);
			}, 200); // adjust the delay as needed
			return () => clearTimeout(timer);
		}
	}, [indicate]);

	const alertError = (error: string) => {
		setErrorMessage(error);
		setShowAlert(true);
	}

	const indicateAnswer = (correct: boolean) => {
		setIndicateColor(correct ? INDICATE_RIGHT_COLOR : INDICATE_WRONG_COLOR);
		setIndicate(true);
	}

	return (
		<>
			<CssBaseline />
			<JniAppBar />
			
			{/* Error Messages */}
			<RenderSwitch render={showAlert}>
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					{errorMessage}
				</Alert>
			</RenderSwitch>
			
			{/* Answer Indicator */}
			<Container
				sx={{
					height: '10px',
					backgroundColor: indicate ? indicateColor : 'inherit',
					transition: 'background-color 0.5s ease-out',
				}}
			/>

			<main style={{ paddingBottom: '70px' }}> {/* Reserve extra space to avoid footer conflict*/}
				<RenderSwitch render={quizState.showStart}>
					<StartQuiz 
						quizState={quizState} 
						setQuizState={setQuizState} 
						alertError={alertError}
					/>
				</RenderSwitch>
				<RenderSwitch render={quizState.showQuestion}>
					<Question 
						quizState={quizState} 
						setQuizState={setQuizState} 
						indicateAnswer={indicateAnswer}
						alertError={alertError}
					/>
				</RenderSwitch>
				<RenderSwitch render={quizState.showResult}>
					<Results 
						quizState={quizState} 
						setQuizState={setQuizState}
						alertError={alertError}
					/>
				</RenderSwitch>
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default App
