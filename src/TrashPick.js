import React, { useEffect, useState } from 'react';
import './style.css';

const TrashPick=()=> {
  //const list = [[400,700],[570,834],[406,234],[640,389],[650,214]]
  const randomNumbers = (minY,maxY,minX,maxX)=>{
    return [Math.floor (Math.random() * (maxY - minY + 1) + minY),Math.floor (Math.random() * (maxX - minX + 1) + minX)]
  }
  const [trashList,setTrashList] = useState([])
  const getLocations=()=>{
    let c = 0
    let arr = []
    while (c < 10) {
      arr.push(randomNumbers(470,650,200,1200))
      c++
    }
    setTrashList(arr)
  }
  const [score,setScore] = useState(0)
  useEffect(()=>{
    getLocations()
  },[])
  const destroy = (index)=>{
    setScore(score + 1)
    setTrashList(trashList.filter((el,i)=> i !== index))
  }
  const reset=()=>{
    getLocations()
    setScore(0)
  }
  const TrashItem =(props)=>{
    //455
    //control spawns 
    //rest
  
    const trashStyle={
      width:"30px",
      height:"30px",
      backgroundColor:"black",
      position:"absolute",
      zIndex:100,
      top:props.top,
      left:props.left
    }
    return (<div onClick={()=>destroy(props.index)} style={trashStyle}></div>)
  }
  const SeaBackground = ()=>{
    return(
    <div className="art-board">
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="stars2">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="moon">
        <div className="ship"><span></span></div>
      </div>
      <div className="light"></div>
      <div className="cloud1"><span></span></div>
      <div className="cloud2"><span></span></div>
      <div className="sea">
        <div className="beams"></div>
        <div className="beams"></div>
        <div className="beams"></div>
        <div className="beams"></div>
        <div className="text">
        </div>
      </div>
    </div>
    )
  }
  const scoreStyle= {
    position:"relative",
    top:0,
    padding:"7px",
    right: 10,
    marginTop:"5px"
  }
  return (
    <div className="App">
      <SeaBackground/>
      {/* <div className="play-area"> */}
      <span style={scoreStyle}> current score is: {score} <button onClick={reset}>reset </button> </span> 
      {trashList.map((i,index)=>{
        return(<TrashItem key={index} index={index} top={i[0]} left={i[1]} />)
      })}
        {/* <Credits/> */}
      {/* </div> */}
    </div>
  );
}

export default TrashPick;
