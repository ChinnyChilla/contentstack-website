import React from "react"
import Milestones from "../components/High5";
import Leaderboard from "../components/Leaderboard";
import PhotoGallery from "../components/PhotoGallery"
import EarthCard from "../components/EarthCard";
import "./GlassMorphismTestingWithMil.css";


class GlassMorphismTestingWithMil extends React.Component {


render() {

  return (
	
    <div className="background">
      
      <Milestones />
		  {/* <EarthCard /> */}
		<Leaderboard />
	  <PhotoGallery />
      
    </div>
  );
}
};

export default GlassMorphismTestingWithMil;
