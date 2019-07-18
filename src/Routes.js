import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#FFF' }}>
        <Stack key='root'>
            <Scene key='formLogin' component={FormLogin} title='Login' hideNavBar={ true }/> 
            <Scene key='formCadastro' component={FormCadastro} title='Cadastro' hideNavBar={ false } back={true} backButtonTintColor='#FFF'/>
            <Scene key='boasVindas' component={BoasVindas} title='Bem-vindo!' hideNavBar={ true }/>
            <Scene key='principal' component={Principal} title='Principal' hideNavBar={ true }/>
            <Scene key='adicionarContato' component={AdicionarContato} title='Adicionar contato' hideNavBar={ false } back={true} backButtonTintColor='#FFF'/>
            <Scene key='conversa' component={Conversa} title='Conversa' hideNavBar={ false } back={true} backButtonTintColor='#FFF'/>
        </Stack>
    </Router>
);
