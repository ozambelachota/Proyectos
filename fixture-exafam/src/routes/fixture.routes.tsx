import { Route, Routes } from "react-router-dom"
import Home from "../pages/home"
import Admin from "../pages/admin"
import { Fixture } from "../pages/fixture"
import PromocionalForm from "../pages/promociones"


const FixtureRoutes = ()=>{
  return (
  <Routes>
    <Route path="/fixture" element={<Fixture/> } />
    <Route path='/' element={<Home/>} />
    <Route path='/admin/fixture' element={<Admin/>} /> 
    <Route path="/create" element={<PromocionalForm/>} />
  </Routes>
  )
}
export default FixtureRoutes