import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import useVerticalSwipe from "./hooks/useVerticalSwipe";
import useWindowHeight from "./hooks/useWindowHeight";

import FeatureSlide from "./components/FeatureSlide";
import Content from "./components/Content";
import { Feature } from "./types";
import { Swiper as SwiperEvent } from "swiper/types";

import "swiper/css";
import "./App.css";

import data from "./data.json";

export const App = () => {
  const [features, setFeatures] = useState(data as unknown as Feature[]);
  const [currentFeature, setCurrentFeature] = useState(
    features[0]["content-block-1"]
  );
  const windowHeight = useWindowHeight();
  const ref = useVerticalSwipe(windowHeight);

  const onFeatureChange = (e: SwiperEvent) => {
    setCurrentFeature(features[e.activeIndex]["content-block-1"]);
  };

  return (
    <div className="app-container">
      <div className="swipe-container" ref={ref}>
        <Swiper onSlideChange={onFeatureChange}>
          {features
            .filter((feature) => feature.photo)
            .map((feature) => {
              return (
                <SwiperSlide key={feature.photo.url}>
                  <FeatureSlide windowHeight={windowHeight} feature={feature} />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <Content windowHeight={windowHeight} currentFeature={currentFeature} />
      </div>
    </div>
  );
};
