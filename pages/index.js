import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import connectDB from "../lib/mongoose";
import Shop from "../model/shop";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(data[0].category);
  const [wheelData, setWheelData] = useState(
    data[0].items.map((item) => ({ option: item }))
  );
  const [showResult, setShowResult] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setShowResult(false);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    const newWheelData = data
      .find((d) => d.category === category)
      .items.map((item) => ({ option: item }));
    setWheelData(newWheelData);
  };

  const handleStopSpinning = () => {
    setShowResult(true);
    setMustSpin(false);
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.selectMenu}
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {data.map((d, index) => (
          <option key={index} value={d.category}>
            {d.category}
          </option>
        ))}
      </select>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        onStopSpinning={handleStopSpinning}
        backgroundColors={["#40E0D0", "#00BFFF", "#FFD700", "#FFA500"]}
        fontFamily="Bebas Neue"
        textColors={["#00008B"]}
        radiusLineColor="#ccc"
        outerBorderColor="#ccc"
        outlineWidth={2}
        spinDuration={0.2}
      />
      <button className={styles.spinButton} onClick={handleSpinClick}>
        SPIN
      </button>
      {showResult && (
        <div className={styles.currentData}>
          {wheelData[prizeNumber].option}
        </div>
      )}
    </div>
  );
};
