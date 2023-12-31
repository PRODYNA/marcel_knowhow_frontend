import { Typography, AppBar, Toolbar, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const JniAppBar = () => {
	return (
		<>
			<AppBar position="relative" style={{ cursor: 'default'}}>
				<Toolbar>
					<Box 
						display="flex" 
						justifyContent="space-between" 
						alignItems="center"
						width="100%"
					>
						<Box display="flex">
							<MenuBookIcon style={{ paddingRight: '3px'}}/>
							<Typography variant="h6">
								Marcel Knowhow Session
							</Typography>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default JniAppBar
