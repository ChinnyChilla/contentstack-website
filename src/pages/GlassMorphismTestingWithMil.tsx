import Milestones from "../components/Milestones";
import EarthCard from "../components/EarthCard";
import Leaderboard from "../components/Leaderboard";
import BoostCard from "../components/BoostCard";
import AwardContent from "../components/AwardContent";
import PhotoText from "../components/PhotoText";
import "./GlassMorphismTestingWithMil.css";

const GlassMorphismTestingWithMil = () => {
  return (
    <div className="glassmorphism-testing-with-mil">
      <div className="wrapper-ellipse-24">
        <img
          className="wrapper-ellipse-24-child"
          alt=""
          src="/ellipse-24.svg"
        />
      </div>
      <div className="wrapper-ellipse-23">
        <img
          className="wrapper-ellipse-23-child"
          alt=""
          src="/ellipse-23.svg"
        />
      </div>
      <div className="wrapper-ellipse-25">
        <img
          className="wrapper-ellipse-25-child"
          alt=""
          src="/ellipse-25.svg"
        />
      </div>
      <section className="performer-details-parent">
        <div className="performer-details">
          <div className="wrapper-ellipse-22">
            <img
              className="wrapper-ellipse-22-child"
              alt=""
              src="/ellipse-22.svg"
            />
          </div>
          <Milestones />
        </div>
        <EarthCard />
        <Leaderboard />
      </section>
      <section className="boost-card-parent">
        <div className="boost-card-container">
          <BoostCard />
          <div className="award-card">
            <div className="wrapper-ellipse-26">
              <img
                className="wrapper-ellipse-26-child"
                alt=""
                src="/ellipse-26.svg"
              />
            </div>
            <div className="award-card1">
              <img
                className="award-card-child"
                alt=""
                src="/rectangle-47-1.svg"
              />
              <AwardContent />
              <div className="name-here">Name Here</div>
              <b className="thank-you-award">Thank You Award Recipient</b>
            </div>
          </div>
        </div>
        <div className="name-display">
          <PhotoText />
        </div>
        <div className="birthday-card-container-wrapper">
          <div className="birthday-card-container">
            <div className="birthday-card">
              <img
                className="birthday-card-child"
                alt=""
                src="/rectangle-47-1.svg"
              />
              <div className="birthday-content">
                <div className="birthday-avatar-container">
                  <AwardContent propPadding="0rem var(--padding-18xl)" />
                  <div className="birthday-name-greeting">
                    <div className="name-here1">Name Here</div>
                  </div>
                  <div className="happy-birthday">Happy Birthday!!</div>
                </div>
              </div>
              <div className="birthday-image-container">
                <img
                  className="image-10-icon"
                  loading="lazy"
                  alt=""
                  src="/image-10@2x.png"
                />
                <img
                  className="image-11-icon"
                  loading="lazy"
                  alt=""
                  src="/image-11@2x.png"
                />
              </div>
            </div>
            <div className="simple-text">
              <img
                className="simple-text-child"
                alt=""
                src="/rectangle-47-1.svg"
              />
              <div className="avatar-20-parent">
                <div className="avatar-20">
                  <img
                    className="frame-icon"
                    loading="lazy"
                    alt=""
                    src="/frame-11.svg"
                  />
                  <div className="frame">
                    <div className="text" />
                  </div>
                </div>
                <div className="name-here-wrapper">
                  <div className="name-here2">Name Here</div>
                </div>
              </div>
              <div className="this-is-just-simple-text-there-wrapper">
                <div className="this-is-just-container">
                  <p className="this-is-just">This is just simple text</p>
                  <p className="blank-line">&nbsp;</p>
                  <p className="blank-line1">&nbsp;</p>
                  <p className="there-is-no">
                    There is no image associated with this post
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlassMorphismTestingWithMil;
