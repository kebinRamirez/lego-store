import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, SafeAreaView, Dimensions, TextInput, Alert, StyleSheet } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { login } from "./auth";
import { userr } from "../auth/auth";

const Login: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const user = useSelector(userr)
    const isDarkMode = user.user.isDark
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [vali, setVali] = useState(true)

    const ValidateEmail = () => {
        if (email == "") {
            return true
        } else {
            //se valida que el email ingresado sea valido
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const result: boolean = expression.test(email); // true

            return result
        }
    }

    const handleLogin = () => {
        if (email != "" && password != "" && ValidateEmail()) {
            //funcion de logueo con email y contraseña de firebase
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    //se reinician variables que manejan los inputs
                    setEmail("")
                    setPassword("")
                    //se guardan variables de usuarios en estados del reducer
                    dispatch(login({
                        uid: response.user.uid,
                        email: response.user.email,
                        isDark: false
                    }))
                })
                .catch((error: any) => {
                    //manejo de errores
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert("El correo electronico ya se encuentra en uso")
                    }
                    if(error.code ==='auth/user-not-found'){
                        Alert.alert("No se encontró el usuario")
                    }
                    if(error.code === 'auth/wrong-password'){
                        Alert.alert("Contraseña incorrecta")
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert("Correo Electronico invalido")
                    }
                });
        } else {
            Alert.alert("Debe digitar todos los campos de manera correcta")
        }
    }

    useEffect(() => {
        //validacion de estado de la sesion
        if (user.user.uid != "" && user.user.uid!=undefined) {
            //usuario logueado
            navigation.navigate("home")
        } else {
            if (user.user.uid == "" || user.user.uid==undefined) {
                //usuario no logueado
                navigation.navigate("login")
            }
        }
    }, [user])

    useEffect(() => {
        //se valida el email cada que cambia
        setVali(!ValidateEmail())
    }, [email])

    return <>
        <SafeAreaView style={backgroundStyle}>
            <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white', }]}>
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
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('register')
                    }} style={styles.buttonRegister}>
                        <Text style={styles.buttonText}>
                            {"Registrarme"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handleLogin()
                    }} style={styles.loginButton}>
                        <Text style={styles.buttonText}>
                            {"Entrar"}
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
    buttonRegister: {
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
    loginButton: {
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

export default Login