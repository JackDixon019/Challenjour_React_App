export default function CategoryBox(props) {
    let category = props.singleCategoryData
    let className = "categoryBox " + category.level;

    return (
        <div className={className} onClick={props.handleClick}>
            <h3>{category.name}</h3>
        </div>
    );
    }
// }
