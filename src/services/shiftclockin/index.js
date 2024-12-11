import axiosInstance from '../../services';

export const ShiftClockIn = async (Data) => {
    console.log("Datatatatat", Data)
    return axiosInstance.post("/shiftClockIn", Data);
}