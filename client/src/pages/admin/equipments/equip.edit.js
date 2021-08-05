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

export default function EquipEdit() {
  const classes = useStyles();
  const [brand , setBrand] = useState('');
  const [model , setModel] = useState('');
  const [client , setClient] = useState('');
  const [quantity , setQuantity] = useState('');
  const [observations , setObservations] = useState('');
  const [status , setStatus] = useState('');
  const { idEquip } = useParams();

  useEffect(() => {
    async function getEquip(){
      var response = await api.get('/api/equips.details/'+idEquip);
      setBrand(response.data.brand);
      setModel(response.data.model);
      setClient(response.data.client);
      setQuantity(response.data.quantity);
      setObservations(response.data.observations);
      setStatus(response.data.status);
    }
    
    getEquip();
  },[]);

  async function handleSubmit(){

    const data = {
      brand: brand,
      model: model,
      client: client,
      quantity:quantity,
      observations:observations,
      status:status,
      _id:idEquip}

      if(brand!=='' && model!=='' && client!=='' && quantity!==''&& status!==''){
        const response = await api.put('/api/equips/',data);

        if(response.status===200){
          window.location.href='/admin/equipments/'
        }else{
          alert('Erro a atualizar o equipamento!');
        }
      }else{
        alert('Por favor preencher campos obrigatórios!');
      }

     

  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'EQUIPAMENTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10,marginRight:5}} variant="contained" href={'/admin/equipments'}><ArrowBackIcon /> Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Editar Equipamento</h2>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <TextField
                      id="brand"
                      name="brand"
                      label="Marca"
                      fullWidth
                      disabled
                      autoComplete="brand"
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="model"
                      name="model"
                      label="Modelo"
                      fullWidth
                      disabled
                      autoComplete="model"
                      value={model}
                      onChange={e => setModel(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="client"
                      name="client"
                      label="Cliente"
                      fullWidth
                      autoComplete="client"
                      value={client}
                      onChange={e => setClient(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="quantity"
                      type="number"
                      name="quantity"
                      label="Quantidade"
                      fullWidth
                      autoComplete="quantity"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      id="observations"
                      name="observations"
                      label="Observações"
                      fullWidth
                      autoComplete="observations"
                      value={observations}
                      onChange={e => setObservations(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="labelStatus">Status</InputLabel>
                    <Select
                      labelId="labelStatus"
                      id="status"
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                    >
                      <MenuItem value={1}>Pendente</MenuItem>
                      <MenuItem value={2}>Em Progresso</MenuItem>
                      <MenuItem value={3}>Completo</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained"  onClick={handleSubmit} className={classes.btnSuccess}>
                    <SaveIcon /> Guardar
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