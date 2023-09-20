import React from "react";

// root of api calls
const API_ROOT = "https://oc1.api.riotgames.com";

// returns a players names and id's (including PUUID value)
const SEARCH_USER = "/lol/summoner/v4/summoners/by-name/"; // {summonerName}

// Delete this nephew
const API_KEY = "?api_key=RGAPI-d8559efe-d2e4-4e20-86a3-04e6780ceadd";

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
        // TODO: update this section to show the challenge information
        if (this.state.userData.puuid) {
            return (
                <div>
                    <h1>User found: {this.state.userData.name}</h1>
                </div>
            );
        } else {
            return <h1>{this.state.errorMessage}</h1>;
        }
    }
}
