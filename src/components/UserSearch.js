import React, { useContext, useEffect, useState } from "react";
import getChallengeData from "./getChallengeData";
import SearchResults from "./SearchResults";
import UserContext from "../context/UserContext";
import ChallengeContext from "../context/ChallengeContext";
import ActiveCategoryContext from "../context/ActiveCategoryContext";
import ActiveIndexContext from "../context/ActiveIndexContext";

const API_ROOT = process.env.REACT_APP_API_ROOT;
const SEARCH_USER = process.env.REACT_APP_SEARCH_USER;
const API_KEY = process.env.REACT_APP_API_KEY;

// actually calls the api for user data
async function getUserData(username) {
    let apiResponse = await fetch(API_ROOT + SEARCH_USER + username + API_KEY);
    // converts to json
    let apiData = await apiResponse.json();
    return apiData;
}

export default function UserSearch() {
    let { userData, setUserData } = useContext(UserContext);
    let { challengeData, setChallengeData } = useContext(ChallengeContext);
    let { setActiveCategory } = useContext(ActiveCategoryContext);
    let { setActiveIndex } = useContext(ActiveIndexContext);
    const [errorMessage, setErrorMessage] = useState("Searching");

    // Searches for user by username whenever userData updates
    useEffect(() => {
        // prevents update loop, unless the user is searching again
        // When user searches, userData has no puuid --> allows api call
        // when fetch resolves, puuid is included --> No call made
        if (!userData.puuid) {
            setActiveCategory("ALL CHALLENGES");
            setActiveIndex(null);
            apiCall();
        }

        async function apiCall() {
            console.log("calling api for: " + userData.name);
            searchUser(userData.name);
        }
    }, [userData]);

    async function searchUser(username) {
        try {
            // If no text entered, sets to default
            if (username === "") {
                setUserData({});
            }
            // displays message while waiting for response
            setErrorMessage(`Now searching for user: ${username}`);

            // updates status to contain returned data
            let apiUserData = await getUserData(username);

            // fetches challenge data
            let challengeDataObj = await getChallengeData(apiUserData.puuid);

            // updates states
            setUserData(apiUserData);
            setChallengeData(challengeDataObj);
        } catch (error) {
            console.log(error);
            setErrorMessage(`Error: ${error.message} \nPlease check the spelling and try again`);
        }
    }
    // Checks for both user id and that there is challenge data available
    // then returns challenge data presented in readable form
    if (userData.puuid && challengeData) {
        return (
            <div>
                <h1>User found: {userData.name}</h1>
                <SearchResults></SearchResults>
            </div>
        );
    } else {
        // This isn't in a catch block, because it uses the error message to display the "Searching" screen
        return <h1>{errorMessage}</h1>;
    }
}
