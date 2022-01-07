import React,{useState,useEffect} from 'react'
import './tictak.css'
const TikTak = ()=>{
    const defaultScore = {
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
    }
    // 0 1 2
    // 3 4 5
    // 6 7 8
    //win conditions 012 345 678 036 147 258 048 246
    const [currentPlayer,setCurrentPlayer] = useState(1)
    const [score,setScore] = useState(defaultScore)
    const [winner,setWinner] = useState({player:0,location:[]})
    const winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,6,4]]
    const AI = ()=>{     
        let frequency = {}
        let fullWinArray = []
        let freeSpace = []
        
        winArray.forEach(v=>{
            v.forEach(vv=>{
                fullWinArray.push(vv)
            })
        })
        fullWinArray.forEach(v => frequency[v] ? frequency[v]++ : frequency[v] = 1)
        Object.keys(score).forEach(v=>{
            if(score[v] === 0){
                freeSpace.push[v]
            }
        })
        
    }
    const reset = ()=>{
        setScore(defaultScore)
        setWinner({player:0,location:[]})
        setCurrentPlayer(1)
    }
    useEffect(()=>{
        const checkWin=()=>{
            let emptySpace = 0
            Object.keys(score).forEach(v=>{
                if(score[v] !== 0){
                    emptySpace++
                }
            })
            winArray.forEach(v =>{
                let final = score[v[0]]+score[v[1]]+score[v[2]]
                if(final === 3){
                    setWinner({player:1,location:v})
                }
                else if(final === 12){
                    setWinner({player:4,location:v})
                }else if(emptySpace >= 9){
                    setWinner({player:9,location:[]})
                }
            }) 
        }
        checkWin()
    },[score])
    const changePlayer = ()=>{
        if(currentPlayer === 1){
            setCurrentPlayer(4)
        }else{
            setCurrentPlayer(1)
        }
    }
  
    const Box = (props) =>{
        const index = Number(props.index)
        const addScore = () =>{
            //console.log("current score", score[index])
            if(score[index] === 0 && winner.player === 0){
                setScore({...score,[index]:currentPlayer})    
                changePlayer()
            }
        } 
        let text = ''
        if((score[index] !== 0)){
            text = (score[index] === 1) ? 'X':'O'
        }
        return (
            <div style={{background: winner.location.includes(index) ? "rgba(0,255,0,0.4)" : "rgba(255,255,255,0.3)"}} className="box" onClick={()=>{addScore()}}>
                <span>{text}</span>
            </div>
        )
    }    
    
    const Grid = ()=>{
        return (
            <div>
                <WinnerText/>
                <div className="nine_nine">
                    {Object.keys(score).map(c =>{
                        return(<Box key={c} index={c}/>)
                    })}
                </div> 
                <WinnerText/>
            </div>
        )
    }
    const WinnerText = () =>{
        let text=''
        switch(winner.player){
            case 1:
                text = 'Player X wins'
            break
            case 4:
                text = 'Player O wins'
            break
            case 9:
                text = 'Players Draw'
            break
        }
        return <div className="UI"><button onClick={reset}>Reset Game</button><button onClick={AI}>AI test</button><h1>{text}</h1></div>
    }
    return(
        <Grid/>
    )
}
export default TikTak
