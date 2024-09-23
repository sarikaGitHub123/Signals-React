import logo from './logo.svg';
import './App.css';
import './signals.css'
import { useEffect, useRef, useState } from 'react';

const signalsObject = [{name:'red',time:15, next:'yellow'},{name:'yellow',time:5,next:'green'},{name:'green',time:10,next:'red'}]


function App() {
 const [signals, setSignals] = useState(signalsObject)
 const [activeSignal,setActiveSignal] = useState(signals[0].name)
 const [timePassed, setTimePassed] = useState(0)
 const [seconds, setSeconds] = useState('');
 const [signalsChanged, setSignalsChanged] = useState(false)
 const timeRef = useRef(null)

 const handleChange = (e)=>{
   console.log('ee',e.target.value)
   setActiveSignal(e.target.value)
   setTimePassed(0)
 }

 const onTimeAdded = (e)=>{
  setSeconds(e.target.value)
  setSignalsChanged(true)
  const newSignals = signals.map((i)=>{
    if(i.name==activeSignal){
      i.time = i.time + +e.target.value
    }
    return i
  })
  setSignals(newSignals)
 }
 useEffect(()=>{
  const originalSignalObj = [{name:'red',time:15, next:'yellow'},{name:'yellow',time:5,next:'green'},{name:'green',time:10,next:'red'}]

  signals.forEach(i => {
    if(i.name == activeSignal && timePassed==i.time){
      setTimePassed(0)
      setActiveSignal(i.next)
      if(signalsChanged){
        console.log('its triggred')
        setSignals(originalSignalObj)
        setSignalsChanged(false)
        setSeconds('')
      }
    }
    
  });
 },[timePassed,activeSignal,signalsChanged])

 useEffect(()=>{
  timeRef.current = setInterval(()=>{
    setTimePassed(prev=>prev+1)   
  },1000)
  return ()=>{
    if(timeRef.current){
      clearInterval(timeRef.current)
    }
  }
 })

 useEffect(()=>{
   console.log('signalss',signals)
 },[signals])

  return (
    <div>
      <div 
      className='mainBox'
      // style={{padding:10, display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}
      >
      
      <h1>Signals</h1>

      <label htmlFor="options">Choose Signal:</label>
      <h1>Timer : {timePassed}</h1>
      <div style={{display:'flex',}}>
      <label>Add extra seconds in current active signal: </label>
      <input
          type="number" // Use text to control user input
          value={seconds}
          onChange={onTimeAdded}
        />
      </div>
      <select id="options" value={activeSignal} onChange={handleChange} style={{marginBottom:10}}>
        <option value="">Select an signal</option>
        <option value="red">red</option>
        <option value="yellow">yellow</option>
        <option value="green">green</option>
      </select>
      {signals.map((i)=>{
        return(
          <div className='signalCircle' style={{backgroundColor:i.name, opacity:activeSignal==i.name?1:0.5}}/>
        )
      })}
      </div>
      
    </div>
  );
}

export default App;
