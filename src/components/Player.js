import "./Player.scss"

export default function Player(props) {
    // the event listener callback
    const onClickIncrement =()=>{
        //call the callback prop passed down frommthe scoreboard
    props.incrementScore(props.id)
    }
    return (
      <li className="Player">
        <div
        className="percentage_coloring"
        style={{ width: props.score + "%" }}
      />
        <p>{props.name} (score: {props.score})</p>
        <button onClick= {onClickIncrement}>increment</button>
      </li>
    );
  }