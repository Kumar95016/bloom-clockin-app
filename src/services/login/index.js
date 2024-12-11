import axiosInstance from '../../services';

export const login = async (Data) => {
    console.log("Datatatatat", Data)
    return axiosInstance.post("/communityLogin", Data);
}