import {createSlice} from '@reduxjs/toolkit';

export type User = {
  uid: string;
  email: string | null
  isDark: boolean
};

const initialState: User = {
  uid: "",
  email: "",
  isDark: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: {payload: User})=>{
      //se guardan variables de la sesion del usuario
        state.email = action.payload.email
        state.uid = action.payload.uid
    },
    logout: (state) => {
      //se reinician los estados de las variables de la sesion del usuario
      state.email=""
      state.uid=""
    },
    dark: (state)=>{
      //se cambia el tema del login
      state.isDark = !state.isDark
    }
  },
});
//se esportan las funciones que cambian los estados del reducer
export const {login, logout, dark} = userSlice.actions;
//se exportan los estados del reducer
export const userr = (state: any) => state;

export default userSlice.reducer;
