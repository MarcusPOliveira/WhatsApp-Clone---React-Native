import React, { Component } from 'react';
import Routes from './Routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import ReduxThunk from 'redux-thunk';

class App extends Component {

    initializeFirebase() {
        const firebase = require('firebase');

        var config = {
            apiKey: "AIzaSyC5Sdm6dxjhIvb0s0T4FKSKjMb6bxhrDU0",
            authDomain: "whatsapp-clone-a8c75.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-a8c75.firebaseio.com",
            projectId: "whatsapp-clone-a8c75",
            storageBucket: "whatsapp-clone-a8c75.appspot.com",
            messagingSenderId: "470616805552"
        };
        firebase.initializeApp(config);
    }

    componentDidMount() {
        this.initializeFirebase();
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }
}

export default App;