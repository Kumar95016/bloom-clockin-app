import axiosInstance from '../../services';

export const StartShiftById = async (Data) => {
    console.log("Datatatatat", Data)
    return axiosInstance.post("/startShiftByID", Data);
}