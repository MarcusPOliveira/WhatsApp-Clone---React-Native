import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash'; //lib usada para converter JSON em Array

import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSAS_USUARIO } from './types';

//Adição de contatos
export const modificaAdicionaContatoEmail = texto => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL, 
        payload: texto
    }
}

export const adicionaContato = email => {
    
    return dispatch => {

        let emailB64 = b64.encode(email);
        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value') //atualizações não serão "escutadas" --> checkagem vai ocorrer só uma vez, na execução da função
            //value --> recupera o snapshot (acesso aos dados de determinado path no Firebase Database)
            .then(snapshot => { //função de callback explorando o snapshot
                if (snapshot.val()) { //retorna oq está dentro do path
                    const dadosUsuario = _.first(_.values(snapshot.val())); //função q retorna um Array com base nos valores de um objeto
                    //recuperando o usuario logado
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);
                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email, nome: dadosUsuario.nome })
                        .then(() =>  adicionaContatoSucesso(dispatch)) //renderização condicional
                        .catch(erro => adicionaContatoErro(erro.message, dispatch))
                } else {
                    dispatch(
                        {
                            type: ADICIONA_CONTATO_ERRO,
                            payload: 'Email informado não corresponde a um usuário válido!'
                        }
                    )
                }
            })
    }
}

const adicionaContatoSucesso = (dispatch) => (
    dispatch(
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true
        }
    )
)

const adicionaContatoErro = (erro, dispatch) => (
    dispatch(
        {
            type: ADICIONA_CONTATO_ERRO,
            payload: erro //erro direcionado pelo Firebase
        }
    )
)

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)

//Listagem de contatos
export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode( currentUser.email );
        firebase.database().ref(`usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => { //escuta as alterações --> vai possibilitar a inserção de novos contatos sem a necessidade de recarregar o app
                dispatch({ 
                    type: LISTA_CONTATO_USUARIO,
                    payload: snapshot.val()
                })
            }) 
    }
}

//Troca de mensagens
export const modificaMensagem = texto => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto
    })
}

/*
    Armazenamento de mensagens -> e (envio) ou r (recebimento)
        mensagens/usuarioEmail/contatoEmail
        mensagens/contatoEmail/usuarioEmail
*/

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
    //dados do usuario autenticado (email)
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    //dados do contato (contatoNome, contatoEmail)

    return (dispatch) => { //função de cb -> interceptando o return com o Redux Thunk (assíncrona)
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, tipo: 'r' })
                    .then(() => dispatch ({ type: ENVIA_MENSAGEM_SUCESSO }))
            })
            .then(() => { //armazenamento dos cabeçalhos (usuario_conversas)
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail }) //set -> verifica se existe o registro dentro do path. Se houver igual, sobrepõe o registro
            })
            .then(() => { //armazenamento dos cabeçalhos (contato_conversas)
                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {
                        const dadosUsuario = _.first(_.values(snapshot.val())); //convertendo values do snapshot em Array para extrair o nome do usuario autenticado
                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ nome: dadosUsuario.nome, email: usuarioEmail }) //nome e email aqui são do usuario autenticado
                        
                    })
            })
    }
}

//Listagem de conversas (mensagens)
export const conversaUsuarioFetch = contatoEmail => { //Função que "junta" o contatoEmail + usuarioEmail para compôr o path de onde as mensagens vão ser recuperadas
    //emails na b64
    const { currentUser } = firebase.auth();
    let usuarioEmailB64 = b64.encode(currentUser.email);
    let contatoEmailB64 = b64.encode(contatoEmail);

    return (dispatch) => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot => { //on -> escutando alterações no path para recuperar as mensagens contidas no mesmo
                dispatch ({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })
    }
}

//Listagem de conversas (Lista)
export const conversasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let usuarioEmailB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot => {
                dispatch ({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() })
            })
    }
}
