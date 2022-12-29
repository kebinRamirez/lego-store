import React from "react";
import { Overlay } from "react-native-elements";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { cartChangeStateofActivation, buyCart } from "../productsSlice";
import { buy } from "../../../services/ApiEnpoints";

interface props {
    products: any
}

const CartOverlay: React.FC<props> = ({ products }) => {
    const dispatch = useDispatch()

    const toggleOverlayCart = () => {
        //manejo del estado de apertura del carrito de compras
        dispatch(cartChangeStateofActivation(!products.products.cartActive))
    }

    const handleBuy = ()=>{
        buy().then((response: any) => {
            if (response != undefined && response != null) {
                dispatch(buyCart(response.data["products"]))
            }
        }).catch((e: any) => {
            console.log(e)
        });
    }

    return (
        <Overlay isVisible={products.products.cartActive} onBackdropPress={toggleOverlayCart}>
            <View style={styles.overlayContainer}>
                <Text style={styles.title}>
                    {'Carrito de compras'}
                </Text>
                {(products.products.shoppingBag != undefined && products.products.shoppingBag.length > 0) ? (
                    <ScrollView style={styles.scrollViewStyle}>
                        {products.products.shoppingBag.map((item: any, index: any) => {
                            return <View key={index + "sb"} style={styles.itemContainer}>
                                <View style={styles.flex1}>
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: item.image }} style={styles.imageStyle} />
                                    </View>
                                </View>
                                <View style={styles.flex2}>
                                    <View style={styles.textDetailContainer}>
                                        <Text style={styles.label}>
                                            {"Nombre: "}
                                            <Text style={styles.otherText}>
                                                {item.name}
                                            </Text>
                                        </Text>

                                    </View>
                                    <View style={styles.textDetailContainer}>
                                        <Text style={styles.label}>
                                            {"Stock: "}
                                            <Text style={styles.otherText}>
                                                {item.stock}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={styles.textDetailContainer}>
                                        <Text style={styles.label}>
                                            {"Precio: "}
                                            <Text style={styles.otherText}>
                                                {" $" + item.unit_price}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={styles.textDetailContainer}>
                                        <Text style={styles.label}>
                                            {"Cantidad: "}
                                            <Text style={styles.otherText}>
                                                {item.quantity}
                                            </Text>
                                        </Text>

                                    </View>
                                    <View style={styles.textDetailContainer}>
                                        <Text style={styles.label}>
                                            {"Subtotal: "}
                                            <Text style={styles.otherText}>
                                                {"$" + item.quantity * item.unit_price}
                                            </Text>
                                        </Text>

                                    </View>
                                </View>
                            </View>
                        })}
                        <View style={styles.footer}>
                            <View style={styles.rightFooter}>
                                <Text style={styles.totalText}>
                                    {"Total: "}
                                    <Text style={styles.priceS}>
                                        {products.products.totalToPay}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.flex1}>
                                <TouchableOpacity onPress={() => {
                                    //accion para realizar la compra de lo que se encuentra dentro del carrito de compras
                                   handleBuy()
                                }} style={styles.payButton}>
                                    <Text style={styles.payText}>
                                        {'Comprar'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                ) : (
                    <View style={styles.emptyCart}>
                        <Text>
                            {'El carrito de compras está vacio'}
                        </Text>
                    </View>
                )}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'black',
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'justify'
    },
    otherText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: 'normal'
    },
    textDetailContainer: {
        width: '100%',
        flexDirection: 'row'
    },
    overlayContainer: {
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'center',
        padding: 10
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FAFAF4',
        borderRadius: 8,
        marginTop: 10,
        padding: 8
    },
    scrollViewStyle: {
        width:'100%'
    },
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    imageContainer: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        resizeMode: 'center',
        width: '90%',
        height: 80
    },
    footer: {
        flexDirection: 'row',
        width: '100%'
    },
    rightFooter: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10
    },
    totalText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    priceS: {
        fontWeight: 'normal',
        color: 'gray'
    },
    payButton: {
        backgroundColor: '#00d168',
        marginVertical: 10,
        marginLeft: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        height: 32,
        borderRadius: 8,
        justifyContent: 'center'
    },
    payText: {
        color: 'white',
        fontWeight: 'bold'
    },
    emptyCart: {
        height: 80,
        justifyContent: 'center'
    }
})

export default CartOverlay