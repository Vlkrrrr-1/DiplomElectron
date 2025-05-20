import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import TransitionLogo from "../components/TransitionLogo";
import Second from "../components/Second";

const MainPage = () => {
  const [showLogo, setShowLogo] = useState<boolean>(true);
  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(false), 4500);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return <div>{showLogo ? <TransitionLogo /> : <Main />}</div>;
};

export default MainPage;
