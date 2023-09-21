const API_ROOT = process.env.REACT_APP_API_ROOT
const API_KEY = process.env.REACT_APP_API_KEY
const CHALLENGE_DATA = process.env.REACT_APP_CHALLENGE_DATA

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