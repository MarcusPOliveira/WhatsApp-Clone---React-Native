//actions q gerenciam os states da aplicação
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import { 
    MODIFICA_EMAIL,
    MODIFICA_SENHA, 
    MODIFICA_NOME, 
    CADASTRO_USUARIO_SUCESSO, 
    CADASTRO_USUARIO_ERRO, 
    LOGIN_USUARIO_SUCESSO, 
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO } from './types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto,        
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modficaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

//Cadastro
export const cadastraUsuario = ({ nome, email, senha }) => { //processamento assíncrono -> 1º: Return, 2º: função createUserWithEmailAndPassword
    return dispatch => {

        dispatch({ type: CADASTRO_EM_ANDAMENTO });

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                //convertendo email para base64
                let emailB64 = b64.encode(email);
                firebase.database().ref(`/contatos/${emailB64}`)  //chave de obj JSON no database
                    .push({ nome }) //dados a serem inseridos 
                    .then(value => cadastroUsuarioSucesso(dispatch)); //função de callback -> objeto que contenha os dados do user recém-cadastrado                
            })
            .catch(erro => cadastroUsuarioErro(erro, dispatch)); //retorno de erro    
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch (
        {
            type: CADASTRO_USUARIO_SUCESSO
        }
    )
    Actions.boasVindas(); //key da scene a ser encaminhada
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch (
        {
            type: CADASTRO_USUARIO_ERRO,
            payload: erro.message
        }
    )
}

//Login
export const autenticarUsuario = ({ email, senha }) => {
    return dispatch => { //dispatches acontecerão de forma sequencial

        dispatch({ type: LOGIN_EM_ANDAMENTO });

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch))
            .catch(erro => loginUsuarioErro(erro, dispatch));
    }
}

const loginUsuarioSucesso = (dispatch) => {
    dispatch (
        {
            type: LOGIN_USUARIO_SUCESSO
        }    
    )
    Actions.principal(); //key da scene a ser encaminhada
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch (
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.message
        }
    )
}
