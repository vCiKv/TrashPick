import {useState,useEffect} from 'react'
import './tictak.css'
const TikTak = ()=>{
    const defaultScore = {
        0:0,1:0,2:0,
        3:0,4:0,5:0,
        6:0,7:0,8:0,
    }
    const defaultSettings ={
        players:1,
        ai:'X',
        difficulty: 0,
        show:false
    }
    //const defaultScore = [0,0,0,0,0,0,0,0,0]
    // 0 1 2
    // 3 4 5
    // 6 7 8
    //win conditions 012 345 678 036 147 258 048 246
    const [currentPlayer,setCurrentPlayer] = useState('X')
    const [boardState,setBoardState] = useState(defaultScore)
    const [gameSettings,setGameSettings] = useState(defaultSettings)

    const [winner,setWinner] = useState({player:null,location:[]})
    const winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,6,4]]
    const compareWin = (a,b,c) =>{
        return (c !== 0 && b === c && a === b) 
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
            // const newState = [...boardState]
            // newState[i] = currentPlayer 
            // setBoardState(newState) 

            setBoardState({...boardState,[i]:currentPlayer}) 
            switchPlayers(currentPlayer)
        }
    } 
    const reset = ()=>{
        setBoardState(defaultScore)
        setWinner({player:null,location:[]})
        setCurrentPlayer('X')
    }
    const computerAI = (type :number, side :String)=>{   
        const AI = side
        const human = (side == 'X') ? 'O' : 'X'
     
        const copyBoard=(original :Object,index ?:any, newValue?:any)=>{
            const copiedBoard = {...original} 
            index = Number(index)
            if(index != null && newValue != null){
                copiedBoard[index] = newValue
            }
            return copiedBoard
        }     
        const miniMax = (board:Object, depth:number, isMax :Boolean ) =>{           
            const tryWin=(board :Object)=>{
                let win = null
                let check = true
                for (const i in winArray){
                    const v = winArray[i]                 
                    if(compareWin(board[v[0]],board[v[1]],board[v[2]])){
                        //console.log('this win belongs to',board[v[0]])
                        check = false
                        if(board[v[0]] == AI){
                            win = 10
                        }else{
                            win = -10
                        }
                    }  
                }
                if(!Object.values(board).includes(0) && check){
                    win = 0
                } 
                return win
            }
            if(typeof(tryWin(board)) == 'number'){
                return tryWin(board)
            }
      
            if(isMax){
                for (const v in board){              
                    if(board[v] === 0){
                        const outcome = -100
                        let simBoard = copyBoard(board,v,AI)
                        //const simBoard = {...board,[v]:AI}

                        //console.log('max',simBoard)
                        const newOutcome = miniMax(simBoard,depth+1,!isMax)
                        //simBoard = copyBoard(board,v,0)
                        //console.log('max-score', (typeof(newOutcome) == 'undefined') ?  outcome : Math.max(outcome,newOutcome) - depth)
                        //console.log('returned', {type:'max',move:v,score:(typeof(newOutcome) == 'undefined') ? outcome : Math.max(outcome,newOutcome),depth:depth})
                        return (typeof(newOutcome) == 'undefined') ? outcome : Math.max(outcome,newOutcome) - depth
                        //return Math.max(outcome,newOutcome) - depth       
                    }
                }
            }else{
                for (const v in board){
                    if(board[v] === 0){
                        const outcome = 100
                        let simBoard = copyBoard(board,v,human)
                        //const simBoard = {...board,[v]:human}
                    
                        //console.log('min',simBoard)
                        const newOutcome = miniMax(simBoard,depth+1,!isMax)
                        //simBoard = copyBoard(board,v,0)
                        //console.log('min-score', (typeof(newOutcome) == 'undefined') ?  outcome : Math.min(outcome,newOutcome) + depth)
                        //console.log('returned', {type:'min',move:v,score:(typeof(newOutcome) == 'undefined') ? outcome : Math.min(outcome,newOutcome),depth:depth})
                        return (typeof(newOutcome) == 'undefined') ?  outcome : Math.min(outcome,newOutcome) + depth
                        //return Math.min(outcome,newOutcome) + depth
                    }
                }
            }
        }
        const AImove =()=>{
            let move
            let bestOutcome = -100
            for(const v in boardState){
                if(boardState[v] === 0){
                    let simBoard = copyBoard(boardState,v,AI)
                    const outcome = miniMax(simBoard,0,true)
                    console.log('move',v,'outcome',outcome)
                    if(outcome > bestOutcome){
                        bestOutcome = outcome
                        move = Number(v)
                    }
                }          
            }
            return {move:move,outcome:bestOutcome}
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
            const finalPlay = AImove()
            console.log('ai', finalPlay)
            addScore(finalPlay.move)
            return null
        }

        smartMoves()
        // switch (type){
        //     case 0:
        //         randomMoves()
        //     break
        //     case 1:
        //         //mix               
        //     break
        //     case 2:
        //         smartMoves()
        //     break
        // }
        return null
    } 
    useEffect(()=>{
        const checkWin=()=>{
            let check = true 
            for (const i in winArray){
                const v = winArray[i]
                
                if(compareWin(boardState[v[0]],boardState[v[1]],boardState[v[2]])){
                    setWinner({player:boardState[v[0]],location:v})
                    check = false
                }
            }
            if(!Object.values(boardState).includes(0) && check){
                setWinner({player:'draw',location:[]})
               
            } 
            // winArray.forEach(v =>{
          
            // }) 
          
        }
        checkWin()
    },[boardState])
     
    const Grid = ()=>{
        const Box = (props) =>{
            const index = Number(props.index)
            let text = (boardState[index] !== 0) ? boardState[index] : ''
            return (
                <div style={{background: winner.location.includes(index) ? "rgba(0,255,0,0.4)" : "rgba(255,255,255,0.3)"}} className="box" onClick={()=>{addScore(index)}}>
                    <span>{text}</span>
                </div>
            )
        }  
        const Settings=()=>{
            const UI=()=>{
                const selected=(key,val,player)=>{
                    if(player < 2){
                        if(gameSettings[key] == val && player<2){
                            return 'option selected'
                        }
                    }
                    // }else{
                    //     if(gameSettings[key] == val){
                    //         return 'selected'
                    //     }
                    // }
                    return 'option'
                }
                return(
                    <div className="settings">
                        <div className="container">
                        <button className="close" onClick={()=>{setGameSettings({...gameSettings,['show']:!gameSettings.show})}}>close</button>
                        <h2>Game Settings</h2>
                        <div>
                            <p className="header">select side</p>
                            <span className={selected('ai','O',gameSettings.players)} onClick={()=>{setGameSettings({...gameSettings,['ai']:'O'})}}>X</span>
                            <span className={selected('ai','X',gameSettings.players)} onClick={()=>{setGameSettings({...gameSettings,['ai']:'X'})}}>O</span>
                        </div>
                        <div>
                            <p className="header">ai settings</p>
                            <span className={(gameSettings.players === 2)?'option selected':'option'} onClick={()=>{setGameSettings({...gameSettings,['players']:2})}}>play human</span>
                            <span className={selected('difficulty',0,gameSettings.players)} onClick={()=>{setGameSettings({...gameSettings,['difficulty']:0,['players']:1})}}>easy</span>
                            <span className={selected('difficulty',1,gameSettings.players)} onClick={()=>{setGameSettings({...gameSettings,['difficulty']:1,['players']:1})}}> medium</span>
                            <span className={selected('difficulty',2,gameSettings.players)} onClick={()=>{setGameSettings({...gameSettings,['difficulty']:2,['players']:1})}}>expert</span>
                        </div>
                    </div>
                </div>
                )
            }
            return gameSettings.show && <UI/>
               
            

         
        }
        const WinnerText = () =>{
            let winnerText=null
            let currentPlayerText = (currentPlayer == 'X') ? 'X\'s Turn' : 'O\'s Turn'  
            switch(winner.player){
                case 'X':
                    winnerText = 'Player X wins'
                break
                case 'O':
                    winnerText = 'Player O wins'
                break
                case 'draw':
                    winnerText = 'Player\'s Draw'
                break
            }
            return( 
                <div className="UI">
                    <div className="col">
                        <button className="red"onClick={reset}>Reset Game</button><button onClick={()=>{setGameSettings({...gameSettings,['show']:!gameSettings.show})}}>settings</button>
                    </div>
                    <button onClick={()=>computerAI(gameSettings.difficulty,gameSettings.ai)}>AI test</button>
                    <h3>{!winnerText && currentPlayerText}</h3>
                    <h1>{winnerText}</h1>
                    <Settings/>
                </div>
            )
        }
        return (
            <div>
                <WinnerText/>
                <div className="nine_nine">
                    {Object.keys(boardState).map(c =>{
                        return(<Box key={c} index={c}/>)
                    })}                    
                </div> 
            </div>
        )
    }
   
    return(
        <Grid/>
    )
}
export default TikTak
