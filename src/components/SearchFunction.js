import UserSearch from "./UserSearch";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import UserContext from "../context/UserContext";

export default function SearchFunction() {
    let username = useContext(UserContext).userData.name;

    if (username) {
        return (
            <div className="SearchFunction">
                <SearchBar />
                <UserSearch />
            </div>
        );
    } else {
        return (
            <div className="SearchFunction">
                <SearchBar />
            </div>
        );
    }
}
