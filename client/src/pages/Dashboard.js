import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./Dashboard.css";
import ChatContainer from "../components/ChatContainer";
import axios from 'axios';
import {useCookies} from 'react-cookie';
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers,setGenderedUsers]= useState(null);
  const [cookies,setCookie,removeCookie] = useCookies(['user']);
  const userId = cookies.UserId;
  const [lastDirection, setLastDirection] = useState();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId},
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async ()=>{

    try{
    const response = await axios.get("http://localhost:8000/gendered-users", {
      params: { gender:user?.gender_interest},
    });
    setGenderedUsers(response.data)


  }catch(error){console.log(error);}

  }

  useEffect(() => {
    getUser()

}, [])

useEffect(() => {
    if (user) {
        getGenderedUsers()
    }
}, [user])

  console.log('user',user);
  console.log('genderedUsers',genderedUsers);

  const matchWithMyId = user?.matches.map(({user_id}) =>user_id).concat(userId)
 const filteredGeneratedUsers = genderedUsers?.filter(
   genderedUser => !matchWithMyId.includes(genderedUser.user_id)
 )
  
  const updateMatches = async(matchedUserID)=>{

    try{
      await axios.put('http://localhost:8000/addmatch',{
        userId,
        matchedUserID
      }) 
      getUser();
    }catch (error) {console.log(error);}

  }

  console.log('user  from dashboard: ',user);



  const swiped = (direction, swipedUserId) => {
    if(direction==='right')
    {
      updateMatches(swipedUserId)
    }
    console.log("removing: " + swipedUserId);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <>{user&&
    <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="swipe-container">
        <div className="card-container">
          {filteredGeneratedUsers?.map((character) => (
            <TinderCard
              className="swipe"
              key={character.first_name}
              onSwipe={(dir) => swiped(dir, character.user_id)}
              onCardLeftScreen={() => outOfFrame(character.first_name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.first_name}</h3>
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
}
    </>
  );
};

export default Dashboard;
