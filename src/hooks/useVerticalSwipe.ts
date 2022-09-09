import { useEffect, useRef } from "react";

export default function useVerticalSwipe(windowHeight: number) {
  const ref = useRef(null);

  useEffect(() => {
    let slide = 0;
    let startPosition = 0;
    let xStart = 0;
    let delta = 0;
    let xDelta = 0;

    const touchStart = (e: TouchEvent) => {
      ref.current.style.transitionDuration = "0ms";
      startPosition = e.touches[0].clientY;
      xStart = e.touches[0].clientX;
    };

    const createTransform = (x = 0, y = 0, z = 0) =>
      `translate3d(${x}px, ${y}px, ${z}px)`;
    const createTransformY = (y: number) => createTransform(0, y, 0);

    const touchMove = (e: TouchEvent) => {
      const position = e.touches[0].clientY;
      const positionX = e.touches[0].clientX;

      // If they are viewing content they should no longer be able to slide down
      if (slide > 0 && position < startPosition) return;

      // If they are on the cover slide, they should not be able to slide up
      if (slide === 0 && position > startPosition) return;

      delta = startPosition - position;
      xDelta = xStart - positionX;

      // If they are sliding horizontally, they should not be able to slide vertically
      if (Math.abs(xDelta) > Math.abs(delta)) return;

      ref.current.style.transform = createTransformY(
        -delta - windowHeight * slide
      );
    };

    const SWIPE_DELTA_THRESHOLD = 200;
    const TRANSITION_MS = 500;
    const transitionDurationStringMs = `${TRANSITION_MS}ms`;

    const touchEnd = (e: TouchEvent) => {
      if (delta > SWIPE_DELTA_THRESHOLD) {
        // Slide down

        slide++;
        ref.current.style.transform = createTransformY(-windowHeight * slide);
        ref.current.style.transitionDuration = transitionDurationStringMs;
      } else if (delta < -SWIPE_DELTA_THRESHOLD) {
        // Slide up

        slide--;

        // Probably not necessary, but if this will prevent them from sliding to a negative space
        if (slide < 0) {
          slide = 0;
        }

        ref.current.style.transform = ref.current.style.transform =
          createTransformY(-windowHeight * slide);
        ref.current.style.transitionDuration = transitionDurationStringMs;
      } else {
        // Reset

        ref.current.style.transform = ref.current.style.transform =
          createTransformY(-windowHeight * slide);
        ref.current.style.transitionDuration = transitionDurationStringMs;
      }
      delta = 0;
      xDelta = 0;
    };

    document.body.addEventListener("touchstart", touchStart);
    document.body.addEventListener("touchend", touchEnd);
    document.body.addEventListener("touchmove", touchMove);

    return () => {
      document.body.removeEventListener("touchstart", touchStart);
      document.body.removeEventListener("touchend", touchEnd);
      document.body.removeEventListener("touchmove", touchMove);
    };
  }, []);
  return ref;
}
