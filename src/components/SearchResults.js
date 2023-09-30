import CategoriesSidebar from "./CategoriesSidebar";

import { useContext} from "react";
import ChallengeResults from "./ChallengeResults";
import ChallengeContext from "../context/ChallengeContext";
import ActiveCategoryContext from "../context/ActiveCategoryContext";

export default function SearchResults() {

    let challengeData = useContext(ChallengeContext).challengeData
    let activeCategory = useContext(ActiveCategoryContext).activeCategory
    
    let currentScore = 0;

    // sets the currentScore according the the current category
    challengeData.categories.forEach((category) => {
        if (category.name === activeCategory) {
            currentScore = category.value;
        }
    });

    return (
        <div id="resultsPage">
            <h2>Current Category: {activeCategory}</h2> <h2>Score: {currentScore}</h2>
            <CategoriesSidebar />
            <ChallengeResults />
        </div>
    );
}
