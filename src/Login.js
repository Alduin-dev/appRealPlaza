import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import { Stack, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            alert('Usuario no encontrado, verifique sus datos.')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: '700', fontSize:26, color: '#7300e0'}}>
                Iniciar Sesión
            </Text>
            
            <View style={{marginTop:40}}>
                <Text style={{fontWeight: '700', fontSize:15, color: '#7300e0'}}>Correo Electrónico</Text>
                <TextInput 
                    onChangeText={(email) => setEmail(email)}
                    variant="standard"
                    style={{ margin: 1, width:250 }}
                />
                <Text style={{fontWeight: '700', fontSize:15, color: '#7300e0'}}>Contraseña</Text>
                <TextInput 
                    onChangeText={(password) => setPassword(password)}
                    variant="standard"
                    secureTextEntry={true}
                    style={{ margin: 1, width:250 }}
                />
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight:'700', fontSize: 18, color: '#fff'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'700', fontSize: 12}}>¿Aún no tienes una cuenta? Regístrate aquí.</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop: 30,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
    },
    button: {
        marginTop:30,
        height: 50,
        width: 250,
        backgroundColor: '#7300e0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
})