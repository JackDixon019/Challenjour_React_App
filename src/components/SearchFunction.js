import UserSearch from "./UserSearch";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserContext, { defaultUserContextData } from "../context/UserContext";

export default function SearchFunction() {
    const [text, setText] = useState("");

    const [userData, setUserData] = useState(defaultUserContextData)


    // text is the value in the search bar
    function handleChange(e) {
        setText(e.target.value);
    }

    // Prevents refresh on submit, changes searchTerm  to text
    // searchTerm is used to perform the search
    function handleSubmit(e) {
        e.preventDefault();
        setUserData({name: text});
    }

    // this is here because I got tired of typing lol
    function testSubmit(e) {
        e.preventDefault();
        setUserData({name: "Dredgen Vale"});
    }

    if (userData.name) {
        return (
            <div className="SearchFunction">
                <SearchBar
                    handleSubmit={(e) => handleSubmit(e)}
                    handleChange={(e) => handleChange(e)}
                    testSubmit={(e) => testSubmit(e)}
                />
                <UserContext.Provider  value={{userData, setUserData}}>
                    <UserSearch />
                </UserContext.Provider>
            </div>
        );
    } else {
        return (
            <div className="SearchFunction">
                <SearchBar
                    handleSubmit={(e) => handleSubmit(e)}
                    handleChange={(e) => handleChange(e)}
                    testSubmit={(e) => testSubmit(e)}
                />
            </div>
        );
    }
}
