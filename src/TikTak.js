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
    const emptySpace = [0,1,2,3,4,5,6,7,8]
    // 0 1 2
    // 3 4 5
    // 6 7 8
    //win conditions 012 345 678 036 147 258 048 246
    const [currentPlayer,setCurrentPlayer] = useState('X')
    const [score,setScore] = useState(defaultScore)
    const [freeSpace,setFreeSpace] = useState(emptySpace)
    const [closeWin,setCloseWin] = useState([])
    const [winner,setWinner] = useState({player:0,location:[]})
    const winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,6,4]]
    const addScore = (i) =>{
        //console.log("current score", score[index])
        if(score[i] === 0 && winner.player === 0){
            setScore({...score,[i]:currentPlayer}) 
            freeSpace.pop([i])
            if(currentPlayer === 'X'){
                //computerAI(2)
                setCurrentPlayer('O')
            }else{
                setCurrentPlayer('X')
            }
            // setCloseWin([])   
        }
    } 
    const reset = ()=>{
        setScore(defaultScore)
        setCloseWin([]) 
        setWinner({player:0,location:[]})
        setCurrentPlayer('X')
        setFreeSpace([])
    }
    const computerAI = (type)=>{   
        const player = 4
        const moves = []
        const aiWin = 0
        let simScore = {...score}
        const checkSimWin=(arr,m)=>{
            winArray.forEach(vv =>{
                let outcome = {}
                let final = arr[vv[0]]+arr[vv[1]]+arr[vv[2]]
                switch(final){
                    case 3:
                        outcome = {score:-10,move:m}
                    break
                    case 12:
                        outcome = {score:10,move:m}
                    break
                }
                return outcome
            })
        }
        freeSpace.forEach(v =>{
            simScore = {...simScore,[v]:player}
            checkSimWin(simScore,v)

        })
        const randomMoves = ()=>{
            const pos = Math.floor (Math.random() * (freeSpace.length))
            addScore(freeSpace[pos])
        }
        // const smartMoves = ()=>{
        //     console.log('spaces',freeSpace)
        //     if(freeSpace.length >= 8){
        //         if (freeSpace.includes(4)) {
        //             addScore(4)
        //         }else{
        //             addScore(0)
        //         }
        //         console.log('first move')
        //         return null
        //     }else if (closeWin.length > 0){
        //         freeSpace.forEach(v =>{
        //             if(closeWin.includes(v)){
        //                 addScore(v)
        //                 console.log('ai def',v)
        //                 return null
        //             }
        //         })
        //     }else{
        //         winArray.forEach(v =>{
        //             console.log('ai f atk')
        //             let final = score[v[0]]+score[v[1]]+score[v[2]]
        //             console.log(`{score[v[0]]}+{score[v[1]]}+{score[v[2]]} = {final}`)
        //             switch(final){
        //                 case (player === 1 ? 2 : 8) :
        //                 case (player === 1 ? 1 : 4) :
        //                     v.forEach(vv=>{
        //                         if(freeSpace.includes(vv)){
        //                             console.log('ai atk',vv)
        //                             addScore(vv)
        //                             return null
        //                         }
        //                     }) 
        //                 break;
        //                 default:
        //                     addScore(freeSpace[0])
        //                     console.log('ai default')
        //                 break;
        //             }              
        //         })
        //     }
        // }  
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
            // let emptySpace = []
            // Object.keys(score).forEach(v=>{
            //     if(score[v] === 0){
            //         emptySpace.push(Number(v))
            //     }
            // })
            // setFreeSpace(emptySpace)
            winArray.forEach(v =>{
                //let final = score[v[0]]+score[v[1]]+score[v[2]]
                console.log('final',score[v[0]],score[v[1]],score[v[2]],'is true?',(score[v[0]] == score[v[1]] && score[v[1]] == score[v[2]]))    
                if(score[v[0]] === score[v[1]] && score[v[1]] === score[v[2]] && score[v[0] !== 0]){
                    setWinner({player:currentPlayer,location:v})
                }else if(setFreeSpace.length >= 9){
                    setWinner({player:'draw',location:[]})
                }    
                    // switch(final){
                    //     case 3:
                    //         setWinner({player:1,location:v})
                    //     break;
                    //     case 12:
                    //         setWinner({player:4,location:v})
                    //     break
                    //     case 2:
                    //         setCloseWin(v)
                    //     break
                    // }
                
            }) 
        }
        checkWin()
    },[score])
    // const changePlayer = ()=>{
    //     if(currentPlayer === 1){
    //         AI(2)
    //         setCurrentPlayer(4)
    //     }else{
    //         setCurrentPlayer(1)
    //     }
    // }
    const Box = (props) =>{
        const index = Number(props.index)
        let text = ''
        if((score[index] !== 0)){
            text = score[index]
        }
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
        return <div className="UI"><button onClick={reset}>Reset Game</button><button onClick={()=>computerAI(0)}>AI test</button><h1>{text}</h1></div>
    }
    return(
        <Grid/>
    )
}
export default TikTak
