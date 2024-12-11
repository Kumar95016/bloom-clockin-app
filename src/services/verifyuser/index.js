import axiosInstance from '../../services';

export const verify = async (Data) => {
    console.log("userverify", Data)
    return axiosInstance.post("/verifyUser", Data);
}