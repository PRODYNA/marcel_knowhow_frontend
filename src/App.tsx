import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Container, Typography, CssBaseline, Grid, Button, } from '@mui/material';
import JniAppBar from './components/JniAppBar';


const App = () => {
	return (
		<>
			<CssBaseline />
			<JniAppBar />
			<main>
				<div>
					<Container maxWidth="sm">
						<Typography variant="h2" align="center" color="textPrimary" gutterBottom>
							Ja oder Nein?
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							Hier wird in irgendeiner Form eine Frage gestellt, die mit Ja oder Nein
							beantwortet werden kann. 
							Mit den folgenden Buttons erfolgt die Beantwortung.
						</Typography>

						<div>
							<Grid container spacing={2} justifyContent="center">
								<Grid item>
									<Button variant="contained" color="primary">
										Ja
									</Button>
								</Grid>
								<Grid item>
									<Button variant="outlined" color="primary">
										Nein
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
			</main>
		</>
	)
}

export default App
