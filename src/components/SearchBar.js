import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function SearchBar() {
    const { setUserData } = useContext(UserContext);
    const [text, setText] = useState("");

    // // text is the value in the search bar
    function handleChange(e) {
        setText(e.target.value);
    }

    // Prevents refresh on submit, changes searchTerm  to text
    // searchTerm is used to perform the search
    function handleSubmit(e) {
        e.preventDefault();
        setUserData({ name: text });
    }

    // this is here because I got tired of typing lol
    function testSubmit(e) {
        e.preventDefault();
        setUserData({ name: "TestUser" });
    }

    return (
        <form>
            <label htmlFor="nameSearch">Enter name: </label>
            <input
                type="text"
                name="nameSearch"
                id="nameSearch"
                onChange={(e) => handleChange(e)}
            />
            <button type="submit" id="nameSearchSubmit" onClick={(e) => handleSubmit(e)}>
                Search
            </button>
            <button type="submit" id="testSubmit" onClick={(e) => testSubmit(e)}>
                Load Test Data{" "}
            </button>
        </form>
    );
}
