import React from 'react';
import Slider from "../components/slider"
import "../styles/home.css";
function Home() {
  return(
   
    <div className="homepage">
    {/* First div with slider */}
    <div className="section">
        <Slider />
    </div>
  
</div>
  );
}

export default Home;
