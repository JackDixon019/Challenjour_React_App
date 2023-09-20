import "./App.css";
import SearchFunction from "./SearchFunction";

function App() {
    try {
        return (
            <div className="App">
                <h1>League of Legends Summoner Search</h1>
                <SearchFunction />
            </div>
        );
    } catch (error) {
        console.log("Error: " + error.message);
    }
}

export default App;
