import About from "pages/About";
import Services from "pages/Services";
import { Route } from "react-router-dom";

export default function AdminRoutes() {
  return (
    <>
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
    </>
  );
}
