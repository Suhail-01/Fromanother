import React from 'react';
import Home from './Home';
import SliderSection from "./components/SliderSection/SliderSection";
import VerticalSliderSection from "./components/VerticalSliderSection/VerticalSliderSection";
import TeamSection from "./components/TeamSection/TeamSection";
import CircularTextSection from "./components/CircularTextSection/CircularTextSection";
export default function App() {
  return (
    <>
      <Home />
      <SliderSection />
      <TeamSection />
      <VerticalSliderSection />
      <CircularTextSection />
    </>

  );
}