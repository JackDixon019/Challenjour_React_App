import UserSearch from "./UserSearch";
import { useState } from "react";
import SearchBar from "./SearchBar";


export default function SearchFunction() {
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

    // this is here because I got tired of typing lol
    function testSubmit(e){
        e.preventDefault();
        setSearchTerm('Dredgen Vale')
    }

    if (searchTerm){
        return (
            <div className="SearchFunction">
                <SearchBar handleSubmit={(e) => handleSubmit(e)} handleChange={(e) => handleChange(e)} testSubmit={(e) => testSubmit(e)} />
                <UserSearch username={searchTerm} />
            </div>
        );
    } else {
        return (
            <div className="SearchFunction">
                <SearchBar handleSubmit={(e) => handleSubmit(e)} handleChange={(e) => handleChange(e)} testSubmit={(e) => testSubmit(e)} />
            </div>

        )
    }
}