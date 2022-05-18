import ChatHeader from '../components/ChatHeader';
import ChatDisplay from '../components/ChatDisplay';
import MatchesDisplay from '../components/MatchesDisplay';
import  './ChatContainer.css';
const ChatContainer = ({user}) => {

  console.log('user-chatConatiner',user);
  return <div className="chat-container">
      <ChatHeader user={user}/>
      <div>
          <button className='option'>Matches</button>
          <button className='option'>Chat</button>
      </div>

      <MatchesDisplay matches={user.matches}/>
      <ChatDisplay/>

  </div>;
};

export default ChatContainer;
