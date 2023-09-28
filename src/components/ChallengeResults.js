import ChallengeContext from "../context/ChallengeContext";
import ChallengeBox from "./ChallengeBox";
import React, { useContext } from "react";

export default function ChallengeResults() {
    let challenges = useContext(ChallengeContext).challengeData.challenges;

    return (
        <div id="challengeResults">
            {/* Creates an empty array with the same number of elements as there are challenges  */}
            {Array(challenges.length)
                .fill(null)
                // Maps a ChallengeBox element to each index of the array
                .map((_, i) => {
                    // Just to make things more legible
                    let currentChallenge = challenges[i];
                    return (
                        <ChallengeBox
                            // sets the key prop to the index value in the array
                            key={i}
                            // index prop is used to set activeIndex value
                            index={i}
                            // This is the data that will be used to populate the div
                            singleChallengeData={currentChallenge}
                        />
                    );
                })}
        </div>
    );
}
