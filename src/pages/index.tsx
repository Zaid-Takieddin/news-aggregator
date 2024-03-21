import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Box, CircularProgress } from "@mui/material";
const myPage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const { pathname } = Router;

    if (pathname == "/") {
      Router.push("/homepage");
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return (
      <Box
        sx={{
          wdith: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />;
      </Box>
    );
  }
  return <></>;
};
export default myPage;
