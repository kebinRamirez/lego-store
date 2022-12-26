import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, SafeAreaView, useColorScheme, Dimensions, TextInput, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import { Overlay } from "react-native-elements";

const Register: React.FC = ({ navigation }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [vali, setVali] = useState(true)
    const [charging, setCharging] = useState(false)

    const ValidateEmail = () => {
        if (email == "") {
            return true
        } else {
            //validacion del email
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const result: boolean = expression.test(email); // true

            return result
        }
    }

    const handleRegister = () => {
        if (email != "" && password != "" && confirmPassword != "" && ValidateEmail()) {
            if (confirmPassword == password) {
                setCharging(true)
                //creacion de usaurio con correo y contraseña proporcionado por firebase
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        Alert.alert("Cuenta creada Correctamente")
                        //se reinician inputs
                        setEmail("")
                        setPassword("")
                        setConfirmPassword("")
                        //se redirige al login para hacer el inicio de sesion del usuario
                        navigation.navigate('login')
                    })
                    .catch((error: any) => {
                        //manejo de errores
                        if (error.code === 'auth/email-already-in-use') {
                            Alert.alert("El correo electronico ya se encuentra en uso")
                        }

                        if (error.code === 'auth/invalid-email') {
                            Alert.alert("Correo Electronico invalido")
                        }

                        console.error(error);
                    });
            } else {
                Alert.alert("Las contraseñas no coinciden")
            }
        } else {
            Alert.alert("Debe digitar todos los campos de manera correcta")
        }
    }

    useEffect(() => {
        //validacion del email cada que cambia
        setVali(!ValidateEmail())
    }, [email])

    return <>
        <SafeAreaView style={backgroundStyle}>
            <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white', }]}>
                <Overlay isVisible={charging} >
                    <View style={{ width: Dimensions.get("window").width * 0.95 }}>
                        <View style={{ height: 150, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    </View>
                </Overlay>
                <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black', }]}>{"Lego Store"} </Text>
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? 'white' : 'black', }]}>
                        {"Correo:"}
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder='Escribe el correo'
                    value={email}
                />
                <View style={styles.labelContainer}>
                    {vali && <Text style={styles.valid}>{"Email invalido"}</Text>}
                </View>
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? 'white' : 'black', }]}>
                        {"Contraseña:"}
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder='Escribe la contraseña'
                    value={password}
                />
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, { color: isDarkMode ? 'white' : 'black', }]}>
                        {"Confirmar Contraseña:"}
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    placeholder='Escribe la contraseña'
                    value={confirmPassword}
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('login')
                    }} style={styles.buttonCancel}>
                        <Text style={styles.buttonText}>
                            {"Cancelar"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handleRegister()
                    }} style={styles.registerButton}>
                        <Text style={styles.buttonText}>
                            {"Registrarme"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    </>
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get('window').width,
        marginTop: -60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 32
    },
    labelContainer: {
        width: '90%'
    },
    label: {
        fontSize: 18,
        marginTop: 15
    },
    input: {
        width: '90%',
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 15
    },
    buttonCancel: {
        backgroundColor: '#ff2537',
        marginRight: 5,
        flex: 1,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 15
    },
    registerButton: {
        backgroundColor: '#00d168',
        marginLeft: 5,
        flex: 1,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    valid: {
        color: 'red',
        fontSize: 13,
        marginTop: -8
    }

});

export default Register