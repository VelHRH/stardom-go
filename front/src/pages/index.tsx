import { FC } from "react";

import SectionButton from "../components/SectionButton";

const Index: FC = () => {
 return (
  <div className="flex p-16 justify-around">
   <SectionButton
    imgUrl="https://i.ibb.co/DWZrRYq/F7-Vnf-Ytb-QAAdh-T3.jpg"
    link="/matches"
   >
    All matches
   </SectionButton>
   <SectionButton
    imgUrl="https://i.ibb.co/7JZVWCH/Fd-PATna-AAAYw-XG.jpg"
    link="/matches/grandprix"
   >
    5STAR Grand Prix
   </SectionButton>
  </div>
 );
};

export default Index;
