class LeaderBoard {
  constructor() {
    this.board = [];
  }

  _find(player_id) {
    return this.board.map(players => players.player).indexOf(player_id);
  }

  add_score(player_id, score) {
    let average = 0;
    let findPlayer = this._find(player_id);
    if (findPlayer > 0) {
      this.board[findPlayer].allScores.push(score);
      let total = this.board[findPlayer].allScores.reduce(
        (acc, num) => acc + num,
        0
      );
      average = total / this.board[findPlayer].allScores.length;
    }

    if (findPlayer === -1) {
      this.board.push({
        player: player_id,
        allScores: [score]
      });
      return score;
    }
    return Math.round(average * 10) / 10;
  }

  top() {
    let averagedPlayer = [];
    let playerList = [];
    for (let i = 0; i <= this.board.length - 1; i++) {
      let total = this.board[i].allScores.reduce((acc, num) => acc + num, 0);
      let average = total / this.board[i].allScores.length;
      averagedPlayer.push({
        player: this.board[i].player,
        average: average
      });
    }
    let sortedPlayers = averagedPlayer.sort((a, b) =>
      a.average < b.average ? 1 : -1
    );
    sortedPlayers.forEach(player => {
      playerList.push(player.player);
    });
    return playerList;
  }
  reset(player_id) {
    let findPlayer = this._find(player_id);
    this.board[findPlayer].allScores = [];
  }
}

let scoreBoard = new LeaderBoard();
scoreBoard.add_score(1, 50);
scoreBoard.add_score(1, 60);
scoreBoard.add_score(2, 70);
scoreBoard.top();
scoreBoard.reset(3);
scoreBoard._find(4);
console.log("===================");
console.log(scoreBoard);
console.log("===================");
