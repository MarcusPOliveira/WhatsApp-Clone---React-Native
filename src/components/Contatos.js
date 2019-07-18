import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { contatosUsuarioFetch } from '../actions/AppActions';
import { Actions } from 'react-native-router-flux';


class Contatos extends Component {

    componentWillMount() {
        this.props.contatosUsuarioFetch();
        this.criaFonteDeDados(this.props.contatos);
    }

    componentWillReceiveProps(nextProps) { //executado a partir das mudanças de propriedades enviadas pelo componente
        this.criaFonteDeDados(nextProps.contatos); //quando a Action é disparada, retornando dados para o app, recupera os dados e cria o dataSource, encaminhando o novo array
    }

    criaFonteDeDados(contatos) { //implementar DataSource
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { //nova instância do DataSource do ListView --> análise necessária q o DataSource faz para saber se é uma linha nova ou não
            r1 !== r2 //verifica se o 1º registro é diferente do 2º --> se for, ds promove uma atualização da linha no ListView
        }});
        this.fonteDeDados = ds.cloneWithRows(contatos); //guardando registros no DataSource
    }

    renderRow(contato) {
        return (
            //Encaminhando parametros de Contatos.js (pelo Touchable) para Conversa.js
            <TouchableHighlight onPress={ () => Actions.conversa({title: contato.nome, contatoNome: contato.nome, contatoEmail: contato.email}) } underlayColor='#FFF'>
                <View style={styles.itemLista}>
                    <Text style={styles.nomeContato}>{contato.nome}</Text>
                    <Text style={styles.emailContato}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections //remove o alerta
                dataSource={this.fonteDeDados}
                renderRow={ this.renderRow } // (data) => this.renderRow(data)
            />
        )
    }
}

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => { //mapeamento (array) dos objetos
        return  {
            ...val,
            uid
        }
    })
    return {
        contatos: contatos //chave-valor pode ser reduzido
    }
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);

const styles = StyleSheet.create({
    itemLista: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CCC'
    },
    nomeContato: {
        fontSize: 25
    },
    emailContato: {
        fontSize: 18
    }
})
