import React, { useState, useEffect } from 'react';

import './style.css';

const TrashPick=()=> {
  //const list = [[400,700],[570,834],[406,234],[640,389],[650,214]]
  const randomNumber = (min,max)=>{
    return Math.floor (Math.random() * (max - min + 1) + min)
  }
  const [trashList,setTrashList] = useState([])
  const [score,setScore] = useState(0)
  const [allTrash,setAllTrash] = useState(0)
  const setLocations=()=>{
    let c = 0
    let arr = []
    while (c < randomNumber(10,20)) {
      //arr.push([randomNumber(10,85),randomNumber(4,96)])
      arr.push({pos:[randomNumber(10,85),randomNumber(4,96)],display:true})
      c++
    }
    setTrashList(arr)
    setAllTrash(arr.length)
  }
  useEffect(()=>{
    setLocations()
  },[])
  const destroy = (index)=>{
    setScore(score + 1)
    const tempTrashList = [...trashList]
    tempTrashList[index].display = false;
    console.log(tempTrashList)
    //setTrashList(trashList.filter((el,i)=> i !== index))
  }
  const reset=()=>{
    setLocations()
    setScore(0)
  }
  const TrashItem =(props)=>{
    //455
    //control spawns 
    //rest
  
    const trashStyle={
      display: (props.display) ? 'block' : 'none',
      width:"30px",
      height:"30px",
      backgroundColor:"black",
      position:"absolute",
      zIndex:100,
      top:props.top + '%',
      left:props.left +'%',
      margin:0
    }
    return (<div onClick={()=>destroy(props.index)} style={trashStyle}></div>)
  }
  const SeaBackground = ()=>{
    const playground = {
      left: 0,
      width: "100%",
      height: "100%",
      background:"transparent"
    }
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
        <div style={playground}>
          {trashList.map((i,index)=>{
            return(<TrashItem key={index} index={index} top={i.pos[0]} left={i.pos[1]} display={i.display} />);
          })}
        </div>
      </div>
    </div>
    )
  }
  const WinScreen = ()=>{
    const close =()=>{
     setAllTrash(0)
    }
    return (
      <div className="winStyle">
        <div>
          <h2>Thanks for Cleaning up Remember to Recycle and Dispose Trash Properly in your Everyday Life <br/> We Only have One Planet </h2>
          <button onClick={close}>X</button> 
        </div>
          
      </div>
    )
  }
  const scoreStyle= {
    position:"fixed",
    top:0,
    padding:"7px",
    right: 15,
    marginTop:"5px",
    border:"1px solid #cacaca",
    borderRadius:"4px",
    background:"rgb(90 90 90)",
    fontFamily: "'Josefin Sans', sans-serif"

  }
  
  return (
    <div className="App">
      {(score === allTrash && score !== 0)?<WinScreen/>:null}
      <SeaBackground/>
      <span  className="text" style={scoreStyle}> current score is: {score} <button onClick={reset}> reset </button> </span> 
    </div>
  );
}

export default TrashPick;
