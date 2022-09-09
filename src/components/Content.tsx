import React from "react";

type Props = {
  windowHeight: number;
  currentFeature: string;
};

export default function Content({ windowHeight, currentFeature }: Props) {
  return (
    <div className="relative">
      <div
        className="absolute overflow-scroll"
        style={{ paddingBottom: 200, height: windowHeight }}
        dangerouslySetInnerHTML={{
          __html: currentFeature,
        }}
      ></div>
    </div>
  );
}
