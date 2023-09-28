import { createContext } from "react";

export const defaultActiveCategory = "ALL CHALLENGES";

const ActiveCategoryContext = createContext(defaultActiveCategory);

export default ActiveCategoryContext;
