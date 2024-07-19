import React from "react"
import High5 from "../components/High5";
import Leaderboard from "../components/Leaderboard";
import PhotoGallery from "../components/PhotoGallery"
import SplashScreen from "../components/Splashscreen";
import "./GlassMorphismTestingWithMil.css";


class GlassMorphismTestingWithMil extends React.Component {


render() {

  return (
	
    <div className="background">
      
      <High5 />
		<Leaderboard />
	  <PhotoGallery />
      <SplashScreen />
    </div>
  );
}
};

export default GlassMorphismTestingWithMil;
