import { 
    MODIFICA_EMAIL,
    MODIFICA_SENHA, 
    MODIFICA_NOME, 
    CADASTRO_USUARIO_SUCESSO, 
    CADASTRO_USUARIO_ERRO, 
    LOGIN_USUARIO_SUCESSO, 
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO } from '../actions/types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    erroLogin: '',
    loading_login: false,
    loading_cadastro: false,
}

export default (state = INITIAL_STATE, action) => {
    //evoluindo o state
    //console.log(action);
    switch (action.type) {
        case MODIFICA_EMAIL:
            return {
                ...state, //clonando o state anterior e o modificando
                email: action.payload //modificação no campo agora é aceita
            }
        case MODIFICA_SENHA:
            return {
                ...state, //clonando o state anterior e o modificando
                senha: action.payload //modificação no campo agora é aceita
            }
        case MODIFICA_NOME:
            return {
                ...state, //clonando o state anterior e o modificando
                nome: action.payload //modificação no campo agora é aceita
            }
        case CADASTRO_USUARIO_ERRO:
            return {
                ...state, //recupera o estado atual, e altera o valor da variável erroCadastro com o payload (msg de erro)
                erroCadastro: action.payload, //exibe msg de erro
                loading_cadastro: false //renderiza novamente o btnLogin
            }
        case CADASTRO_USUARIO_SUCESSO:
            return {
                ...state,
                nome: '',
                senha: ''
            }
        case LOGIN_USUARIO_SUCESSO:
            return {
                ...state,
                ...INITIAL_STATE //valores iniciais das variaveis de estado
            }
        case LOGIN_USUARIO_ERRO:
            return {
                ...state,
                erroLogin: action.payload, //exibe msg de erro
                loading_login: false //renderiza novamente o btnLogin
            }
        case LOGIN_EM_ANDAMENTO:
            return { 
                ...state,
                loading_login: true //quando o dispatch é disparado (btn Login pressionado), loading_login é evoluído para true
            }
        case CADASTRO_EM_ANDAMENTO:
            return { 
                ...state,
                loading_cadastro: true //quando o dispatch é disparado (btn Cadastro pressionado), loading_cadastro é evoluído para true
            }
        default:
            return state;    
    }    
}
