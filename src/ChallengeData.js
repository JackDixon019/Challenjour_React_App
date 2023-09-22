const API_ROOT = process.env.REACT_APP_API_ROOT;
const API_KEY = process.env.REACT_APP_API_KEY;
const CHALLENGE_DATA = process.env.REACT_APP_CHALLENGE_DATA;

// This calculates the score a player needs to achieve to unlock the next tier of a challenge
function nextThreshold(currentValue, thresholds) {
    let nextValue = 0;
    for (const threshold of Object.values(thresholds)) {
        if (threshold > currentValue && (threshold < nextValue || nextValue === 0)) {
            nextValue = threshold;
        }
    }
    return nextValue;
}

async function challengeData(puuid) {
    // gets user's challenge data and parses to object
    let rawChallengeData = await fetch(
        API_ROOT + CHALLENGE_DATA + puuid + API_KEY
    );
    let userChallengeData = await rawChallengeData.json();

    // gets challenge config data and parses to object
    let rawMetaData = await fetch(
        API_ROOT + "/lol/challenges/v1/challenges/config" + API_KEY
    );
    let metaData = await rawMetaData.json();

    // This part is done because the challenge data is language agnostic, while the metadata
    // contains all of the different translations for each challenge.
    // For each challenge in user's data, finds corresponding challenge in config data (by id)
    // adds the name, description, and tier thresholds to each challenge object.
    // Also calculates the threshold required for the next tier, and the category of challenge
    userChallengeData.challenges.forEach((challenge) => {
        metaData.forEach((element) => {
            switch (element.id) {
                case challenge.challengeId:
                    challenge.name = element.localizedNames.en_AU.name;
                    challenge.description = element.localizedNames.en_AU.description;
                    challenge.thresholds = element.thresholds;
                    // calculates score required for next tier
                    challenge.nextThreshold = nextThreshold(challenge.value, challenge.thresholds);
                    // the first digit of a challenge's ID declares 
                    // which category each challenge falls under
                    challenge.category = userChallengeData.challenges[
                        challenge.challengeId.toString()[0]
                    ].name;
                    break;
                default:
                    break;
            }
        });
    });
    // Riot calls this challenge 'CRYSTAL' because it's used to colour a crystal in the game's UI
    // but that really means nothing here. We do a little bit of hardcoding. As a treat.
    userChallengeData.challenges[0].name = 'TOTAL SCORE'
    return userChallengeData;
}
            
export default challengeData;