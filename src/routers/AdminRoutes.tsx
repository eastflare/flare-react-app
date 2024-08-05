import { Route } from "react-router-dom";
import loadable from "@loadable/component";

const About = loadable(() => import("pages/About"));
const Services = loadable(() => import("pages/Services"));

export default function AdminRoutes() {
  return (
    <>
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
    </>
  );
}
