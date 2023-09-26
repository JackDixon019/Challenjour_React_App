import ChallengeBox from "./ChallengeBox";
import React from "react";

export default function ChallengeResults(props) {
    // Checks for whether a given challenge is in the currently active category
    // NB: "All" is the name for "all challenges"
    function checkActiveCategory(activeCategory, currentChallenge) {
        return activeCategory === currentChallenge.category || activeCategory === "ALL CHALLENGES";
    }

    return (
        <div id="challengeResults">
            {/* Creates an empty array with the same number of elements as there are challenges  */}
            {Array(props.challengeData.challenges.length)
                .fill(null)
                // Maps a ChallengeBox element to each index of the array
                .map((_, i) => {
                    // Just to make things more legible
                    let currentChallenge = props.challengeData.challenges[i];

                    return (
                        <ChallengeBox
                            // sets the index prop to the index value in the array
                            key={i}
                            // Check for whether this is the active index
                            isActive={props.activeIndex === i}
                            //checks whether category is active
                            isActiveCategory={checkActiveCategory(
                                props.activeCategory,
                                currentChallenge
                            )}
                            // Changes the activeIndex value on click --> opens challenge description
                            handleClick={() => props.handleClick(i)}
                            // This is the data that will be used to populate the div
                            singleChallengeData={currentChallenge}
                        />
                    );
                })}
        </div>
    );
}
