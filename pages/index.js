import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

const data = [
  {
    category: "早餐",
    items: ["翻白眼女孩", "貳食尋夢所"],
  },
  {
    category: "午餐",
    items: [
      "TAKU",
      "粥大福",
      "Subway",
      "麥當勞",
      "Anini Poke",
      "豪品",
      "金香",
      "有種Pizza",
      "Poke波奇",
      "鰤樂仨",
      "KUMO 麵屋 雲",
      "12MINI快煮鍋",
      "KIDO雞白湯",
      "moi x pho 哞一河粉",
      "渡山樓",
      "麵屋六花",
      "鮮魚湯",
      "饡味軒",
      "大山",
      "麵本初",
      "橋北屋",
      "徐家莊",
    ],
  },
  {
    category: "晚餐",
    items: [
      "TAKU",
      "粥大福",
      "Subway",
      "麥當勞",
      "Anini Poke",
      "豪品",
      "金香",
      "有種Pizza",
      "Poke波奇",
      "鰤樂仨",
      "KUMO 麵屋 雲",
      "12MINI快煮鍋",
      "KIDO雞白湯",
      "moi x pho 哞一河粉",
      "渡山樓",
      "麵屋六花",
      "鮮魚湯",
      "饡味軒",
      "大山",
      "麵本初",
      "橋北屋",
      "徐家莊",
    ],
  },
  {
    category: "想吃還沒吃的",
    items: [
      "花山椒",
      "貳食尋夢所",
      "花魯米味",
      "桂蘭麵",
      "漆-蛋餅",
      "Kitaho北穗製麵所",
      "佐亭香",
      "几湯店",
      "信川屋博多豚骨拉麵",
      "18度雞",
      "品嘉茶餐廳",
      "泰小葉",
    ],
  },
];

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(data[0].category);
  const [wheelData, setWheelData] = useState(
    data[0].items.map((item) => ({ option: item }))
  );
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [currentData, setCurrentData] = useState("");

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setShowResult(false);
    }
  };

  const handleStopSpinning = () => {
    setShowResult(true);
    setResult(wheelData[prizeNumber].option);
    setMustSpin(false);
  };

  useEffect(() => {
    let intervalId;
    if (mustSpin) {
      intervalId = setInterval(() => {
        setCurrentDataIndex((prevIndex) => {
          const newIndex = Math.floor(Math.random() * wheelData.length);
          return newIndex !== prevIndex ? newIndex : prevIndex;
        });
      }, 100);
    } else {
      clearInterval(intervalId);
      setCurrentData(wheelData[prizeNumber].option);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [mustSpin, wheelData, prizeNumber]);

  return (
    <div className={styles.container}>
      <select
        className={styles.selectMenu}
        value={selectedCategory}
        onChange={(event) => {
          const category = event.target.value;
          setSelectedCategory(category);
          const newWheelData = data
            .find((d) => d.category === category)
            .items.map((item) => ({ option: item }));
          setWheelData(newWheelData);
        }}
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
      <div className={styles.currentData}>
        {mustSpin ? wheelData[currentDataIndex].option : currentData}
      </div>
    </div>
  );
};

// export default () => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState(data[0].category);
//   const [wheelData, setWheelData] = useState(
//     data[0].items.map((item) => ({ option: item }))
//   );

//   const handleSpinClick = () => {
//     if (!mustSpin) {
//       const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
//       setPrizeNumber(newPrizeNumber);
//       setMustSpin(true);
//     }
//   };

//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     setSelectedCategory(category);
//     const newWheelData = data
//       .find((d) => d.category === category)
//       .items.map((item) => ({ option: item }));
//     setWheelData(newWheelData);
//   };

//   return (
//     <div className={styles.container}>
//       <select
//         className={styles.selectMenu}
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//       >
//         {data.map((d, index) => (
//           <option key={index} value={d.category}>
//             {d.category}
//           </option>
//         ))}
//       </select>
//       <Wheel
//         mustStartSpinning={mustSpin}
//         prizeNumber={prizeNumber}
//         data={wheelData}
//         onStopSpinning={() => {
//           setMustSpin(false);
//         }}
//         backgroundColors={["#40E0D0", "#00BFFF", "#FFD700", "#FFA500"]}
//         fontFamily={"Bebas Neue"}
//         textColors={["#00008B"]}
//         radiusLineColor="#ccc" // 設定隔線顏色為灰色
//         outerBorderColor="#ccc"
//         outlineWidth={2}
//         spinDuration={0.2}
//       />
//       <button className={styles.spinButton} onClick={handleSpinClick}>
//         SPIN
//       </button>
//     </div>
//   );
// };
