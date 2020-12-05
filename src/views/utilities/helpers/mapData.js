import _ from "lodash";
import { getString, getArray, getNumber } from "./utilObject";

export function mapImageSize(images, size = 70, sizeY = 0) {
  // sizeY !== 70 ? sizeY = sizeY : sizeY = size;

  let imgURL = (images || "").split("|").find(_, idx => idx === 0);
  let indexOfDot = imgURL.lastIndexOf(".");
  let resizeImgURL = "";
  if (indexOfDot >= 0) {
    let imgName = imgURL.substr(0, indexOfDot);
    let imgExtension = imgURL.substr(indexOfDot + 1);
    resizeImgURL = `${imgName}_${size}x${sizeY}.${imgExtension}`;
  }
  return resizeImgURL;
}
