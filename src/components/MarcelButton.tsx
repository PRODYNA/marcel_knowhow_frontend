import { Button, Backdrop, CircularProgress} from '@mui/material';
import React from 'react';


type ServerResponse = {
	Hello: string
}

const MarcelButton = () => {

	const [marcelValue, setMarcelValue] = React.useState<string>("Marcel not loaded");
	const [showBackdrop, setShowBackdrop] = React.useState<boolean>(false);

	const requestMarcelValue = async () => {
		console.log(`Current Marcel value: "${marcelValue}"`);
		let newValue = "<no response";
		try {
			setShowBackdrop(true);
			const respone = await fetch('https://marcel-knowhow-backend3.mangowater-dae365c4.westus2.azurecontainerapps.io');
			const json: unknown = await respone.json();
			const serverResponse = json as ServerResponse;
			const value = serverResponse.Hello;
			newValue = `Loaded: "${value}"`;
		}
		catch (error) {
			const errMessage = `Error calling server: ${error}`;
			console.error(errMessage);
			console.trace();
			newValue = errMessage;
		}
		setShowBackdrop(false);
		setMarcelValue(newValue);
	}


	return (
		<>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={showBackdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Button 
				variant="contained"
				onClick={() => requestMarcelValue()}
			>
				{marcelValue}
			</Button>
		</>
	)
}

export default MarcelButton
