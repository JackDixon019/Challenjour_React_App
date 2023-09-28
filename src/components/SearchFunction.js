import UserSearch from "./UserSearch";
import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserContext, { defaultUserContextData } from "../context/UserContext";

export default function SearchFunction() {

    let username = useContext(UserContext).userData.name

    if (username) {
        return (
            // <UserContext.Provider  value={{userData, setUserData}}>
                <div className="SearchFunction">
                    <SearchBar />
                        <UserSearch />
                </div>
            // </UserContext.Provider>
        );
    } else {
        return (
            // <UserContext.Provider  value={{userData, setUserData}}>
                <div className="SearchFunction">
                    <SearchBar />
                </div>
            // </UserContext.Provider>
        );
    }
}
