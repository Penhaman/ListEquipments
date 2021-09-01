import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MenuAdmin from '../../../components/menu-public';
import Footer from '../../../components/footer-admin';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api';

import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import {getStatus,getStatusLabel} from '../../../functions/static_data'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
 
}));


export default function EquipmentsClient() {
  const classes = useStyles();

  const [equips, setEquips] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() =>{
    async function loadEquips(){
      const response = await api.get("/api/equips/");
      setEquips(response.data)
      setLoading(false);
    }
    loadEquips();
  },[]);
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'EQUIPAMENTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Paper className={classes.paper}>
                <h2>Lista de Equipamentos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    {loading?(<LinearProgress style={{width:'60%', margin:'20px auto'}}  />):(
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Marca</TableCell>
                          <TableCell align="center">Modelo</TableCell>
                          <TableCell align="center">Cliente</TableCell>
                          <TableCell align="center">Quantidade</TableCell>
                          <TableCell align="center">Observações</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Vendedor</TableCell>
                          <TableCell align="center">Data de Registo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {equips.map((row) => (
                          <TableRow key={row._id}  style={row.status==3 ? {backgroundColor: '#C2F784'} : {}}>
                            <TableCell align="center">{row.brand}</TableCell>
                            <TableCell component="th" scope="row">
                              {row.model}
                            </TableCell>
                            <TableCell align="center">{row.client}</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.observations}</TableCell>
                            <TableCell align="center"><Chip label={getStatus(row.status)} color={getStatusLabel(row.status)} style={row.status==3 ? {backgroundColor:'green'} : {}}/></TableCell>
                            <TableCell align="center">{row.salesman}</TableCell>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-pt')}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>)}
                  </TableContainer>
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