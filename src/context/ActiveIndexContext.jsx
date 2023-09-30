import { createContext, useState } from "react";

export const defaultActiveIndex = {
    activeIndex: null,
};

const ActiveIndexContext = createContext(defaultActiveIndex);

export function ActiveIndexProvider(props){

    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
    return(
        <ActiveIndexContext.Provider value={{activeIndex, setActiveIndex}} >
            {props.children}
        </ActiveIndexContext.Provider>
    )
};

export default ActiveIndexContext