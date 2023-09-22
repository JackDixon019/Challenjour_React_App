export default function SearchBar({ handleSubmit, handleChange, testSubmit }) {
    return (
        <form>
            <label for="nameSearch">Enter name: </label>
            <input type="text" name="nameSearch" id="nameSearch" onChange={(e) => handleChange(e)} />
            <button type="submit" id="nameSearchSubmit" onClick={(e) => handleSubmit(e)}>
                Search
            </button>
            <button type="submit" id="testSubmit" onClick={(e)=>testSubmit(e)}>Load Test Data </button>
        </form>
    );
}