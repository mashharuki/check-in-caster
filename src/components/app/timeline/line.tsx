"use client";

import { useEffect, useState } from "react";

const Line: React.FC = () => {
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    function findLineHeight() {
      const timelinePoints = document.querySelectorAll(".timeline-point");
      const firstPoint = timelinePoints[0] as HTMLElement | null;
      const lastPoint = timelinePoints[
        timelinePoints.length - 1
      ] as HTMLElement | null;

      if (!firstPoint || !lastPoint) return;

      const height =
        lastPoint.offsetTop +
        lastPoint.offsetHeight / 2 -
        firstPoint.offsetTop -
        firstPoint.offsetHeight / 2;
      setLineHeight(height);
    }

    findLineHeight();
    window.addEventListener("resize", findLineHeight);
    return () => window.removeEventListener("resize", findLineHeight);
  }, []);

  return (
    <div
      className="absolute left-[39px] top-5 w-[2px] transform bg-[#6D5FB5] transition-all duration-1000"
      style={{
        height: `${lineHeight}px`,
      }}
    />
  );
};

export default Line;
