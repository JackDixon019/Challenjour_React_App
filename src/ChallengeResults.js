import ChallengeBox from "./ChallengeBox";
import { useState } from "react";

export default function ChallengeResults(props) {
    // babe wake up, new source of truth just dropped
    const [activeIndex, setActiveIndex] = useState(false);

    return (
        <div id="challengeResults">
            {/* Creates an empty array with the same number of elements as there are challenges  */}
            {Array(props.challengeData.challenges.length)
                .fill(null)
                // Maps to each element of the array, a ChallengeBox element
                .map((_, i) => {
                    return (
                        <ChallengeBox
                            // sets the index prop to the index value in the array
                            index={i}
                            // Check for whether this is the active index
                            isActive={activeIndex === i}
                            // Changes the activeIndex value on click --> opens challenge description
                            handleClick={() => setActiveIndex(i)}
                            // This is the data that will be used to populate the div
                            challengeData={props.challengeData}
                        />
                    );
                })
            }
        </div>
    );
}
