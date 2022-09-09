import React from "react";
import { Feature } from "../types";

type Props = {
  windowHeight: number;
  feature: Feature;
};

export default function FeatureSlide({ windowHeight, feature }: Props) {
  return (
    <div style={{ height: windowHeight }} className="h-screen bg-blue-500">
      <img src={feature.photo.url} />
      <div className="p-2">
        <div className="font-inter font-bold text-2xl">{feature.name}</div>
        <div className="text-xl">{descriptionLorem}</div>
      </div>
    </div>
  );
}

const descriptionLorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
