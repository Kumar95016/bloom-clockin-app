import axios from 'axios'
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = API_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
});


export const authInterceptor = axiosInstance.interceptors.request.use(
    async (config) => {
        // console.log(config,"config=========>>>>>>>>>>>>>>")
        try {
            const token = await AsyncStorage.getItem('token');
            // console.log(token,"token=======================>>")

            if (token) {
                config.headers.Authorization = token;
            }
        } catch (error) {
            console.error("Error fetching token:", error);
        }

        return config;
    },
    (error) => Promise.reject(error),
);

export const authInterceptorResponse = axiosInstance.interceptors.response.use(
    async (response) => {
        return response.data;
    },
    async (error) => {
        return error.response.data;
    }
)

export default axiosInstance;