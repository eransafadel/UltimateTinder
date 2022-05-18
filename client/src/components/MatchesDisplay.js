import axios from "axios";
import { useState, useEffect } from "react";

const MatchesDisplay = ({ matches }) => {
  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const [matchesProfiles, setMatchesProfiles] = useState(null);

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchesProfiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  console.log(matchesProfiles);

  return (
    <div className="matches-display">
      {matchesProfiles?.map((match, _index) => 
      (
        <div key={_index} >
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + "profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
