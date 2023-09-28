import { useContext } from "react";
import ActiveIndexContext from "../context/ActiveIndexContext";
import ActiveCategoryContext from "../context/ActiveCategoryContext";

export default function ChallengeBox(props) {
    let challenge = props.singleChallengeData;
    let className = "challengeBox " + challenge.level;

    let { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);
    let activeCategory = useContext(ActiveCategoryContext).activeCategory

    // Checks for whether a given challenge is in the currently active category
    function checkActiveCategory(currentChallenge) {
        return activeCategory === currentChallenge.category || activeCategory === "ALL CHALLENGES";
    }

    // Only displays the details if the index of the box matches the state of the parent element
    if (activeIndex === props.index) {
        return (
            <div className={className}>
                <h3>{challenge.name}</h3>
                <h4>{challenge.level}</h4>
                <p>{challenge.description}</p>
                <h5>Current Score: {challenge.value}</h5>
                {/* displays threshold for next tier, or current percentile if there is no next tier */}
                {challenge.nextThreshold ? (
                    <h5>Next Tier: {challenge.nextThreshold}</h5>
                ) : (
                    <h5>
                        {/* Kinda wild that this is how to add whitespace in react */}
                        Current Percentile:{" "}
                        {/* Why on god's green earth is this the correct way to round numbers to 2 sig. figs..... */}
                        {Number(Math.round(challenge.percentile * 100 + "e2") + "e-2") + "%"}
                    </h5>
                )}
            </div>
        );
    } else {
        if (checkActiveCategory(challenge)) {
            return (
                // Changes the activeIndex value on click --> opens challenge description
                <div className={className} onClick={() => setActiveIndex(props.index)}>
                    <h3>{challenge.name}</h3>
                    <h4>{challenge.level}</h4>
                </div>
            );
        }
    }
}
