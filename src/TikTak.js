import React,{useState,useEffect} from 'react'
import './tictak.css'
const TikTak = ()=>{
    // const defaultScore = {
    //     0:0,1:0,2:0,
    //     3:0,4:0,5:0,
    //     6:0,7:0,8:0,
    // }
    const defaultScore = [0,0,0,0,0,0,0,0,0]
    // 0 1 2
    // 3 4 5
    // 6 7 8
    //win conditions 012 345 678 036 147 258 048 246
    const [currentPlayer,setCurrentPlayer] = useState('X')
    const [boardState,setBoardState] = useState(defaultScore)
    const [winner,setWinner] = useState({player:null,location:[]})
    const winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,6,4]]
    const compareWin = (a,b,c) =>{
        return (a === b && b === c && c !== 0) 
    }
    const addScore = (i: number) =>{
        const switchPlayers = (p: String) =>{
            if(p === 'X'){
                //computerAI(2)
                setCurrentPlayer('O')
            }else{
                setCurrentPlayer('X')
            }
        }
        if(boardState[i] === 0 && winner.player === null && i != null){
            const newState = [...boardState]
            newState[i] = currentPlayer 
            setBoardState(newState) 

            // setBoardState({...boardState,[i]:currentPlayer}) 
            switchPlayers(currentPlayer)
        }
    } 
    const reset = ()=>{
        setBoardState(defaultScore)
        setWinner({player:null,location:[]})
        setCurrentPlayer('X')
    }
    const computerAI = (type :number)=>{   
        const AI = 'O'
        const human = 'X'
        let currentSim = AI
        const switchSim =()=>{
            currentSim = (currentSim === human) ? AI : human
        }
        const tryWin=(board)=>{
            let win = null
            winArray.forEach(v =>{
                if(compareWin(board[v[0]],board[v[1]],board[v[2]])){
                    win = board[v[0]]
                // }else if(!Object.values(simBoard).includes(0)){
                //     win = 'draw'
                // }  
                }else if(!(board).includes(0)){
                    win = 'draw'
                }             
            }) 
            return win
        }
        const copyBoard=(original,index?,newValue?)=>{
            const copiedBoard = [...original] 
            if(index != null && newValue != null){
                copiedBoard[index] = newValue
                switchSim()
            }
            return copiedBoard
        }
        const MinMaxAI =()=>{
            let outcome 
            
            let bestOutcome = {move:null, moveScore:-10000}
            // Object.keys(simBoard).forEach(v =>{
            //     if(simBoard[v] !== 0){
            //         simBoard = {...board,[v]:currentSim}
            //         if(currentSim === AI){
            //             outcome = minMax('max',simBoard,0)
            //         }else if(currentSim === human){
            //             outcome = minMax('min',simBoard,0)
            //         }

            //         if(outcome.moveScore > bestOutcome.moveScore){
            //             bestOutcome = outcome
            //         }

            //     }     
            // })
         
            boardState.forEach((v,i) =>{
                if(v === 0){
                    const simBoard = copyBoard(boardState,i,AI)
                    if(currentSim == AI){
                        outcome = minMax('max',simBoard,0)
                    }else if(currentSim == human){
                        outcome = minMax('min',simBoard,0)
                    }
                    console.log('outcome',outcome)
                    console.log('best outcome',bestOutcome)

                    if(outcome[0] > bestOutcome.moveScore){
                        bestOutcome = {move:outcome[1],moveScore:outcome[0]}
                    }

                }     
            })
            return bestOutcome
        }
        const minMax = (type :String, board, depth:number ) =>{
            let simBoard = board
            const scoreOutcome = {
                // AI: {move:null,moveScore:10},
                // human: {move:null,moveScore:-10},
                // 'draw':{move:null,moveScore:0}
                [AI]: 10,
                [human]: -10,
                'draw':0
            }
            if(tryWin(simBoard) != null){
                return scoreOutcome[tryWin(simBoard)]
            }
            //let outcome = {move:null, moveScore:(type == 'max')? -Infinity : +Infinity}
            //let outcome = (type == 'max')? -Infinity : +Infinity
            if(type == 'max'){
                    (simBoard).forEach((v,i) =>{
                        if(v === 0){
                            let outcome = [-10000,i] 
                            
                            const newSimBoard = copyBoard(simBoard,i,AI)
                            
                            const newOutcome = minMax('min',newSimBoard,depth+1)
                            return [Math.max(newOutcome[0], outcome[0]),i]
                        }
                    })
            }else if (type=='min'){
                    (simBoard).forEach((v,i) =>{
                        if(v === 0){
                           let outcome = [10000,i]
                            const newSimBoard =  copyBoard(simBoard,i,human)
                            
                            const newOutcome = minMax('max',newSimBoard,depth+1)
                            return [Math.min(newOutcome[0],outcome[0]),i]
                        }
                    })

            }


            // switch(type){
            //     case 'max':
            //         Object.keys(simBoard).forEach(v =>{
            //             if(simBoard[v] !== 0){
            //                 simBoard={...simBoard,[v]:AI}
            //                 switchSim()
            //                 let newOutcome = minMax('min',simBoard,depth+1)
            //                 outcome = {move:v,moveScore:Math.max(newOutcome.moveScore, outcome.moveScore)}
            //                 console.log('max',outcome)
            //             }
            //         })
            //     break;
            //     case 'min':
            //         Object.keys(simBoard).forEach(v =>{
            //             if(simBoard[v] !== 0){
            //                 simBoard={...simBoard,[v]:human}
            //                 switchSim()
            //                 let newOutcome = minMax('min',simBoard,depth+1)
            //                 outcome = {move:v,moveScore:Math.min(newOutcome.moveScore,outcome.moveScore)}
            //                 console.log('min',outcome)
            //             }
            //         })
            //     break;
            // }
            //return outcome
        }
        const randomMoves = ()=>{
            let freeSpace = []
            Object.keys(boardState).forEach(v=>{
                if(boardState[v] === 0){
                    freeSpace.push(Number(v))
                }
            })
            const pos = Math.floor (Math.random() * (freeSpace.length))
            addScore(freeSpace[pos])
        }
        const smartMoves=()=>{
            const finalPlay = MinMaxAI()
            console.log('ai', finalPlay)
            //addScore(finalPlay)
        }
        switch (type){
            case 0:
                randomMoves()
            break
            case 1:
                //mix               
            break
            case 2:
                smartMoves()
            break
        }
        return null
    } 
    useEffect(()=>{
        const checkWin=()=>{
            winArray.forEach(v =>{
                if(compareWin(boardState[v[0]],boardState[v[1]],boardState[v[2]])){
                    setWinner({player:boardState[v[0]],location:v})
                // }else if(!Object.values(boardState).includes(0)){
                //     setWinner({player:'draw',location:[]})
                // }  
                }else if(!(boardState).includes(0)){
                    setWinner({player:'draw',location:[]})
                }             
            }) 
        }
        checkWin()
    },[boardState])
    const Box = (props) =>{
        const index = Number(props.index)
        let text = (boardState[index] !== 0) ? boardState[index] : ''
        return (
            <div style={{background: winner.location.includes(index) ? "rgba(0,255,0,0.4)" : "rgba(255,255,255,0.3)"}} className="box" onClick={()=>{addScore(index)}}>
                <span>{text}</span>
            </div>
        )
    }      
    const Grid = ()=>{
        return (
            <div>
                <WinnerText/>
                <div className="nine_nine">
                    {/* {Object.keys(boardState).map(c =>{
                        return(<Box key={c} index={c}/>)
                    })} */}
                    {boardState.map( (c,index) =>{
                        return(<Box key={index} index={index}/>)
                    })}
                    
                </div> 
                <WinnerText/>
            </div>
        )
    }
    const WinnerText = () =>{
        let text=''
        switch(winner.player){
            case 'X':
                text = 'Player X wins'
            break
            case 'O':
                text = 'Player O wins'
            break
            case 'draw':
                text = 'Player\'s Draw'
            break
        }
        return <div className="UI"><button onClick={reset}>Reset Game</button><button onClick={()=>computerAI(2)}>AI test</button><h1>{text}</h1></div>
    }
    return(
        <Grid/>
    )
}
export default TikTak
