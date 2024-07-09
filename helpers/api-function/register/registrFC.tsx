import { register_page } from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
export const registerFunction = (phoneNumber: string, setCode: (value: any) => void) => {
    const sentData = {
        phoneNumber: phoneNumber
    }
    axios.post(`${register_page}sendCode?purpose=true`, sentData)
        .then(res => {
            setCode(res.data.body);
            console.log(res.data.body);
            
        })
        .catch(err => {
            console.log(err);
        })
}

export const checkCode = (phoneNumber: string, otpValue: string, setRespone: any) => {
    const setData = {
        phoneNumber: phoneNumber
    }
    axios.post(`${register_page}checkCode?code=${otpValue}`, setData)
        .then(res => {
            Alert.alert("Muvaffaqiyatli ro'yxatdan o'tdingiz")
            router.push("(auth)/authPage1")
        })
        .catch(err => {
            setRespone(true);
        })
}
interface IRegister {
    phoneNumber: string
    firstName: string
    lastName: string
    nickname?: string
    img?: File
    role: string
}
export const masterData = ({ role, firstName, lastName, nickname, phoneNumber, img }: IRegister) => {
    const formData = new FormData();
    let image: any = null;
    formData.append('image', image);
    // if (img) {
    //     formData.append('image', img);
    // }
    
    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.replace('+', '%2B') : phoneNumber;

    const url = `${register_page}master?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}${nickname ? `&nickname=${encodeURIComponent(nickname)}` : ''}&phoneNumber=${formattedPhoneNumber}&ROLE=${encodeURIComponent(role)}`;
    // const url = `http://134.122.77.107:8080/auth/master?firstName=Qorbek&lastName=asfa&nickname=adwq&phoneNumber=+998908714021&ROLE=ROLE_MASTER`;
    axios.post(url, '', config)
        .then(res => {
            console.log(res);
            Alert.alert("Muvaffaqiyatli ro'yxatdan o'tdingiz😍🤣😂❤️");
        })
        .catch(err => {
            console.log(err);
            Alert.alert("Xatolik yuz berdi");
        });
    console.log(url);
}