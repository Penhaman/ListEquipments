import React from 'react';

import {  BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Produtos from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar'

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersRegister from './pages/admin/users/users.register'

// IMPORTS CLIENT
import ProdutoDetails from './pages/client/produtos/produtos.details';
import Login from './pages/admin/login';

import PrivateRoute from './services/wAuth';

export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <Route path="/" exact component={Login} />
                <Route path="/produtos/:idProduto" exact component={ProdutoDetails} />

                {/* Rota Admin */}
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute path="/admin" exact component={Dashboard} />
                
                <PrivateRoute path="/admin/produtos" exact component={Produtos} />
                <PrivateRoute path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar} />
                <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar} />

                <PrivateRoute path="/admin/users" exact component={Users} />
                <PrivateRoute path="/admin/users/register" exact component={UsersRegister} />
                <PrivateRoute path="/admin/users/edit/:idUser" exact component={UsersEdit} />

            </Switch>
        </BrowserRouter>
    )
}