import React from "react";
import errorImge from "../../assets/error.svg";
import { error } from "jquery";

export default function Errorscreen() {
  return (
    <div className="text-center py-5">
      <img src={errorImge} alt="" />
    </div>
  );
}
