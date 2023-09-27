import { createContext } from "react"

export const defaultActiveIndex = {
    activeIndex: 0
}

const ActiveIndexContext = createContext(defaultActiveIndex);

export default ActiveIndexContext