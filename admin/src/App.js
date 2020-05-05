import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {orange, purple} from "@material-ui/core/colors";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const theme2 = createMuiTheme({
    palette: {
        primary: orange,
        secondary: {
            main: '#f44336',
        },
    },
});

function Copyright() {
    return (
       <ThemeProvider theme={theme2}><Typography variant="body2" color="textSecondary" align="center">
           {'Copyright © '}
           <Link color="inherit" href="https://material-ui.com/">
               Bitcamp
           </Link>{' '}
           {new Date().getFullYear()}
           {'.'}
       </Typography></ThemeProvider>

    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    palette: {
        primary:orange,
        secondary: orange
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

export default function SignIn() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Initial Announcement Dashboard
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Write some stuff here"
                        name="announcement"
                        autoFocus
                    />
                    <FormControlLabel
                        control={<Checkbox value="mobileOp" color="primary" />}
                        label="Mobile"
                    />
                    <FormControlLabel
                        control={<Checkbox value="livePg" color="secondary" />}
                        label="Live Page"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
