import axiosInstance from '../../services';

export const GetClockIn = async (shift_id, agencyData) => {
    console.log(shift_id, agencyData, "Data======>>>>>>>>")
    return axiosInstance.get('/getShiftClockIn?shift_id=' + shift_id + '&agency_id=' + agencyData);
}