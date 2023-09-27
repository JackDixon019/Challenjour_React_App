import { createContext } from "react";

export const defaultChallengeContextData = {
    achievedTime: 0,
    category: "ALL CHALLENGES",
    challengeID: 1111111,
    description: "Some description",
    level: "NONE",
    name: "Default Andy",
    nextThreshold: 0,
    percentile: 0.69,
    thresholds: {
        IRON: 10,
        BRONZE: 20,
        SILVER: 30,
        GOLD: 40,
        PLATINUM: 50,
        DIAMOND: 60,
        EMERALD: 70,
        MASTER: 80,
    },
    value: 420,
};

const ChallengeContext = createContext(defaultChallengeContextData);

export default ChallengeContext;
