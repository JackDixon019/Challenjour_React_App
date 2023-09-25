import CategoryBox from "./CategoryBox";

export default function CategoriesSidebar(props) {
    return (
        <div id="categories">
            <h2>Categories</h2>
            {/* Creates an empty array with the same number of elements as there are challenges  */}
            {Array(props.challengeData.categories.length)
                .fill(null)
                // Maps a ChallengeBox element to each index of the array
                .map((_, i) => {
                    return (
                        <CategoryBox
                            // sets the index prop to the index value in the array
                            key={i}
                            // Check for whether this is the active index
                            isActive={
                                props.activeCategory ===
                                props.challengeData.categories[i].name
                            }
                            // Changes the activeIndex value on click --> opens challenge description
                            handleClick={() => {
                                props.handleClick(
                                    props.challengeData.categories[i].name
                                );
                            }}
                            // This is the data that will be used to populate the div
                            singleCategoryData={
                                props.challengeData.categories[i]
                            }
                        />
                    );
                })}
        </div>
    );
}
