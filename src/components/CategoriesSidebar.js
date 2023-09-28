import { useContext } from "react";
import CategoryBox from "./CategoryBox";
import ChallengeContext from "../context/ChallengeContext";

export default function CategoriesSidebar(props) {
    let challengeData = useContext(ChallengeContext).challengeData;

    return (
        <div id="categories">
            <h2>Categories</h2>
            {/* Creates an empty array with the same number of elements as there are challenges  */}
            {Array(challengeData.categories.length)
                .fill(null)
                // Maps a ChallengeBox element to each index of the array
                .map((_, i) => {

                    let category = challengeData.categories[i]

                    return (
                        <CategoryBox
                            // sets the index prop to the index value in the array
                            key={i}
                            // Check for whether this is the active index
                            isActive={
                                props.activeCategory === category.name
                            }
                            // Changes the activeIndex value on click --> opens challenge description
                            handleClick={() => {
                                props.handleClick(category.name);
                            }}
                            // This is the data that will be used to populate the div
                            singleCategoryData={category}
                        />
                    );
                })}
        </div>
    );
}
