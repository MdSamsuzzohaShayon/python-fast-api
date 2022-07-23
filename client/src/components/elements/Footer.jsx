import useStyles from '../../styles/Elements.style.js';
import { Box, Container} from '@mui/material';


const Footer = (props) => {
    const classes = useStyles();






    return <Box className={classes.footer_wrapper}>
        <Container maxWidth='xl'>
            Footer
        </Container>
    </Box>;
};

export default Footer;
