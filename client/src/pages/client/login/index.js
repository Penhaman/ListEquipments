import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../../services/api';

import {setUsername, login, setIdUser, getUserLvl, setUserLvl } from '../../../services/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/jo%C3%A3o-pereira-11496872/">
        João Pereira
        {' '}
      </Link>
      {new Date().getFullYear()}
      
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(){
        
        await api.post('/api/users/login',{email,password})
        .then(res => {
            if(res.status===200){
                if(res.data.status===1){
                    login(res.data.token);
                    setIdUser(res.data.id_user);
                    setUsername(res.data.username);
                    setUserLvl(res.data.user_lvl);
                    if(res.data.user_lvl == '1') {
                      window.location.href= '/admin/equipments'
                    } else {
                      window.location.href= '/sales/equipments'
                    }
                    
                }else if(res.data.status===2){
                    alert('Attention: '+res.data.error);
                }
                setLoading(false);
            }else{
                alert('Server Error!');
                setLoading(false);
            }
        })
    }
    
    function loadSubmit(){
      setLoading(true);
      setTimeout(
        () => handleSubmit(),
        2000
      )
    }

  return (
    <form>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />


          <FormControl variant="outlined" style={{width:'100%',marginTop:10}}>
            <InputLabel htmlFor="campoSenha">Password</InputLabel>
            <OutlinedInput
              id="passwordField"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={e => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={120}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loadSubmit}
            disabled={loading}
          >
            {loading?<CircularProgress />:"LOGIN"}
          </Button>
          
          
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </form>
  );
}