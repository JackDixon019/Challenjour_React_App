import { useState } from "react";
import "./App.css";
import SearchFunction from "./components/SearchFunction";
import UserContext, { defaultUserContextData } from "./context/UserContext";

function App() {
    const [userData, setUserData] = useState(defaultUserContextData)
    
    return (
        <div className="App">
            <h1>League of Legends Challenge Info</h1>
            <UserContext.Provider  value={{userData, setUserData}}>
                <SearchFunction />
            </UserContext.Provider>
        </div>
    );
}

export default App;
