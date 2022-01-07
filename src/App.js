import React, { useState } from 'react';
import TikTak from './TikTak.js'
import TrashPick from './TrashPick.js'
import './style.css';

function App() {
  const [tab,setTab] = useState(true)
  const changeTab = ()=>{
    setTab(!tab)
  }
  const menuStyle = {
    position:"fixed",
    left:0,
    top:0,
    padding:"15px",
    borderRadius:"5px",
    border:"1px solid grey"
  }
  return(
    <div>
      <button onClick={changeTab} style={menuStyle}>change App</button>
      {tab ? <TrashPick/>:<TikTak/>}

    </div>
  )
}

export default App;
