import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screens/privates/Home';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import { cartChangeStateofActivation } from "../screens/privates/productsSlice";
import { User } from "../screens/auth/auth";
import { login, dark } from "../screens/auth/auth";
import { userr } from "../screens/auth/auth";
import { Text } from "react-native-elements";

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
    const [charged, setCharged] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(userr);

    const storeData = async (value: User, key: string) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    //saving user
    useEffect(() => {
        if (charged) {
            storeData(user.user, '@storage_Key_user')
        }
    }, [user])

    //recovering stored data
    useEffect(() => {
        if (!charged) {
            // getting tasks date
            const t = getData('@storage_Key_user')
            // setting data in the states

            t.then(result => {
                if(result!=null){
                    dispatch(login(result))
                }
            })
            setCharged(true)
        }
    })

    return <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name="home" component={Home} options={{ title: 'Store', headerLeft:()=>(<></>), headerRight:()=>(<TouchableOpacity onPress={()=>{dispatch(cartChangeStateofActivation(true))}}>
                <Text style={styles.textButtonCart}>
                    {'Carrito'}
                </Text>
            </TouchableOpacity>) }} />
            <Stack.Screen name="login" component={Login} options={{
                title: 'Inicio', headerRight: () => (<Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={user.user.isDark ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>{
                        dispatch(dark())
                    }}
                    value={user.user.isDark}
                />)
            }} />
            <Stack.Screen name="register" component={Register} options={{ title: 'Registro' }} />
        </Stack.Navigator>
    </NavigationContainer>
}

const styles = StyleSheet.create({
    headerIcon: {
        color: 'black',
        marginRight: 25
    },
    textStyle: {
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: 10
    },
    textButtonCart: {
        color:'#4CD381', 
        fontSize: 20, 
        fontWeight:'bold'
    }
});

export default AppNavigator