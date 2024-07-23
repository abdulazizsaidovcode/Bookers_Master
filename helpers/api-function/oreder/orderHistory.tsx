import { getConfig } from "@/app/(tabs)/(master)/main"
import Toast from "react-native-simple-toast";
import { clientOrderUpcoming } from "@/helpers/api";
import { getOrderClientUpcomingInterface } from "@/type/client/editClient";
import axios from "axios";


// Upcoming function
export const getorderClientUpcoming=async(setData:(val:getOrderClientUpcomingInterface[])=>void)=>{
    const config = await getConfig();
    const getclientOrderUpcoming=await axios.get(clientOrderUpcoming,config ? config : {});
    try{
        if(getclientOrderUpcoming.data.success)setData(getclientOrderUpcoming.data.body)
        else setData([])
    }
    catch{
        Toast.show('Upcoming topilmadi afsuski', Toast.LONG)
        setData([])
    }
}
//Pastcoming function 

export const getOrderClientPustComing=async (setData:(val:getOrderClientUpcomingInterface[])=>void)=>{
    const config=await getConfig();
    const getclientOrderPustComing=await axios.get()
}