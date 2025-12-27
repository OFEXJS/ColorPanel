import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface RainbowBackgroundProps {
  animationDuration?: number;
  speed?: number;
}

const RainbowBackground: React.FC<RainbowBackgroundProps> = ({
  animationDuration = 30000,
  speed = 1,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const colors = [
    "#FF006E",
    "#FB5607",
    "#FFBE0B",
    "#FFEE32",
    "#83C5BE",
    "#80FFDB",
    "#72DDF7",
    "#4895EF",
    "#4361EE",
    "#3F37C9",
    "#8338EC",
    "#B5179E",
    "#FF006E",
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "rainbow-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient
      .selectAll("stop")
      .data(colors)
      .enter()
      .append("stop")
      .attr("offset", (_, i) => `${(i / (colors.length - 1)) * 100}%`)
      .attr("stop-color", (d) => d)
      .attr("stop-opacity", 0.9);

    // 用两倍宽度，保证平移时始终铺满
    const rect = svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "200%")
      .attr("height", "100%")
      .attr("fill", "url(#rainbow-gradient)");

    const animate = () => {
      rect
        .attr("transform", "translate(0,0)")
        .transition()
        .duration(animationDuration / speed)
        .ease(d3.easeLinear)
        .attr("transform", "translate(-50%,0)")
        .on("end", animate);
    };

    animate();

    return () => {
      svg.selectAll("*").remove();
    };
  }, [animationDuration, speed]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default RainbowBackground;
