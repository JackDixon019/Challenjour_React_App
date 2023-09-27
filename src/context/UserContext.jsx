import { createContext } from "react"

export const defaultUserContextData = {
    puuid: null,
    name: "",
    challengeData: {},
}

const UserContext = createContext(defaultUserContextData);

export default UserContext