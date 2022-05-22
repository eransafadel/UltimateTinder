import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useState,useEffect } from "react";
const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMsg, setUsersMsg] = useState(null);
  const [clickedUsersMsg, setClickedUsersMsg] = useState(null);

  const getUsersMsg = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUsersMsg(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getClickedUsersMsg = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUsersMsg(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsersMsg();
    getClickedUsersMsg();
  },[]);

  


  const messages =[];
  usersMsg?.forEach(message => {
    const formattedMessage ={};
    formattedMessage['name'] = user?.first_name;
    formattedMessage['img'] = user?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
    
  });

  clickedUsersMsg?.forEach(message => {
    const formattedMessage ={};
    formattedMessage['name'] = clickedUser?.first_name;
    formattedMessage['img'] = clickedUser?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    messages.push(formattedMessage);
    
  });

console.log(clickedUser);
console.log(usersMsg);
  console.log(messages.length);

  const descendingOrderMessages = messages.sort((a,b)=>a.timestamp.localeCompare(b.timestamp));

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages}/>
      <ChatInput user={user}
      clickedUser={clickedUser}
      getUsersMsgs={getUsersMsg}
      getClickedUsersMsg={getClickedUsersMsg}/>
    </>
  );
};

export default ChatDisplay;
