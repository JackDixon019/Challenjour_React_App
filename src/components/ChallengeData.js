const API_ROOT = process.env.REACT_APP_API_ROOT;
const API_KEY = process.env.REACT_APP_API_KEY;
const CHALLENGE_DATA = process.env.REACT_APP_CHALLENGE_DATA;

// This determines the score a player needs to achieve to unlock the next tier of a challenge
function nextThreshold(currentValue, tiers) {
    let nextValue = 0;
    // tiers is an object of style {tier: threshold, tier2: threshold2}
    for (const threshold of Object.values(tiers)) {
        if (threshold > currentValue && (threshold < nextValue || nextValue === 0)) {
            nextValue = threshold;
        }
    }
    return nextValue;
}

async function challengeData(puuid) {
    // gets user's challenge data and parses to object
    let rawChallengeData = await fetch(API_ROOT + CHALLENGE_DATA + puuid + API_KEY);
    let userChallengeData = await rawChallengeData.json();

    // gets challenge config data and parses to object
    let rawMetaData = await fetch(API_ROOT + "/lol/challenges/v1/challenges/config" + API_KEY);
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
                    let categoryId = challenge.challengeId.toString()[0];
                    challenge.category = userChallengeData.challenges[categoryId].name;
                    break;
                default:
                    break;
            }
        });
    });
    // Riot calls this challenge 'CRYSTAL' because it's used to colour a crystal in the game's UI
    // but that really means nothing here, so we do a little bit of hardcoding. As a treat.
    userChallengeData.challenges[0].name = "ALL CHALLENGES";
    userChallengeData.challenges[0].category = "ALL CHALLENGES";

    // splits the categories off into their own lil attribute
    userChallengeData.categories = userChallengeData.challenges.splice(0, 6);

    return userChallengeData;
}

export default challengeData;
