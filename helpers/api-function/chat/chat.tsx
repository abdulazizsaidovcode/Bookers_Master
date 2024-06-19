import axios from 'axios';
import { getChatList_url } from '../../api';
import { config } from '../../token';
import { Data } from '../../state_managment/chat/chatStore';

interface IChat {
    status?: string;
    fullName?: any;
    messageStatus?: string;
    setData: (val: Data[]) => void;
  }
  

export const GetChatList = ({ status, fullName, messageStatus, setData }: IChat) => {
    axios.get(`${getChatList_url}${status ? `?status=${status}` : ''}${fullName ? `&fullName=${fullName}` : ''}${messageStatus ? `&messageStatus=${messageStatus}` : ''}`, config)
        .then(res => {
            if (res.data.success === true) {
                setData(res.data.body)
                console.log(res.data.body);
            } else setData([])
        })
        .catch((err) => {
            setData([])
            console.log(err);
            
        });
};
