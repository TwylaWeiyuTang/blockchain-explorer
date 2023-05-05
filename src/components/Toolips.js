import React, { useState } from "react";
import styled from "styled-components";

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const TooltipRight = styled.div`
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px;
  color: white;
  background: black;
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;

  ::before {
    content: " ";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: calc(6px * -1);
  }

  &#right {
    left: calc(100% + 30px);
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }

  &#right::before {
    left: calc(6px * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: black;
  }
`;

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {/* Wrapping */}
      {props.children}
      {active && (
        <TooltipRight id="right">
          {/* Content */}
          {props.content}
        </TooltipRight>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
