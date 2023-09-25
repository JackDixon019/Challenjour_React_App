import CategoriesSidebar from "./CategoriesSidebar";

import ChallengeBox from "./ChallengeBox";
import { useState } from "react";

export default function ChallengeResults(props) {
    // babe wake up, new source of truth just dropped
    const [activeIndex, setActiveIndex] = useState(false);
    const [activeCategory, setActiveCategory] = useState("TOTAL SCORE");

    return (
        <div id="resultsPage">
            <CategoriesSidebar
                challengeData={props.challengeData}
                handleClick={(category) => {
                    setActiveCategory(category);
                    setActiveIndex(false);
                }}
                activeCategory={activeCategory}
            />
            <div id="challengeResults">
                {/* Creates an empty array with the same number of elements as there are challenges  */}
                {Array(props.challengeData.challenges.length)
                    .fill(null)
                    // Maps a ChallengeBox element to each index of the array
                    .map((_, i) => {
                        return (
                            <ChallengeBox
                                // sets the index prop to the index value in the array
                                key={i}
                                // Check for whether this is the active index
                                isActive={activeIndex === i}
                                //checks whether category is active
                                isActiveCategory={
                                    activeCategory ===
                                        props.challengeData.challenges[i]
                                            .category ||
                                    activeCategory === "TOTAL SCORE"
                                }
                                // Changes the activeIndex value on click --> opens challenge description
                                handleClick={() => setActiveIndex(i)}
                                // This is the data that will be used to populate the div
                                singleChallengeData={
                                    props.challengeData.challenges[i]
                                }
                            />
                        );
                    })}
            </div>
        </div>
    );
}
