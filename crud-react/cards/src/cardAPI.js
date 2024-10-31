import axios from "axios";
 const baseUrl="http://localhost:5000";
// GET
export const getCards = async () => {
    try {
        return axios.get(baseUrl);
    }
    catch (error) {
        console.error("error in getting card",error);
    }
}

// UPDATE
export const updateCardByID = async (id,text,color) => {
    try {
        let body={
            id:id,
            text:text,
            color:color
        }
        return await axios.put(`${baseUrl}/${id}`,body);
       
    }
    catch (error) {
        console.error("error in updating card",error);
    }
}


// DELETE
export const deleteCardByID = async (id) => {
    try {
        console.log(`in delete ID: ${id}`);
         return axios.delete(`${baseUrl}/${id}`);
        
    }
    catch (error) {
        console.error("error in deleting card",error);
    }
}


// CREATE
export const createCard = async (text,color) => {
    try {
        let body={
            text:text,
            color:color
        }
        return await axios.post(`${baseUrl}`,body);
       
    }
    catch (error) {
        console.error("error in updating card",error);
    }
}
