import React from 'react';

import {  BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


// IMPORTS ADMIN
import Equipments from './pages/admin/equipments';
import EquipEdit from './pages/admin/equipments/equip.edit';
import EquipRegister from './pages/admin/equipments/equip.register'

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersRegister from './pages/admin/users/users.register'

//IMPORTS SALES
import SalesEquipments from './pages/admin/equipments';
import SalesEquipEdit from './pages/admin/equipments/equip.edit';
import SalesEquipRegister from './pages/admin/equipments/equip.register'

// IMPORTS CLIENT
import EquipmentsClient from './pages/client/equipments/equip.details';
import Login from './pages/admin/login';

import PrivateRoute from './services/wAuth';

export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                {/* Route Cliente */}
                <Route path="/" exact component={Login} />
                <Route path="/equipments/:idEquip" exact component={Equipments} />

                {/* Routes de Vendedores */}
                <PrivateRoute path="/sales/equipments" exact component={SalesEquipments} />
                <PrivateRoute path="/sales/equipments/register" exact component={SalesEquipRegister} />
                <PrivateRoute path="/sales/equipments/edit/:idEquip" exact component={SalesEquipEdit} />

                {/* Route Admin */}
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute path="/admin/equipments" exact component={Equipments} />
                <PrivateRoute path="/admin/equipments/register" exact component={EquipRegister} />
                <PrivateRoute path="/admin/equipments/edit/:idEquip" exact component={EquipEdit} />

                <PrivateRoute path="/admin/users" exact component={Users} />
                <PrivateRoute path="/admin/users/register" exact component={UsersRegister} />
                <PrivateRoute path="/admin/users/edit/:idUser" exact component={UsersEdit} />

            </Switch>
        </BrowserRouter>
    )
}