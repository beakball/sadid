import React from "react";
import Testimonials from "../../Components/Testimonials";

const Home = () => {
  return (
    <div className="w-full h-screen">
      <Testimonials />
      <div className="h-[100vh]"></div>
      <Testimonials />
    </div>
  );
};

export default Home;
