import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'
import { Stack, TextInput } from "@react-native-material/core";


const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const validatePassword = (password) => {
        if (password.length < 8) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres')
            return false
        }
        if (!/[A-Z]/.test(password)) {
            Alert.alert('Error', 'La contraseña debe contener al menos una mayúscula')
            return false
        }
        if (!/[!@#$%^&*]/.test(password)) {
            Alert.alert('Error', 'La contraseña debe contener al menos un caracter especial')
            return false
        }
        return true
    }

    const registerUser = async (email, password, firstName, lastName) => {
        if (!validatePassword(password)) {
            return
        }

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'realplaza-95f2f.firebaseapp.com',
                })
                    .then(() => {
                        alert('Verification email sent')
                    }).catch((error) => {
                        alert(error.message)
                    })
                    .then(() => {
                        firebase.firestore().collection('users')
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                firstName,
                                lastName,
                                email,
                            })
                    }).catch((error) => {
                        alert(error.message)
                    })
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 36, color: '#7300e0' }}>Registrarme</Text>
            <View style={{ marginTop: 40 }}>

                <Text style={{ fontWeight: '700', fontSize: 15, color: '#7300e0' }}>Nombre</Text>
                <TextInput
                    onChangeText={(firstName) => setFirstName(firstName)}
                    variant="standard"
                    style={{ margin: 1, width: 250 }}
                />
                <Text style={{ fontWeight: '700', fontSize: 15, color: '#7300e0' }}>Apellido</Text>
                <TextInput
                    onChangeText={(lastName) => setLastName(lastName)}
                    variant="standard"
                    style={{ margin: 1, width: 250 }}
                />
                <Text style={{ fontWeight: '700', fontSize: 15, color: '#7300e0' }}>Email</Text>
                <TextInput
                    onChangeText={(email) => setEmail(email)}
                    variant="standard"
                    style={{ margin: 1, width: 250 }}
                />
                <Text style={{ fontWeight: '700', fontSize: 15, color: '#7300e0' }}>Contraseña</Text>
                

            </View>
            <View>
            <TextInput
                    onChangeText={(password) => setPassword(password)}
                    variant="standard"
                    secureTextEntry={true}
                    style={{ margin: 1, width: 250 }}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={styles.button}
            >
                <Text style={{ fontWeight: '700', fontSize: 22, color: '#fff' }}>Registrar</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        marginTop: 50,
        height: 50,
        width: 250,
        backgroundColor: '#7300e0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
})