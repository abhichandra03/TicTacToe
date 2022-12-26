import React from "react";

const Square = ({ chooseSquare, val }) => {
  return (
    <div className="square" onClick={chooseSquare}>
      {val}
    </div>
  );
};

export default Square;
