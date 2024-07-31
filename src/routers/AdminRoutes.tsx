import { lazy } from "react";
import { Route } from "react-router-dom";

const About = lazy(() => import("pages/About"));
const Services = lazy(() => import("pages/Services"));

export default function AdminRoutes() {
  return (
    <>
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
    </>
  );
}
