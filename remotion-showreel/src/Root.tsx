import "./index.css";
import { Composition, Still } from "remotion";
import { Showreel } from "./Showreel";
import { OpenGraphCard } from "./OpenGraphCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="OpenGraphCard"
        component={OpenGraphCard}
        width={1200}
        height={630}
      />
      <Composition
        id="OpenGraphCard-Animated"
        component={OpenGraphCard}
        durationInFrames={30}
        fps={30}
        width={1200}
        height={630}
      />
      <Composition
        id="Showreel"
        component={Showreel}
        durationInFrames={480}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
