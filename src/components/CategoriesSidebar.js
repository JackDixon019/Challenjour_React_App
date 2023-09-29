import { useContext } from "react";
import CategoryBox from "./CategoryBox";
import ChallengeContext from "../context/ChallengeContext";

export default function CategoriesSidebar() {
    let categoryData = useContext(ChallengeContext).challengeData.categories;

    return (
        <div id="categories">
            <h2>Categories</h2>
            {/* Creates an empty array with the same number of elements as there are challenges  */}
            {Array(categoryData.length)
                .fill(null)
                // Maps a ChallengeBox element to each index of the array
                .map((_, i) => {
                    let category = categoryData[i];

                    return (
                        <CategoryBox
                            key={i}
                            // This is the data that will be used to populate the div
                            singleCategoryData={category}
                        />
                    );
                })}
        </div>
    );
}
