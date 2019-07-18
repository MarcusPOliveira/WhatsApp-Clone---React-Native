import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppActions';

class AdicionarContato extends Component {

    renderAdicionarContato() {
        if (!this.props.cadastro_resultado_inclusao) { //false (forma na qual a variável de estado se inicia)
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.vwInput}>
                        <TextInput 
                            placeholder='E-mail'
                            style={styles.inputEmail}
                            onChangeText={ (texto) => this.props.modificaAdicionaContatoEmail(texto) }
                            value={this.props.adiciona_contato_email}
                        />
                    </View>
                    <View style={styles.vwBtn}>
                        <Button 
                            title='Adicionar'
                            color='#115E54'
                            onPress={ () => this.props.adicionaContato(this.props.adiciona_contato_email) }
                        />
                        <Text style={styles.txtErro}>
                            { this.props.cadastro_resultado_txt_erro }
                        </Text>
                    </View>   
                </View>
            )
        } else { //true
            return (
                <View>
                    <Text style={{ fontSize: 20 }}> Cadastro realizado com sucesso! </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                { this.renderAdicionarContato() }
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
        cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
        cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
    }
)

export default connect(mapStateToProps, { modificaAdicionaContatoEmail, adicionaContato })(AdicionarContato);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        padding: 20
    },
    vwInput: {
        flex: 1, 
        justifyContent: 'center'
    },
    vwBtn: {
        flex: 1,
    },
    inputEmail: {
        fontSize: 20,
        height: 45,
    },
    txtErro: {
        color: '#FF0000',
        fontSize: 20
    }
})
