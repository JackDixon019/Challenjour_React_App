import { createContext, useState } from "react";

export const defaultActiveCategory = "ALL CHALLENGES";

const ActiveCategoryContext = createContext(defaultActiveCategory);

export default ActiveCategoryContext;

export function ActiveCategoryProvider(props){
    const [activeCategory, setActiveCategory] = useState(defaultActiveCategory)

    return(
        <ActiveCategoryContext.Provider value={{activeCategory, setActiveCategory}} >
            {props.children}
        </ActiveCategoryContext.Provider>
    )
}
