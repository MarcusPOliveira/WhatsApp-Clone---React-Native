import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConversasReducer from './ListaConversasReducer';

export default combineReducers({
    AuthReducer: AuthReducer, //chave-valor pode ser omitido
    AppReducer: AppReducer,
    ListaContatosReducer: ListaContatosReducer,
    ListaConversaReducer: ListaConversaReducer,
    ListaConversasReducer: ListaConversasReducer
});

