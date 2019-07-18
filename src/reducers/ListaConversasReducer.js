//Variáveis de estado da parte de listagem de conversas dentro da aplicação
import { LISTA_CONVERSAS_USUARIO } from '../actions/types';

const INITIAL_STATE = {
    
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LISTA_CONVERSAS_USUARIO:
            return action.payload
        default:
            return state;
    }
}