import axios from 'axios';
const baseUrl = 'https://489a19f7-f7d2-426a-8361-230148034a79.mock.pstmn.io/';


export const allProducts = async () => {

    try{
        const response =  await axios.get(`${baseUrl}all-products`, {
        })
        return response
    }catch(e){
        console.log(e)
    }
    return []
   
}

export const DetailsProduct = async (id: string) => {

    try{
        const response =  await axios.get(`${baseUrl}detail/${id}`, {
        })
        return response
    }catch(e){
        console.log(e)
    }
    return {}
   
}

export const buy = async () => {

    try{
        const response =  await axios.post(`${baseUrl}buy`, {
        })
        return response
    }catch(e){
        console.log(e)
    }
    return []
   
}