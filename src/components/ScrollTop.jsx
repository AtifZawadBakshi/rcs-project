import { ArrowUpward } from "@mui/icons-material";
import React from "react";
import { Button } from "react-bootstrap";

const ScollTop = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="d-flex justify-content-end">
      <Button onClick={goToTop} sx={{ color: "black" }}>
        <span id="site-scroll">
          <ArrowUpward />
        </span>
      </Button>
    </div>
  );
};

export default ScollTop;
