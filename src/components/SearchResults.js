import CategoriesSidebar from "./CategoriesSidebar";

import { useState } from "react";
import ChallengeResults from "./ChallengeResults";

export default function SearchResults(props) {
    let currentScore = 0;

    // babe wake up, new source of truth just dropped
    const [activeIndex, setActiveIndex] = useState(false);
    const [activeCategory, setActiveCategory] = useState("ALL CHALLENGES");

    // sets the currentScore according the the current category
    props.challengeData.categories.forEach((category) => {
        if (category.name === activeCategory) {
            currentScore = category.value;
        }
    });

    // Here is where I would put my data validation checks...
    // IF I HAD ONE
    function changeActiveCategory(category) {
        setActiveCategory(category);
        setActiveIndex(false);
    }
    function changeActiveIndex(index) {
        setActiveIndex(index);
    }

    return (
        <div id="resultsPage">
            <h2>Current Category: {activeCategory}</h2> <h2>Score: {currentScore}</h2>
            <CategoriesSidebar
                challengeData={props.challengeData}
                handleClick={(category) => {
                    changeActiveCategory(category);
                }}
                activeCategory={activeCategory}
            />
            <ChallengeResults
                challengeData={props.challengeData}
                handleClick={(index) => {
                    changeActiveIndex(index);
                }}
                activeIndex={activeIndex}
                activeCategory={activeCategory}
            />
        </div>
    );
}
