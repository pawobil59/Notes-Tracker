import { Routes, Route, Navigate, BrowserRouter} from "react-router-dom"
import react from "react"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/PortectedRoute"

//Function to log user out
function Logout() {
  localStorage.clear()
  return <Navigate to= "/login"/>
}

//clear local storage first to avoid submitting a refresh toekn to the register route
function RegisterAndLogout() {

  localStorage.clear()
  return <Register />

}
//the home component is wrapped around the protected route so only authenticated users can access it
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<RegisterAndLogout />}/>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/logout" element={<Logout />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
