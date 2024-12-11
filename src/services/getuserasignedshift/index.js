import axiosInstance from '../../services';

export const Asignedshift = async (Data) => {
    console.log("asignedshift..", Data)
    return axiosInstance.get("/getUserAssignedShift?shift_id=" + Data);
}