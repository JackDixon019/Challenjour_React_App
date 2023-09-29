import { useState } from "react";
import "./App.css";
import SearchFunction from "./components/SearchFunction";
import UserContext, { defaultUserContextData } from "./context/UserContext";
import ChallengeContext, { defaultChallengeContextData } from "./context/ChallengeContext";
import ActiveIndexContext, { defaultActiveIndex } from "./context/ActiveIndexContext";
import ActiveCategoryContext, { defaultActiveCategory } from "./context/ActiveCategoryContext";

function App() {
    const [userData, setUserData] = useState(defaultUserContextData)
    const [challengeData, setChallengeData] = useState(defaultChallengeContextData)
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
    const [activeCategory, setActiveCategory] = useState(defaultActiveCategory)

    // I swear, this time it really was the aliens
    return (
        <div className="App">
            <h1>League of Legends Challenge Info</h1>
            <UserContext.Provider  value={{userData, setUserData}}>
                <ChallengeContext.Provider value={{challengeData, setChallengeData}} >
                    <ActiveIndexContext.Provider value={{activeIndex, setActiveIndex}} >
                        <ActiveCategoryContext.Provider value={{activeCategory, setActiveCategory}} >
                            <SearchFunction />
                        </ActiveCategoryContext.Provider>
                    </ActiveIndexContext.Provider>
                </ChallengeContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
