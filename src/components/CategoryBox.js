import { useContext } from "react";
import ActiveCategoryContext from "../context/ActiveCategoryContext";
import ActiveIndexContext from "../context/ActiveIndexContext";

export default function CategoryBox(props) {
    let category = props.singleCategoryData;
    let className = "categoryBox " + category.level;

    let { setActiveCategory } = useContext(ActiveCategoryContext);
    let { setActiveIndex } = useContext(ActiveIndexContext);

    return (
        <div
            className={className}
            onClick={() => {
                setActiveCategory(category.name);
                setActiveIndex(null);
            }}
        >
            <h3>{category.name}</h3>
        </div>
    );
}
// }
