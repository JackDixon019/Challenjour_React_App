import React from "react";
import { useState } from "react";
import challengeData from "./ChallengeData";

// root of api calls
const API_ROOT = "https://oc1.api.riotgames.com";

// returns a players names and id's (including PUUID value)
const SEARCH_USER = "/lol/summoner/v4/summoners/by-name/"; // {summonerName}

// Delete this nephew
const API_KEY = "?api_key=RGAPI-9211b82e-0aa0-4a89-b86e-2a13813c9833";

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

    async componentDidMount(props) {
        this.searchUser(props);
    }
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
            return <h1>{this.state.errorMessage}</h1>;
        }
    }
}

function ChallengeResults(props) {
    const [activeIndex, setActiveIndex] = useState(8);

    function handleClick(index){
        setActiveIndex(index)
    }

    return (
        <div id="challengeResults">
            {Array(props.challengeData.challenges.length)
                .fill(null)
                .map((_, i) => {
                   return(<ChallengeBox index={i} isActive={activeIndex === i} handleClick={() => handleClick(i)} challengeData={props.challengeData} />)
                })}
        </div>
    );
}

function ChallengeBox( props ) {
    if(props.isActive){
        return (
            <div className="challengeBox">
                <h3>{props.challengeData.challenges[props.index].name}</h3>
                <h4>{props.challengeData.challenges[props.index].level}</h4>
                <p>{props.challengeData.challenges[props.index].description}</p>
            </div>
        )
    } else {
        console.log(props.isActive)
        return (
            <div className="challengeBox" onClick={props.handleClick}>
                <h3>{props.challengeData.challenges[props.index].name}</h3>
                <h4>{props.challengeData.challenges[props.index].level}</h4>
                {/* <button onClick={props.handleClick}> show</button> */}
            </div>
        )
    }
}
