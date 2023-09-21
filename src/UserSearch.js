import React from "react";
import { useState } from "react";
import challengeData from "./ChallengeData";

const API_ROOT = process.env.REACT_APP_API_ROOT
const SEARCH_USER = process.env.REACT_APP_SEARCH_USER
const API_KEY = process.env.REACT_APP_API_KEY

export default class UserSearch extends React.Component {
    constructor() {
        super();

        this.state = {
            userData: {},
            // This saves from accidentally calling API
            lastSearchedName: "",
            // Defaults to searching, replaced when error occurs
            errorMessage: "Searching",
        };
    }

    // Searches for user by username
    // Sets state.userData to the API's returned data
    async searchUser(props) {
        try {
            // If no text entered, sets to default
            if (this.props.username === "") {
                this.setState({ userData: {}, lastSearchedName: "" });
            }
            // Checks name being searched != last searched name
            if (this.props.username !== this.state.lastSearchedName) {
                let apiResponse = await fetch(
                    // combines the api root, the search user path,
                    // the username being searched, and the api key
                    API_ROOT + SEARCH_USER + this.props.username + API_KEY
                );
                // Throw error on 404
                if (apiResponse.status === 404) {
                    throw Error("404: Summoner not found");
                }
                // converts to json
                let apiData = await apiResponse.json();
                // updates status to contain returned data
                this.setState({
                    userData: apiData,
                    lastSearchedName: this.props.username,
                });
                let userChallengeDataObject = await challengeData(
                    apiData.puuid
                );
                this.setState({ userChallengeData: userChallengeDataObject });
            }
        } catch (error) {
            console.log(error.message);
            // updates last searched name state, and error message
            this.setState({
                lastSearchedName: this.props.username,
                errorMessage: `Error: ${error.message}`,
            });
        }
    }

    // component only loads in when search is submitted for first time
    async componentDidMount(props) {
        this.searchUser(props);
    }
    // searches again when component updates: i.e. when searchTerm changes
    async componentDidUpdate(props) {
        this.searchUser(props);
    }

    render() {
        // Checks for both user id and that there is challenge data available
        // then returns challenge data presented in readable form
        if (this.state.userData.puuid && this.state.userChallengeData) {
            return (
                <div>
                    <h1>User found: {this.state.userData.name}</h1>
                    <ChallengeResults
                        challengeData={this.state.userChallengeData}
                    ></ChallengeResults>
                </div>
            );
        } else {
            // This isn't in a catch block, because it uses the error message to display the "Searching" screen
            return <h1>{this.state.errorMessage}</h1>;
        }
    }
}

function ChallengeResults(props) {
    // babe wake up, new source of truth just dropped
    const [activeIndex, setActiveIndex] = useState(false);

    return (
        <div id="challengeResults">
            {/* Creates an empty array with the same number of elements as there are challenges  */}
            {Array(props.challengeData.challenges.length)
                .fill(null)
                // Maps to each element of the array, a ChallengeBox element
                .map((_, i) => {
                    return (
                        <ChallengeBox
                            index={i}
                            // Check for whether this is the active index
                            isActive={activeIndex === i}
                            // Changes the activeIndex value on click --> opens challenge description
                            handleClick={() => setActiveIndex(i)}
                            // This is the data that will be used to populate the div
                            challengeData={props.challengeData}
                        />
                    );
                })
            }
        </div>
    );
}

function ChallengeBox(props) {
    let challenge = props.challengeData.challenges[props.index]

    // Only displays the description if the index of the box matches the state of the parent element
    if (props.isActive) {
        return (
            <div className="challengeBox">
                <h3>{challenge.name}</h3>
                <h4>{challenge.level}</h4>
                <p>{challenge.description}</p>
            </div>
        );
    } else {
        return (
            <div className="challengeBox" onClick={props.handleClick}>
                <h3>{challenge.name}</h3>
                <h4>{challenge.level}</h4>
            </div>
        );
    }
}
