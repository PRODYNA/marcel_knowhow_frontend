import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { Alert, AlertTitle, CssBaseline } from '@mui/material';
import JniAppBar from './components/JniAppBar';
import StartQuiz from './components/StartQuiz';
import RenderSwitch from './components/RenderSwitch';
import QuizState from './domain/QuizState';
import Question from './components/Question';
import Results from './components/Results';

const App = () => {

	const [quizState, setQuizState] = React.useState<QuizState>(new QuizState());
	const [showAlert, setShowAlert] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>();

	const alertError = (error: string) => {
		setErrorMessage(error);
		setShowAlert(true);
	}

	return (
		<>
			<CssBaseline />
			<JniAppBar />
			<RenderSwitch render={showAlert}>
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					{errorMessage}
				</Alert>
			</RenderSwitch>
			<main>
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
		</>
	)
}

export default App
