import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, SafeAreaView, View, FlatList, ActivityIndicator, Dimensions, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userr } from "../auth/auth";
import { productsList, detailProductSelect, addToCart } from "./productsSlice";
import { logout } from "../auth/auth";
import { starting } from "./productsSlice";
import CartOverlay from "./components/CartOverlay";
import DetailsOverlay from "./components/DetailsOverlay";

const Home: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const user = useSelector(userr)
    const products = useSelector(productsList)
    const [overlay, setOverlay] = useState(false)
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        //se valida estado de la sesion del usuario
        if (user.user.uid != "" && user.user.uid != undefined) {
            //usuario logeado
            navigation.navigate("home")
        } else {
            if (user.user.uid == "" || user.user.uid == undefined) {
                //usuario no logueado
                navigation.navigate("login")
            }
        }
    }, [user])

    useEffect(() => {
        //se carga la lista de productos
        dispatch(starting())
    }, [])

    return <SafeAreaView style={styles.container}>
        <Text>
            {'Bienvenido ' + user.user.email}
        </Text>
        <View>
            {products.products.productsList.length > 0 ? (
                <FlatList
                    style={styles.flatListStyle}
                    data={products.products.productsList}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={(item) => <TouchableOpacity key={item.index} onPress={() => {
                        //se habilita la seleccion de un card para ver detalles de producto
                        dispatch(detailProductSelect(item.item.id))
                        setOverlay(true)
                    }} style={styles.cart}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.item.image }} style={styles.image} />
                        </View>
                        <Text numberOfLines={1} style={styles.itemName}>{item.item.name}</Text>
                        <Text numberOfLines={1} style={styles.itemPrice}>{"Precio: "}
                            <Text style={styles.price}>
                                {" $" + item.item.unit_price}
                            </Text>
                        </Text>

                        <View style={styles.stockContainer}>
                            <Text style={styles.textStock}>
                                {item.item.stock}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            //se agrega al carrito el producto con una cantidad preseleccionada de 1
                            dispatch(addToCart({
                                id: item.item.id,
                                name: item.item.name,
                                quantity: 1,
                                stock: item.item.stock,
                                image: item.item.image,
                                unit_price: item.item.unit_price
                            }))
                        }} style={styles.addCart}>
                            <Text style={styles.textAddCArt}>
                                {'Agregar al carrito'}
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>}
                />

            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            {/* Modal de carrito de compras */}
            <CartOverlay products={products} />
            {/* Modal de detalles de producto */}
            <DetailsOverlay
                overlay={overlay}
                products={products}
                quantity={quantity}
                setOverlay={setOverlay}
                setQuantity={setQuantity}
            />

        </View>
        <TouchableOpacity onPress={() => {
            //el usuario se desloguea
            dispatch(logout())
        }} style={styles.logoutButton}>
            <Text style={styles.logoutText}>
                {'Salir'}
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    flatListStyle: {
        width: Dimensions.get('window').width * 0.95,
        maxHeight: Dimensions.get("window").height * 0.8,
        marginTop: 15,
    },
    cart: {
        flex: 0.5,
        margin: 5,
        backgroundColor: '#E9E4E4',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center'
    },
    imageContainer: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'center',
        width: '90%',
        height: 80
    },
    itemName: {
        color: 'black',
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    itemPrice: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
    price: {
        color: 'gray',
        fontWeight: 'normal'
    },
    stockContainer: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'white',
        height: 25,
        paddingHorizontal: 7,
        backgroundColor: '#3A9CEE',
        borderRadius: 20,
        alignSelf: "flex-end",
        marginRight: 20
    },
    textStock: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    addCart: {
        backgroundColor: '#8A20CE',
        marginVertical: 10,
        paddingHorizontal: 15,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center'
    },
    textAddCArt: {
        color: 'white',
        fontWeight: 'bold'
    },
    loaderContainer: {
        height: 50,
        justifyContent: 'center'
    },
    logoutButton: {
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 5,
        backgroundColor: '#ff2537',
        marginTop: 15
    },
    logoutText: {
        color: 'white',
        fontSize: 15
    }
});

export default Home