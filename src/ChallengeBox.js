export default function ChallengeBox(props) {
    let challenge = props.challengeData.challenges[props.index];
    let className = "challengeBox " + challenge.level;

    // Only displays the details if the index of the box matches the state of the parent element
    if (props.isActive) {
        return (
            <div className={className}>
                <h3>{challenge.name}</h3>
                <h4>{challenge.level}</h4>
                <p>{challenge.description}</p>
                <h5>Current Score: {challenge.value}</h5>
                {/* displays threshold for next tier, or current percentile if there is no next tier */}
                {challenge.nextThreshold ? (
                    <h5>Next Tier: {challenge.nextThreshold}</h5>
                ) : (
                    // Why on god's green earth is this the correct way to round numbers to 2 sig. figs.....
                    <h5>Current Percentile: {Number(Math.round((challenge.percentile * 100) + 'e2') + 'e-2') + "%"}</h5>
                )}
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
