import React, { useContext, useEffect, useState } from "react";
import challengeData from "./ChallengeData";
import SearchResults from "./SearchResults";
import UserContext from "../context/UserContext";

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

export default function UserSearch() {

    let {userData, setUserData} = useContext(UserContext)
    const [errorMessage, setErrorMessage] = useState("Searching");
    const [userChallengeData, setUserChallengeData] = useState(null);

    async function searchUser(username) {
        try {
            // If no text entered, sets to default
            if (username === "") {
                setUserData({});
            }
            // displays message while waiting for response
            setErrorMessage(`Now searching for user: ${username}`);
            
            // updates status to contain returned data
            let apiUserData = await getUserData(username)

            // fetches challenge data
            let challengeDataObj = await challengeData(apiUserData.puuid)

            // updates states
            setUserData(apiUserData)
            setUserChallengeData(challengeDataObj)

        } catch (error) {
            console.log(error);
            setErrorMessage(`Error: ${error.message} \nPlease check the spelling and try again`);
        }
    }

    // Searches for user by username whenever userData updates
    useEffect(() => {
        async function apiCall(){
            console.log('calling api for: ' + userData.name)
            searchUser(userData.name);
        }

        // prevents update loop, unless the user is searching again
            // When user searches, userData has no puuid --> allows api call
            // when fetch resolves, puuid is included --> No call made
        if (!userData.puuid) {
            apiCall()
        }
    }, [userData]);

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
