import React from "react"
import Milestones from "../components/Milestones";
import Leaderboard from "../components/Leaderboard";
import PhotoGallery from "../components/PhotoGallery"
import EarthCard from "../components/EarthCard";
import "./GlassMorphismTestingWithMil.css";


class GlassMorphismTestingWithMil extends React.Component {


render() {

  return (
	
    <div className="glassmorphism-testing-with-mil">
      <img
        className="glassmorphism-testing-with-mil-child"
        alt=""
        src="/ellipse-22.svg"
      />
      <img
        className="glassmorphism-testing-with-mil-item"
        alt=""
        src="/ellipse-26.svg"
      />
      <img
        className="glassmorphism-testing-with-mil-inner"
        alt=""
        src="/ellipse-24.svg"
      />
      <img className="ellipse-icon" alt="" src="/ellipse-23.svg" />
      <img
        className="glassmorphism-testing-with-mil-child1"
        alt=""
        src="/ellipse-25.svg"
      />
      <Milestones />
		  <EarthCard />
		<Leaderboard />
	  <PhotoGallery />
      
    </div>
  );
}
};

export default GlassMorphismTestingWithMil;
