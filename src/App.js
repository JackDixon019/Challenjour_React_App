import "./App.css";
import SearchFunction from "./components/SearchFunction";
import { UserProvider } from "./context/UserContext";
import { ChallengeProvider } from "./context/ChallengeContext";
import { ActiveCategoryProvider } from "./context/ActiveCategoryContext";
import { ActiveIndexProvider } from "./context/ActiveIndexContext";

function App() {
    // I swear, this time it really was the aliens
    return (
        <div className="App">
            <h1>League of Legends Challenge Info</h1>
            <UserProvider>
                <ChallengeProvider>
                    <ActiveIndexProvider>
                        <ActiveCategoryProvider>
                            <SearchFunction />
                        </ActiveCategoryProvider>
                    </ActiveIndexProvider>
                </ChallengeProvider>
            </UserProvider>
        </div>
    );
}

export default App;
