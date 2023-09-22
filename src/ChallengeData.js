const API_ROOT = process.env.REACT_APP_API_ROOT
const API_KEY = process.env.REACT_APP_API_KEY
const CHALLENGE_DATA = process.env.REACT_APP_CHALLENGE_DATA

async function challengeData(puuid){
    // gets user's challenge data and parses to object
    let rawChallengeData = await fetch(API_ROOT + CHALLENGE_DATA + puuid + API_KEY);
    let userChallengeData = await rawChallengeData.json()
    console.log(userChallengeData)

    // gets challenge config data and parses to object
    let rawMetaData = await fetch(API_ROOT + "/lol/challenges/v1/challenges/config" + API_KEY)
    let metaData = await rawMetaData.json()

    // This part is done because the challenge data is language agnostic, while the metadata
    // contains all of the different translations for each challenge. 
    // For each challenge in user's data, finds corresponding challenge in config data (by id)
    // adds the name, description, and tier thresholds to each challenge object. 
    userChallengeData.challenges.forEach(challenge => {
        metaData.forEach(element => {
            switch (element.id) {
                case challenge.challengeId:
                    challenge.name = element.localizedNames.en_AU.name
                    if (challenge.name === "CRYSTAL"){
                        challenge.name = "TOTAL SCORE"
                    }
                    challenge.description = element.localizedNames.en_AU.description
                    challenge.thresholds = element.thresholds
                    challenge.nextThreshold = nextThreshold(challenge.value, challenge.thresholds)
                    break;
                default:
                    break;
            }
        });
    })

    function nextThreshold(currentValue, thresholds){
        let greaterValues = []
    
        for (const value of Object.values(thresholds)){
            if (value > currentValue){
                greaterValues.push(value) 
            }
        }
        console.log(greaterValues)
        return Math.min(...greaterValues)
    }
    
    
    
    return userChallengeData
};

export default challengeData;