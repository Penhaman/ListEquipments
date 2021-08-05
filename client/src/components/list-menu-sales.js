import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { getToken, logout } from "../services/auth";
import api from "../services/api";

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/sales/equipments" >
      <ListItemIcon>
        <SettingsApplicationsIcon />
      </ListItemIcon>
      <ListItemText primary="Equipamentos" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={confirmExit}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmExit(){
  if(window.confirm("Deseja fazer logout?")){
    const response = await api.get("/api/users/destroytoken",{headers:{token: getToken()}});
    if(response.status===200){
      logout();
      window.location.href = '/'
    }else{
      alert("Erro de logout!");
    }
  }
}