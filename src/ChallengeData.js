import React from "react";

// root of api calls
const API_ROOT = "https://oc1.api.riotgames.com";

// returns a players names and id's (including PUUID value)
const SEARCH_USER = "/lol/summoner/v4/summoners/by-name/"; // {summonerName}

// Delete this nephew
const API_KEY = "?api_key=RGAPI-9211b82e-0aa0-4a89-b86e-2a13813c9833";


// Access a player's challenge data via PUUID
const CHALLENGE_DATA = "/lol/challenges/v1/player-data/"; // {puuid}

async function challengeData(puuid){
    let rawChallengeData = await fetch(API_ROOT + CHALLENGE_DATA + puuid + API_KEY);
    let userChallengeData = await rawChallengeData.json()

    let rawMetaData = await fetch(API_ROOT + "/lol/challenges/v1/challenges/config" + API_KEY)
    let metaData = await rawMetaData.json()
    // For each challenge in user's data, finds corresponding challenge in config data (by id)
    // adds the name, description, and tier thresholds to each challenge object. 
    userChallengeData.challenges.forEach(challenge => {
        metaData.forEach(element => {
            switch (element.id) {
                case challenge.challengeId:
                    challenge.name = element.localizedNames.en_AU.name
                    challenge.description = element.localizedNames.en_AU.description
                    challenge.thresholds = element.thresholds
                    break;
                default:
                    break;
            }
        });
    })
    return userChallengeData
};

export default challengeData;