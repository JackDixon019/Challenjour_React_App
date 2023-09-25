import React from "react";
import challengeData from "./ChallengeData";
import ChallengeResults from "./ChallengeResults";

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

    async getUserData(username){
        console.log(username)
        let apiResponse = await fetch(
            // combines the api root, the search user path,
            // the username being searched, and the api key
            API_ROOT + SEARCH_USER + username + API_KEY
        );
        // Throw error on 404
        if (apiResponse.status === 404) {
            throw Error("404: Summoner not found");
        }
        // converts to json
        let apiData = await apiResponse.json();
        return apiData
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
                console.log(this.props.username)
                let apiUserData = await this.getUserData(this.props.username)
                // updates status to contain returned data
                this.setState({
                    userData: apiUserData,
                    lastSearchedName: this.props.username,
                });

                // fetches challenge data
                let userChallengeDataObject = await challengeData(apiUserData.puuid);

                this.setState({ userChallengeData: userChallengeDataObject });
            }
        } catch (error) {
            console.log(error.message);
            // updates last searched name state, and error message
            this.setState({
                lastSearchedName: this.props.username,
                errorMessage: `Error: ${error.message}`,
                userData: {},
            });
        }
    }

    // component only loads in when search is submitted for first time
    async componentDidMount(props) {
        this.searchUser(props);
    }
    // searches again when component updates: i.e. when searchTerm changes
    async componentDidUpdate(props) {
        console.log("updating")
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


