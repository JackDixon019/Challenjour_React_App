import React, { useEffect, useState } from "react";
import challengeData from "./ChallengeData";
import SearchResults from "./SearchResults";

const API_ROOT = process.env.REACT_APP_API_ROOT;
const SEARCH_USER = process.env.REACT_APP_SEARCH_USER;
const API_KEY = process.env.REACT_APP_API_KEY;

async function getUserData(username) {
    let apiResponse = await fetch(
        // combines the api root, the search user path,
        // the username being searched, and the api key
        API_ROOT + SEARCH_USER + username + API_KEY
    );
    // Throw error on 404
    if (apiResponse.status === 404) {
        console.log("404: Summoner not found");
    }
    // converts to json
    let apiData = await apiResponse.json();
    return apiData;
}

export default function UserSearch(props) {
    const [userData, setUserData] = useState({});
    const [lastSearchedName, setLastSearchedName] = useState(null);
    const [errorMessage, setErrorMessage] = useState("Searching");
    const [userChallengeData, setUserChallengeData] = useState(null);

    async function searchUser(username) {
        try {
            // If no text entered, sets to default
            if (username === "") {
                setUserData({});
                setLastSearchedName("");
            }
            // Checks name being searched != last searched name
            if (username !== lastSearchedName) {
                setErrorMessage(`Now searching for user: ${username}`);
                setLastSearchedName(username);

                // updates status to contain returned data
                let apiUserData = await getUserData(username)

                // fetches challenge data
                let challengeDataObj = await challengeData(apiUserData.puuid)
                setUserData(apiUserData)
                setUserChallengeData(challengeDataObj)
            }
        } catch (error) {
            console.log(error);
            // updates last searched name state, and error message
            setLastSearchedName(username);
            setErrorMessage(`Error: ${error.message} \nPlease check the spelling and try again`);
            setUserData({});
        }
    }

    // Searches for user by username
    // Sets state.userData to the API's returned data
    useEffect(() => {
        console.log(`username= ${props.username}`)
        searchUser(props.username);
    }, [props]);

    if(userChallengeData){
        console.log(userChallengeData)
    }

    // Checks for both user id and that there is challenge data available
    // then returns challenge data presented in readable form
    if (userData.puuid && userChallengeData) {
        return (
            <div>
                <h1>User found: {userData.name}</h1>
                <SearchResults challengeData={userChallengeData}></SearchResults>
            </div>
        );
    } else {
        // This isn't in a catch block, because it uses the error message to display the "Searching" screen
        return <h1>{errorMessage}</h1>;
    }
}
