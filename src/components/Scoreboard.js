import Player from "./Player";
import {useState} from "react";
import AddPlayerForm from "./AddPlayerForm"
import "./Scoreboard.scss"

function compare_score(player_a, player_b) {
    return player_b.score - player_a.score;
  }

function compare_name(player_a, player_b){
    return player_a.name.localeCompare(player_b.name)
}

export default function Scoreboard() {
    const [sort_by, set_sort_by] = useState("score");//either "score" or "name"
    const [players, set_players] = useState([
        {id: 1, name:"Nigel", score: 11},
        {id: 2, name:"Reese", score: 14},
        {id: 3, name:"Dominique", score: 4}, 
        {id: 4, name:"Sebastien", score: 42},
    ])

const players_sorted=[...players].sort(
    sort_by ==="name"?compare_name:compare_score
)

const change_sorting = (event) => {
    console.log("new sort order:", event.target.value);
    set_sort_by(event.target.value);
  };

  const incrementScore = id => {
    const new_players_array = players.map(player => {
      // decide whether this player's score needs to be incremented
      if (player.id === id) {
        // and if so, create a new player object,
        return {
          // but first copying over the player object's data
          ...player,
          // and then overriding the score property to be incremented
          score: player.score + 1,
        };
      } else {
        // else, just keep them
        return player;
      }
    });

    set_players(new_players_array);
}

const resetScores=()=>{
    const new_players_array = players.map(player=>({
        ...player,score: 0,
    }))
    set_players(new_players_array)
}

const randomScore=()=>{
    const new_players_array=players.map(player=>({
        ...player, score: Math.floor(Math.random()*101)
    }))
    set_players(new_players_array)
}

const addPlayer=name=>{
    console.log("Let's add a new player with the name:", name)
    set_players([...players,{
        id:Math.random(), // we should find a bettery way of defining id but this is good for now
        name,
        score:0,
    },
]);
};

  return (
    <div className="Scoreboard">
        <p>Sort order:{" "}
  <select onChange={change_sorting} value={sort_by}>
    <option value="score">Sort by score</option>
    <option value="name">Sort by name</option>
  </select>
        </p>
        <button onClick={resetScores}>Reset Scores</button>
        <button onClick={randomScore}>Random Scores</button>
      <p>Player's scores:</p>
      <ul>
        {players_sorted.map(player=>(
            <Player 
            key={player.id}
            id={player.id}
            name={player.name}
            score={player.score}
            incrementScore={incrementScore}
            />
        ))}
      </ul>
      <AddPlayerForm
        addPlayer={addPlayer}
      />
    </div>
  );
}