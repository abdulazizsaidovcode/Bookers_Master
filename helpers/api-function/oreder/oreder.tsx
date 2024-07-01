import { master_order_confirmed, master_order_hall, master_order_wait, order_add, order_get_one } from "@/helpers/api";
import { useOrderPosdData } from "@/helpers/state_managment/order/order";
import { config } from "@/helpers/token";
import axios from "axios";

interface OrderPost {
    data: any;
    status?: string;
    messageSatus?: (val: string) => void;
    setOrderId?: (val: string) => void;
    setLoading?: (val: boolean) => void;
    setStatus?: (val: string) => void; // Add setStatus to the interface
    navigation?: any; // Add navigation prop
}

export const postOrder = ({ data, status = "OTHER", messageSatus, setOrderId, setLoading, setStatus, navigation }: OrderPost) => {
    setLoading && setLoading(true);
    axios.post(`${order_add}?status=${status}`, data, config)
        .then((response) => {
            setLoading && setLoading(false);
            // console.log("Order set successfully", response);
            if (response.data.success) {
                setOrderId?.(response.data.body);
                setStatus?.("success"); // Update status in the store
                if (navigation) {
                    navigation.goBack()
                } // Navigate back on success
            }
        })
        .catch(error => {
            messageSatus?.(error.response.data.message);
            setStatus?.("error"); // Update status in the store
            console.log(error);
            setLoading && setLoading(false);
        });
};

// get order one
export const orderGetOne = (orderID: string, setData: (val: any | null) => void) => {
    if (orderID) {
        axios.get(`${order_get_one}${orderID}`, config)
            .then((response) => {
                if (response.data.success) setData(response.data.body);
                else setData(null)
            })
            .catch(err => {
                console.error(err)
                setData(null)
            })
    }
}

// master order confirmed holatdagilar
export const getMasterOrderConfirmed = (setConfirmedData: any) => {
    axios.get(`${master_order_confirmed}`, config)
        .then((response) => {
            if (response.data.success) { 
                setConfirmedData(response.data.body)
            }
            else { 
                setConfirmedData([])
            }
        })
        .catch(err => {
            console.error(err)
            setConfirmedData([])
        })
}

// master order wait holatdagilar
export const getMasterOrderWait = (setWaitData: any) => {
    axios.get(`${master_order_wait}`, config)
        .then((response) => {
            if (response.data.success) { 
                setWaitData(response.data.body)
            }
            else { 
                setWaitData([])
            }
        })
        .catch(err => {
            console.error(err)
            setWaitData([])
        })
}

// master order hall holatdagilar
export const getMasterOrderHall = (setHallData: any) => {
    axios.get(`${master_order_hall}`, config)
        .then((response) => {
            if (response.data.success) { 
                setHallData(response.data.body)
            }
            else { 
                setHallData([])
            }
        })
        .catch(err => {
            console.error(err)
            setHallData([])
        })
}


