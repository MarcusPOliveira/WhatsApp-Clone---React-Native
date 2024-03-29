import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import { conversasUsuarioFetch } from '../actions/AppActions';

class Conversas extends Component {
    
    componentWillMount() {
        this.props.conversasUsuarioFetch();
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas);
    }

    criaFonteDeDados(conversas) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(conversas);
    }

    renderRow(conversa) {
        return (
            <TouchableHighlight 
                underlayColor='#FFF'
                onPress={() => Actions.conversa(
                    { title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email }
                )}
            >
                <View style={styles.listaConversas}>
                    <Text style={styles.txtNome}> { conversa.nome } </Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        )
    }
}

mapStateToProps = (state) => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return {
            ...val, uid
        }
    });

    return {
        conversas
    }
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas)

const styles = StyleSheet.create({
    listaConversas: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CCC'
    },
    txtNome: {
        fontSize: 25,
    }
})
