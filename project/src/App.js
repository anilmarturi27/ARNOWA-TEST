import React ,{useState,createContext}from 'react'
import Login from './Login'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Home'
import Nav from './Nv'
export const store =createContext();
const App = () => {
    const [token,setToken]=useState({tok:false,name:null,email:null});
  return (
    <div>
  
    <div>
    <store.Provider value={[token,setToken]} >
      
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>

        </Routes>
      </BrowserRouter>
      </store.Provider>
      
    </div>
    
     </div>
  )
}

export default App