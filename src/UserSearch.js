import React from "react";

// root of api calls
const API_ROOT = "https://oc1.api.riotgames.com";

// returns a players names and id's (including PUUID value)
const SEARCH_USER = "/lol/summoner/v4/summoners/by-name/"; // {summonerName}

// Access a player's challenge data via PUUID
const CHALLENGE_DATA = "/lol/challenges/v1/player-data/"; // {puuid}

// Delete this nephew
const API_KEY = "?api_key=RGAPI-d8559efe-d2e4-4e20-86a3-04e6780ceadd";

export default class UserSearch extends React.Component {
    constructor() {
        super();

        this.state = {
            userData: {},
            lastSearchedName: "",
        };
    }

    async componentDidUpdate(props) {
        if (this.props.username === "") {
            this.setState({ userData: {} });
        }
        if (this.props.username !== this.state.lastSearchedName) {
            let apiResponse = await fetch(
                API_ROOT + SEARCH_USER + this.props.username + API_KEY
            );
            if (apiResponse.status === 404) {
                throw new Error("404: Summoner not found");
            }
            let apiData = await apiResponse.json();
            this.setState({ userData: apiData });
            this.setState({ lastSearchedName: this.props.username });
        }
    }
    async componentDidMount(props) {
        console.log(`updating component`);
        if (this.props.username === "") {
            this.setState({ userData: {} });
        }
        if (this.props.username !== this.state.userData.name) {
            let apiResponse = await fetch(
                API_ROOT + SEARCH_USER + this.props.username + API_KEY
            );
            if (apiResponse.status === 404) {
                throw new Error("404: Summoner not found");
            }
            let apiData = await apiResponse.json();
            this.setState({ userData: apiData });
        }
    }

    render() {
        if (this.state.userData.puuid) {
            return (
                <div>
                    <h1>User found: {this.state.userData.name}</h1>
                </div>
            );
        } else return <h1>Searching</h1>;
    }
}
