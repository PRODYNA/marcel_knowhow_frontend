import { Box, Link, Typography } from '@mui/material';

function Footer() {
	return (
			<Box sx={{ bgcolor: '#1976d2', p: 1, position: 'fixed', bottom: 0, width: '100%', color: '#fff' }}>
			<Typography variant="body1" align="center">
			Further details in the <Link href="https://github.com/PRODYNA/marcel_knowhow_main" color="inherit" target="_blank" rel="noopener">GitHub Repository</Link>
			</Typography>
		</Box>
	);
}

export default Footer;