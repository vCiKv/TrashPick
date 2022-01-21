import react,{useState} from 'react'

function OtherTikTak (){
    function bestMove() {
        // AI to make its turn
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (rBoard[i][j] == '') {
                updateBoard(i,j,ai)
                let score = minimax(board, 0, false);
                console.log('score',score)
                updateBoard(i,j,'')
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
          }
        }
        updateBoard(move.i,move.j,ai)

        currentPlayer = human;
    }
    
    let scores = {
    X: 10,
    O: -10,
    tie: 0
    };
    
    function minimax(board, depth, isMaximizing) {
        const simBoard = [...board]
        //console.log('sim board',simBoard)
        let result = checkWinner();
        if (result !== null) {
            return scores[result];
        }
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Is the spot available?
                    if (simBoard[i][j] == '') {
                        simBoard[i][j] = ai
                        let score = minimax(simBoard, depth + 1, false);
                        simBoard[i][j] = ''
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Is the spot available?
                    if (simBoard[i][j] == '') {
                        simBoard[i][j] = human
                        let score = minimax(simBoard, depth + 1, true);
                        simBoard[i][j] = ''
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      let ai = 'X';
      let human = 'O';
      let currentPlayer = human;
      const [rBoard,setRBoard] = useState(board)

      const updateBoard = (i,j,newValue)=>{
        const boardCopy = [...rBoard]
        boardCopy[i][j] = newValue
        setRBoard(boardCopy)
      }
      function equals3(a, b, c) {
        return a == b && b == c && a != '';
      }
      
      function checkWinner() {
        let winner = null;
      
        // horizontal
        for (let i = 0; i < 3; i++) {
          if (equals3(rBoard[i][0], rBoard[i][1], rBoard[i][2])) {
            winner = rBoard[i][0];
          }
        }
      
        // Vertical
        for (let i = 0; i < 3; i++) {
          if (equals3(rBoard[0][i], rBoard[1][i], rBoard[2][i])) {
            winner = rBoard[0][i];
          }
        }
      
        // Diagonal
        if (equals3(rBoard[0][0], rBoard[1][1], rBoard[2][2])) {
          winner = rBoard[0][0];
        }
        if (equals3(rBoard[2][0], rBoard[1][1], rBoard[0][2])) {
          winner = rBoard[2][0];
        }
      
        let openSpots = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (rBoard[i][j] == '') {
              openSpots++;
            }
          }
        }
      
        if (winner == null && openSpots == 0) {
          return 'tie';
        } else {
          return winner;
        }
      }
      
      function addScore(i,j) {
        if (currentPlayer == human) {
          // Human make turn
          // If valid turn
          if (rBoard[i][j] == '') {
            updateBoard(i,j,human)
            currentPlayer = ai;
           // bestMove();
          }
        }
      }
      const Grid = ()=>{
        const Box = (props) =>{
            const i = props.i
            const j = props.j

            // let text =  == '' ? ' ': rBoard[i][j]
            return(
                <div className="box" onClick={()=>{addScore(i,j)}}>
                    <span>{rBoard[i][j]}</span>
                </div>
            )
        } 
        const WinnerText = () =>{
            let text=''
            const winner = checkWinner()
            switch(winner){
                case ai:
                    text = `Player ${ai} wins`
                break
                case human:
                    text = `Player ${human} wins`
                break
                case 'tie':
                    text = 'Player\'s Draw'
                break
            }
            return <div className="UI"><button onClick={()=>bestMove()}>AI test</button><h1>{text}</h1></div>
        }    
        return (
            <div>
                <WinnerText/>
                <div className="nine_nine">
               
                {rBoard.map((v,i)=>
                    v.map((vv,j)=>{
                        return <Box i={i} j={j}/> 
                    })
                )} 
                
                    
                </div> 
                <WinnerText/>
            </div>
        )
    }
  
    return(
        <Grid/>
    ) 


}
export default OtherTikTak