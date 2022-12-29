import {createSlice} from '@reduxjs/toolkit';
import {allProducts, DetailsProduct, buy} from '../../services/ApiEnpoints';
import {Alert} from 'react-native';

export type productOfList = {
  id: number;
  name: string;
  unit_price: number;
  stock: number;
  image: string;
};

type cartt = {
  id: number;
  name: string;
  quantity: number;
  stock: number;
  image: string;
  unit_price: number;
};

interface states {
  productsList: Array<productOfList>;
  shoppingBag: Array<cartt>;
  porductDetails: any;
  cartActive: boolean;
  totalToPay: number;
}

const initialState: states = {
  productsList: [],
  shoppingBag: [],
  porductDetails: null,
  cartActive: false,
  totalToPay: 0,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action: {payload: cartt}) => {
      var arr: cartt[] = [];
      //buscando si el producto ya se encuentra en el carrito
      const inCart = state.shoppingBag.find(prod =>
        prod.id === action.payload.id ? true : false,
      );
      if (inCart) {
        state.shoppingBag.map((item: cartt) => {
          if (item.id == action.payload.id) {
            //si el producto está en el carrito y al sumar las dos cantidades del mismo producto no se supera el stock se agrega correctamente
            if (item.quantity + action.payload.quantity <= item.stock) {
              const m = {
                id: item.id,
                name: item.name,
                quantity: item.quantity + action.payload.quantity,
                stock: item.stock,
                image: item.image,
                unit_price: item.unit_price,
              };
              arr.push(m);
              state.totalToPay =
                state.totalToPay +
                action.payload.quantity * action.payload.unit_price;
              Alert.alert('Se agregó al carrito correctamente');
            } else {
              //se mantiene el producto sin agregar las nuevas cantidades porque supera el stock
              arr.push(item);
              Alert.alert('No se pudo agregar porque supera el stock');
            }
          } else {
            arr.push(item);
          }
        });
        state.shoppingBag = arr;
      } else {
        if (action.payload.quantity <= action.payload.stock) {
          //si el producto no está en el carrito y la cantidad no supera el stock
          state.shoppingBag.push(action.payload);
          state.totalToPay =
            state.totalToPay +
            action.payload.quantity * action.payload.unit_price;
          Alert.alert('Se agregó al carrito correctamente');
        } else {
          //no se agrega porque supera el stock y se notifica la accion
          Alert.alert('No se pudo agregar porque supera el stock');
        }
      }
    },
    buyCart: (state, action: {payload: any}) => {
      //actualizando variables dependientes del carrito de compras
      state.productsList = action.payload;
      state.shoppingBag = [];
      state.totalToPay = 0;
      state.cartActive = false;
      Alert.alert('Carrito de compras comprado de manera correcta');
    },
    cartChangeStateofActivation: (state, action: {payload: boolean}) => {
      //se activa o desactiva el carrito de compras
      state.cartActive = action.payload;
    },
    detailProductSelect: (
      state,
      action: {payload: {id: number; object: any}},
    ) => {
      // llamando al endpoint para traer los datos del producto seleccionado
      const productD = {
        id: action.payload.id,
        unit_price: action.payload.object.unit_price,
        description: action.payload.object.description,
        stock: action.payload.object.stock,
        name: action.payload.object.name,
        image: action.payload.object.image,
      };
      state.porductDetails = productD;
    },
    unSelectDetail: state => {
      //se borran cuando el producto es deseleccionado
      state.porductDetails = null;
    },
    starting: (state, action: {payload: any}) => {
      //actualizando el estado de la lista de productos
      state.productsList = action.payload;
    },
  },
});

//se esportan las funciones que cambian los estados del reducer
export const {
  addToCart,
  detailProductSelect,
  unSelectDetail,
  starting,
  cartChangeStateofActivation,
  buyCart,
} = productsSlice.actions;

//se exportan los estados del reducer
export const productsList = (state: any) => state;

export default productsSlice.reducer;
