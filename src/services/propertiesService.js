import axios from "axios";

const API_URL = "http://localhost:4646/api/properties"; // Your backend URL
export const getAllProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};
export const getAllPropertiesByUserId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getAllPropertiesByUserId/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

export const addProperty = async (property ) => {
  try {
    const response = await axios.post(`${API_URL}`, property,{
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};
export const editProperty = async (property,id ) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, property,{
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};
export const deleteProperty = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting property:", error);
    return false;
  }
};