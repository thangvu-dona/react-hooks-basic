import React from "react";
import PropTypes from "prop-types";
import "./MagicBox.scss";
import useMagicColor from "../../hooks/useMagicColor";

MagicBox.propTypes = {};

function MagicBox() {
  const magicColor = useMagicColor();

  return (
    <div className="magic-box" style={{ backgroundColor: magicColor }}></div>
  );
}

export default MagicBox;
