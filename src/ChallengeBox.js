export default function ChallengeBox(props) {
    let challenge = props.challengeData.challenges[props.index]
    let className = "challengeBox " + challenge.level

    
    // Only displays the description if the index of the box matches the state of the parent element
    if (props.isActive) {
        return (
            <div className={className}>
                <h3>{challenge.name}</h3>
                <h4>{challenge.level}</h4>
                <p>{challenge.description}</p>
                <h5>Current Score: {challenge.value}</h5>
                <h5>Next Rank: {challenge.nextThreshold}</h5>
            </div>
        );
    } else {
        return (
            <div className={className} onClick={props.handleClick}>
                <h3>{challenge.name}</h3>
                <h4>{challenge.level}</h4>
            </div>
        );
    }
}

