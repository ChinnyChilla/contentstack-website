import { FunctionComponent } from "react";
import Milestones from "../components/Milestones";
import AwardCard from "../components/AwardCard";
import PhotoText from "../components/PhotoText";
import EarthCard from "../components/EarthCard";
import BirthdayCard from "../components/BirthdayCard";
import SimpleText from "../components/SimpleText";
import Leaderboard from "../components/Leaderboard";
import BoostCard from "../components/BoostCard";
import "./GlassMorphismTestingWithMil.css";

const GlassMorphismTestingWithMil: FunctionComponent = () => {
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
      <AwardCard />
      <PhotoText />
      <EarthCard />
      <BirthdayCard />
      <SimpleText />
      <Leaderboard />
      <BoostCard />
    </div>
  );
};

export default GlassMorphismTestingWithMil;