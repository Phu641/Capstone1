// import all images from assets/images directory
import imgMitsubishi01 from "../all-images/cars-img/XeVn1.png";
import imgMitsubishi02 from "../all-images/cars-img/XeVn2.png";
import imgMitsubishi03 from "../all-images/cars-img/XeVn3.png";
import imgMitsubishi04 from "../all-images/cars-img/XeVn4.png";
import imgXPANDER01 from "../all-images/cars-img/XeMITSUBISHIXPANDER01.png";
import imgXPANDER02 from "../all-images/cars-img/XeMITSUBISHIXPANDER02.png";
import imgXPANDER03 from "../all-images/cars-img/XeMITSUBISHIXPANDER03.png";
import imgXPANDER04 from "../all-images/cars-img/XeMITSUBISHIXPANDER04.png";
import XeFortuner01 from "../all-images/cars-img/XeFortuner01.png";
import XeFortuner02 from "../all-images/cars-img/XeFortuner02.png";
import XeFortuner03 from "../all-images/cars-img/XeFortuner03.png";
import VINFASTLUXSA01 from "../all-images/cars-img/VINFASTLUXSA01.png";
import VINFASTLUXSA02 from "../all-images/cars-img/VINFASTLUXSA02.png";
import VINFASTLUXSA03 from "../all-images/cars-img/VINFASTLUXSA03.png";
import VINFASTLUXSA04 from "../all-images/cars-img/VINFASTLUXSA04.png";
import ZOTYET01 from "../all-images/cars-img/ZOTYET01.png";
import ZOTYET02 from "../all-images/cars-img/ZOTYET02.png";
import ZOTYET03 from "../all-images/cars-img/ZOTYET03.png";
import ZOTYET04 from "../all-images/cars-img/ZOTYET04.png";
import VINFASTLUX01 from "../all-images/cars-img/VINFASTLUX01.png";
import VINFASTLUX02 from "../all-images/cars-img/VINFASTLUX02.png";
import VINFASTLUX03 from "../all-images/cars-img/VINFASTLUX03.png";
import VINFASTLUX04 from "../all-images/cars-img/VINFASTLUX03.png";


const carData = [
  {
    id: 1,
    brand: "Mitsubishi",
    rating: 112,
    carName: "MITSUBISHI XPANDER 2019",
    imgUrl: imgMitsubishi01,
    images: [imgMitsubishi02, imgMitsubishi03,imgMitsubishi04],
    model: "Model 3",
    price: 50,
    speed: "20kmpl",
    numberOfSeat:"4 People",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Description: MITSUBISHI XPANDER 2019",
  },

  {
    id: 2,
    brand: "Mitsubishi",
    rating: 102,
    carName: "MITSUBISHI XPANDER 2023",
    imgUrl: imgXPANDER01,
    images:[imgXPANDER02,  imgXPANDER03, imgXPANDER04],
    model: "Model-2",
    price: 50,
    speed: "20kmpl",
    numberOfSeat:"4 People",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Description: MITSUBISHI XPANDER 2023",
  },

  {
    id: 3,
    brand: "TOYOTA",
    rating: 132,
    carName: "TOYOTA FORTUNER 2013",
    imgUrl:  XeFortuner01,
    images:[ XeFortuner02,XeFortuner03,],
    model: "Model-2",
    price: 65,
    speed: "20kmpl",
    numberOfSeat:"4 People",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Description: TOYOTA FORTUNER 2013",
  },

  {
    id: 4,
    brand: "VINFAST",
    rating: 102,
    carName: "VINFAST LUX SA 2019",
    imgUrl: VINFASTLUXSA01,
    images:[ VINFASTLUXSA02,VINFASTLUXSA03,VINFASTLUXSA04],
    model: "Model-2",
    price: 70,
    speed: "20kmpl",
    numberOfSeat:"4 People",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Description: VINFAST LUX SA 2019",
  },

  {
    id: 5,
    brand: "ZOTYE",
    rating: 94,
    carName: "ZOTYE T800 2020",
    imgUrl: ZOTYET01,
    images:[ ZOTYET02,ZOTYET03,ZOTYET04],
    model: "Model-2",
    price: 45,
    speed: "20kmpl",
    numberOfSeat:"4 People",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Description: ZOTYE T800 2020",
  },

  {
    id: 6,
    brand: "VINFAST",
    rating: 119,
    carName: "VINFAST LUX SA 2022",
    imgUrl: VINFASTLUX01,
    images:[VINFASTLUX02,VINFASTLUX03,VINFASTLUX04],
    model: "Model-2",
    price: 85,
    speed: "20kmpl",
    numberOfSeat:"4 People",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Description: VINFAST LUX SA 2022",
  },
];

export default carData;
