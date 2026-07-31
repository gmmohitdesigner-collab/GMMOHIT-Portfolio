import "./index.css";
import { Composition, Still } from "remotion";
import { Showreel } from "./Showreel";
import { OpenGraphCard } from "./OpenGraphCard";
import { BehanceHeaderCard } from "./BehanceHeaderCard";
import { LinkedInHeaderCard } from "./LinkedInHeaderCard";
import { XHeaderCard } from "./XHeaderCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="XHeaderCard"
        component={XHeaderCard}
        width={1500}
        height={500}
      />
      <Still
        id="LinkedInHeaderCard"
        component={LinkedInHeaderCard}
        width={1584}
        height={396}
      />
      <Still
        id="BehanceHeaderCard"
        component={BehanceHeaderCard}
        width={3200}
        height={410}
      />
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
