import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function UsersEdit() {
  const classes = useStyles();

  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [user_lvl , setUserLvl] = useState('');

  const { idUser } = useParams();


  useEffect(() => {
    async function getUser(){
      var response = await api.get('/api/users.details/'+idUser);
      
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setUserLvl(response.data.user_lvl);
    }

    getUser();
  },[])

  async function handleSubmit(){

    const data = {
      username:username,
      email:email,
      password:password,
      user_lvl:user_lvl,
    _id:idUser}

      if(username!==''&&email!==''&&password!==''&&user_lvl!==''){
        const response = await api.put('/api/users/',data);

        if(response.status===200){
          window.location.href='/admin/users'
        }else{
          alert('Error updating the user!');
        }
      }else{
        alert('Please fill in every blank!');
      }

     

  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'USERS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10,marginRight:5}} variant="contained" href={'/admin/users'}><ArrowBackIcon /> Back</Button>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/users/register'}>
              <AddIcon />
              Register
            </Button>
              <Paper className={classes.paper}>
                <h2>Users Update</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="username"
                      name="username"
                      label="Name"
                      fullWidth
                      autoComplete="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                
                  <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="labelUserLvl">Level</InputLabel>
                    <Select
                      labelId="labelUserLvl"
                      id="user_lvl"
                      value={user_lvl}
                      onChange={e => setUserLvl(e.target.value)}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Manager</MenuItem>
                      <MenuItem value={3}>Public</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="password"
                      name="password"
                      label="Password"
                      fullWidth
                      autoComplete="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained"  onClick={handleSubmit} className={classes.btnSuccess}>
                    <SaveIcon /> Save
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}