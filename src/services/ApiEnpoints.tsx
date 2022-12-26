import axios from 'axios';
const baseUrl = 'https://525aa86b-e6ee-4e67-bbdf-f4d543d5701a.mock.pstmn.io/';

export const allProducts = async () => {
    try {
        const response = axios({
            method: 'get',
            url: `${baseUrl}all-products`,
        })

        console.log(response)

        return response
    } catch (e) {
        console.log(e)
    }
    return {data: "error"}
}

export const DetailsProduct = async (id: string) => {
    try{
        const response = axios({
            method: 'get',
            url: `${baseUrl}detail/${id}`,
        })
    
        console.log(response)
    
        return response
    }catch(e){
        console.log(e)
    }
    return {data:"error"}
}

export const buy = async () =>{
    try{
        const response = axios({
            method: 'post',
            url: `${baseUrl}buy`,
        })
    
        console.log(response)
    
        return response
    }catch(e){
        console.log(e)
    }
    return {data:"error"}
}