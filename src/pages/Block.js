import React from "react";
import { useParams } from "react-router-dom";

const Block = () => {
  let { id } = useParams();

  return <div>Block: {id}</div>;
};

export default Block;
