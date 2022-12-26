import React from "react";
import { View, Dimensions, TouchableOpacity, ActivityIndicator, Text, ScrollView, Image, Alert, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addToCart, unSelectDetail } from "../productsSlice";

interface props {
    quantity: number
    products: any
    overlay: boolean
    setQuantity: (a: number) => void
    setOverlay: (a: boolean) => void
}

const DetailsOverlay: React.FC<props> = ({ quantity, products, overlay, setOverlay, setQuantity }) => {
    const dispatch = useDispatch()

    const toggleOverlay = () => {
        //manejo de la vista de detalles
        if (overlay) {
            dispatch(unSelectDetail())
        }
        setOverlay(!overlay);
    };

    const handleQuantity = (q: number) => {
        //se valida que la cantidad a agregar no supere el stock
        if (quantity + q <= products.products.porductDetails.stock) {
            if (quantity + q > 0) {
                setQuantity(quantity + q)
            }
        } else {
            Alert.alert("No puede agregar mas items de los que hay en stock")
        }
    }

    return (
        <Overlay isVisible={overlay} onBackdropPress={toggleOverlay}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {'Detalles'}
                </Text>
                {products.products.porductDetails != null ? (
                    <>
                        <Image source={{ uri: products.products.porductDetails.image }} style={styles.imageStyle} />
                        <ScrollView>
                            <View style={styles.textDetailContainer}>
                                <Text style={styles.label}>
                                    {"Nombre: "}
                                    <Text style={styles.otherText}>
                                        {products.products.porductDetails.name}
                                    </Text>
                                </Text>

                            </View>
                            <View style={styles.textDetailContainer}>
                                <Text style={styles.label}>
                                    {"Descripción: "}
                                    <Text style={styles.otherText}>
                                        {products.products.porductDetails.description}
                                    </Text>
                                </Text>

                            </View>
                            <View style={styles.textDetailContainer}>
                                <Text style={styles.label}>
                                    {"Stock: "}
                                    <Text style={styles.otherText}>
                                        {products.products.porductDetails.stock}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.textDetailContainer}>
                                <Text style={styles.label}>
                                    {"Precio: "}
                                    <Text style={styles.otherText}>
                                        {" $" + products.products.porductDetails.unit_price}
                                    </Text>
                                </Text>

                            </View>
                            <View style={styles.footer}>
                                <View style={styles.right}>
                                    <TouchableOpacity onPress={() => {
                                        handleQuantity(-1)
                                    }} style={styles.quantityButton}>
                                        <Text style={styles.quantityTextButton}>
                                            {'-'}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.textRightFooterContainer}>
                                        <Text style={styles.textRightFooter}>
                                            {quantity}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        handleQuantity(1)
                                    }} style={styles.quantityButton}>
                                        <Text style={styles.quantityTextButton}>
                                            {"+"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.left}>
                                    <TouchableOpacity onPress={() => {
                                        //se agrega el producto al carrito con la respectiva cantidad seleccionada
                                        dispatch(addToCart({
                                            id: products.products.porductDetails.id,
                                            name: products.products.porductDetails.name,
                                            quantity: quantity,
                                            stock: products.products.porductDetails.stock,
                                            image: products.products.porductDetails.image,
                                            unit_price: products.products.porductDetails.unit_price
                                        }))
                                        //se reinician variables usadas
                                        setQuantity(0)
                                        setOverlay(false)
                                    }} style={styles.addCartStyle}>
                                        <Text style={styles.textAddCart}>
                                            {'Agregar al carrito'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ScrollView>
                    </>
                ) : (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
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
    quantityButton: {
        height: 32,
        width: 52,
        borderRadius: 16,
        backgroundColor: '#8A20CE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityTextButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    container: {
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'center',
        padding: 10
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageStyle: {
        resizeMode: 'center',
        width: '90%',
        height: 160,
        marginTop: 10
    },
    footer: {
        flexDirection: 'row',
        width: '100%'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10
    },
    left: {
        flex: 1
    },
    textRightFooterContainer: {
        width: 50,
        alignItems: 'center'
    },
    textRightFooter: {
        color: 'black',
        fontSize: 20
    },
    addCartStyle: {
        backgroundColor: '#8A20CE',
        marginVertical: 10,
        marginLeft: 15,
        paddingHorizontal: 15,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center'
    },
    textAddCart: {
        color: 'white',
        fontWeight: 'bold'
    },
    loaderContainer: {
        height: 50,
        justifyContent: 'center'
    }
})

export default DetailsOverlay