import dbConnect from "../lib/dbConnect";
import Shop, { Shops } from "../models/Shop";
import { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import EnhancedTable from "./enhancedTable";
import CustomSnackbar from "../components/snackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

type Props = {
  initialShops: Shops[];
};

const Index = ({ initialShops }: Props) => {
  const [allShops, setAllShops] = useState<Shops[]>(initialShops);
  const [filteredShops, setFilteredShops] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [wheelData, setWheelData] = useState([{ option: "" }]);
  const [showResult, setShowResult] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const fetchShops = async () => {
    try {
      const response = await fetch("/api/shops");
      if (response.ok) {
        const callBackData = await response.json();
        setAllShops(callBackData.data);
      } else {
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
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
    setMustSpin(false);
  };

  const uniqueRegions = Array.from(
    new Set(allShops.map((shop) => shop.region))
  );

  useEffect(() => {
    if (selectedRegion) {
      const relatedCategories = allShops
        .filter((shop) => shop.region === selectedRegion)
        .map((shop) => shop.category);
      setFilteredCategories(Array.from(new Set(relatedCategories)));
    }
    setSelectedCategory("");
    setFilteredShops([]);
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedRegion && selectedCategory) {
      const filtered = allShops
        .filter(
          (shop) =>
            shop.region === selectedRegion && shop.category === selectedCategory
        )
        .map((shop, index) => ({
          id: shop._id,
          serialNumber: index + 1,
          ...shop,
        }));
      setFilteredShops(filtered);
    }
  }, [allShops, selectedRegion, selectedCategory]);

  useEffect(() => {
    if (selectedRegion) {
      setSelectedCategory("");
      setFilteredShops([]);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (filteredShops.length > 0) {
      const newWheelData = filteredShops.map((shop) => ({
        option: shop.items,
      }));
      setWheelData(newWheelData);
      setPrizeNumber(0); // 重置 prizeNumber
    }
  }, [filteredShops]);

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("postSnackbar") === "true") {
      setSnackbarMessage("新增成功");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      sessionStorage.removeItem("postSnackbar");
    }
    if (sessionStorage.getItem("sendSnackbar") === "true") {
      setSnackbarMessage("訊息傳送成功!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      sessionStorage.removeItem("sendSnackbar");
    }
    if (sessionStorage.getItem("failSnackbar") === "true") {
      setSnackbarMessage("操作有誤, 請重新操作");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      sessionStorage.removeItem("errorSnackbar");
    }
    if (sessionStorage.getItem("errorSnackbar")) {
      setSnackbarMessage(sessionStorage.getItem("errorSnackbar") || "發生錯誤");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      sessionStorage.removeItem("errorSnackbar");
    }
  }, []);

  return (
    <>
      <div className="select-container">
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 100 }}
          className="SelectFormControl"
        >
          <InputLabel id="region-select-label">選擇地區</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCategory("");
            }}
            className="SelectControl"
          >
            {uniqueRegions.map((region, index) => (
              <MenuItem key={index} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedRegion && (
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 100 }}
            className="SelectFormControl"
          >
            <InputLabel id="category-select-label">選擇類別</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="SelectControl"
            >
              {filteredCategories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <br />{" "}
      </div>
      <div className="main-container">
        <div
          // style={{ height: "auto", width: "50%" }}
          className="left-align-container"
        >
          <EnhancedTable
            rows={filteredShops}
            fetchShops={fetchShops}
            setSnackbar={(status: { message: string; severity: string }) => {
              setSnackbarMessage(status.message);
              setSnackbarSeverity(
                status.severity as "error" | "success" | "warning" | "info"
              );
              setSnackbarOpen(true);
            }}
          />{" "}
        </div>
        <div className="right-align-container">
          {wheelData && wheelData.length > 0 && (
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelData.length > 0 ? wheelData : [{ option: "" }]}
              onStopSpinning={handleStopSpinning}
              backgroundColors={["#bbdefb", "#AFEEEE", "#FFFACD", "#FFDDAA"]}
              fontFamily="Bebas Neue"
              textColors={["#00008B"]}
              radiusLineColor="#ccc"
              outerBorderColor="#ccc"
              // outlineWidth={2}
              spinDuration={0.2}
            />
          )}
          <button className="spinButton" onClick={handleSpinClick}>
            SPIN
          </button>
          {showResult && wheelData[prizeNumber] && (
            <div className="currentData">{wheelData[prizeNumber].option}</div>
          )}
        </div>
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  const result = await Shop.find({});
  const initialShops = JSON.parse(JSON.stringify(result));

  return { props: { initialShops } };
};

export default Index;
