import { createContext } from "react";

export const defaultActiveIndex = {
    activeIndex: null,
};

const ActiveIndexContext = createContext(defaultActiveIndex);

export default ActiveIndexContext;
