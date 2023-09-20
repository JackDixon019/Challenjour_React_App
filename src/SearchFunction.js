import UserSearch from "./UserSearch";
import { useState } from "react";

function SearchBar({ handleSubmit, handleChange }) {
    return (
        <form>
            <label for="nameSearch">Enter name: </label>
            <input type="text" name="nameSearch" id="nameSearch" onChange={(e) => handleChange(e)} />
            <button type="submit" id="nameSearchSubmit" onClick={(e) => handleSubmit(e)}>
                Search
            </button>
        </form>
    );
}

function SearchFunction() {
    const [text, setText] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    
    // text is the value in the search bar
    function handleChange(e){
        setText(e.target.value)
    }

    // Prevents refresh on submit, changes searchTerm  to text
    // searchTerm is used to perform the search
    function handleSubmit(e){
        e.preventDefault();
        setSearchTerm(text)
    }

    if (searchTerm){
        return (
            <div className="SearchFunction">
                <SearchBar handleSubmit={(e) => handleSubmit(e)} handleChange={(e) => handleChange(e)} />
                <UserSearch username={searchTerm} />
            </div>
        );
    } else {
        return (
            <div className="SearchFunction">
                <SearchBar handleSubmit={(e) => handleSubmit(e)} handleChange={(e) => handleChange(e)} />
            </div>

        )
    }
}

export default SearchFunction