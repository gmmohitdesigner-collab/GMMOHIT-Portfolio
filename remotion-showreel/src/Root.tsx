import "./index.css";
import { Composition } from "remotion";
import { Showreel } from "./Showreel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
