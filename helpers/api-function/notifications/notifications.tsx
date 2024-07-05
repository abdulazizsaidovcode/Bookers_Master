import { notifications_all_data, notifications_appointment_edit, notifications_cancel_edit, notifications_changing_edit, notifications_feedback_edit, notifications_main_data, notifications_main_data_edit, notifications_messengers_edit, notifications_window_edit } from "@/helpers/api";
import { config } from "@/helpers/token";
import { NotificationsAllData } from "@/type/notifications/notifications";
import axios from "axios"

export const fetchMainData = async (setMainData: (val: boolean) => void) => {
    try {
        const { data } = await axios.get(notifications_main_data, config);
        if (data.success) {
            setMainData(data.body);
        }
    } catch (error) {
        console.log(error)
    }
}

export const editMainDataStatus = async (isActive: boolean) => {
    try {
        await axios.post(`${notifications_main_data_edit}?isActive=${isActive}`, {}, config);
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllData = async (setOneData: (val: NotificationsAllData) => void, status: string) => {
    try {
        const { data } = await axios.get(`${notifications_all_data}?status=${status}`, config);
        if (data.success) {
            setOneData(data.body);
        }
    } catch (error) {
        console.log(error)
    }
}

export const editMessenger = async (isMessage: boolean) => {
    try {
        await axios.put(`${notifications_messengers_edit}?isMessage=${isMessage}`, {}, config);
        console.log('Ketdi');
        console.log(isMessage);

    } catch (error) {
        console.log(error)
    }
}

export const editCancelOrder = async (isActive: boolean, text: string) => {
    const payload = { isActive, text }
    try {
        await axios.put(notifications_cancel_edit, payload, config);
    } catch (error) {
        console.log(error)
    }
}

export const editChangingOrder = async (isActive: boolean, text: string) => {
    const payload = { isActive, text }
    try {
        await axios.put(notifications_changing_edit, payload, config);
    } catch (error) {
        console.log(error)
    }
}

export const editFeedbeckOrder = async (text: string) => {
    try {
        await axios.put(notifications_feedback_edit, { text }, config);
    } catch (error) {
        console.log(error)
    }
}

export const editAppoinmentOrder = async (text: string, hour: string, minute: string, isActive: boolean) => {
    try {
        await axios.put(`${notifications_window_edit}?hour=${hour}&minute=${minute}&text=${text}&isActive=${isActive}`, { text }, config);
    } catch (error) {
        console.log(error)
    }
}

export const editWindowOrder = async (text: string) => {
    try {
        await axios.put(notifications_appointment_edit, {}, config);
    } catch (error) {
        console.log(error)
    }
}