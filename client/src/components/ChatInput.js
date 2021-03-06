import { useState } from "react";
import "./ChatInput.css";
import axios from "axios";
import {useEffect} from 'react';
const ChatInput = ({user,clickedUser,getUsersMsgs,getClickedUsersMsg}) => {


    const [textArea,setTextArea]=useState('');
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;
    const addMsg = async()=>{

        const message = {
            timestamp:new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message:textArea
        }

        try{
              await axios.post('http://localhost:8000/message',{message});
              getUsersMsgs();
              getClickedUsersMsg();
              setTextArea('');
        }catch(e){console.log(e);}

    }

    

    return (
    <div className='chat-input'>
        <textarea value={textArea} onChange={(e)=>setTextArea(e.target.value)}/>
        <button className="secondary-button" onClick={addMsg}>Submit</button>


    </div>)
}
  
  export default ChatInput;