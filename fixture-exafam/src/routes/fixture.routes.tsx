import { Route, Routes } from "react-router-dom";
import Admin from "../pages/admin";
import { Fixture } from "../pages/fixture";
import Home from "../pages/home";
import Login from "../pages/login";
import Promocion from "../pages/promocion";
import { RegisterPromocion } from "../pages/register-promocion";

const FixtureRoutes = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" />
          <Route path="/admin/registrar-fixture" element={<Fixture />} />
          <Route path="/registrar-promociones" element={<Promocion />} />
          <Route
            path="/registrar-promociones/create/:id"
            element={<RegisterPromocion />}
          />
        </Route>
      </Routes>
    </>
  );
};
export default FixtureRoutes;
