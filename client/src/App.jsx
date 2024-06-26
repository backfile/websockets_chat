import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login.jsx"
import { Chat } from "./pages/Chat.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { useState } from "react"


function App(){
  const [render, setRender] = useState() 

  let tokenExistAndStillValid = (parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now())

  function parseJwt (token) {
    if(token){
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }else{
      return(false)
    }
}
  return(
    <div>
      {tokenExistAndStillValid ? <Chat setRender={setRender}></Chat> : <Login setRender={setRender}></Login>}
    </div>
  )

}

export default App