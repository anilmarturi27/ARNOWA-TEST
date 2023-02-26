import { useContext,useEffect, useState } from 'react';
import { store } from './App';
import Table from './Table';

import { Navigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
    const [token,setToken] = useContext(store)
    // const [time, settime] = useState(false)
    const [prevLogs,setPrevLogs]=useState([])

    useEffect(()=>{
        console.log(token.email)
        axios.post("http://localhost:5000/home",{email:token.email,id:token.email}).then(res =>{
            console.log(res.data)
            setPrevLogs(res.data)
           
            
        })
    },[token.email])
    const [value,setValue]=useState("")
    let [curr, setCurr] = useState(300);
    const logout=()=>{
        axios.post("http://localhost:5000/home",{text:value,timeDuration:300-curr,email:token.email}).then(res =>{
            console.log(300-curr)
            alert("submited successfully")

            setToken({...token,tok:false})
            
        })
       
    } 
    console.log(prevLogs)

    useEffect(() => {
        setTimeout(timer, 1000); //for every 1 sec changing in time
    }, [curr]);
    function timer() {
        setCurr((prev) => {
            prev = prev - 1;
            return prev;
        });
    }
    let min = Math.floor(curr / 60);
    let sec = Math.floor(curr % 60);
    
    if (min > 0 && min < 10) {
        min = "0" + min;
    }
    if (sec > 0 && sec < 10) {
        sec = "0" + sec;
    }
    if (sec <= 0) {
        sec = "00";
        if (min === 0) {
            min = "00";
            // alert("time")
            logout()
        }
    }
  
    if(token.tok)
  return (
    <div>
        <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
            <h1 style={{color: "blue"}}>{token.name}</h1>
        </li>
        <li class="nav-item">
            <a >{min}:{sec}</a>
        </li>

        <li class="nav-item">
            <input onClick={logout} type="button" value="Logout  "/>
        </li>
    
        </ul>
        <center>
            
        <form>
            <textarea  onChange={(e)=>{console.log(value,e.target.value);setValue(e.target.value)}} value={value}className='aka' type="text" name="text" placeholder='Enter Message Here '/><br/><br/>
            <input onClick={logout} type="button" value="Submit"/>

        
        </form><br/>
        <h3>RECENT LOGINS</h3>
        </center><br/>
        <div class="table">
            <Table data={prevLogs}/>
        
        </div>
        
    </div>
  )
  else
    return <Navigate to='/' />
}

export default Home