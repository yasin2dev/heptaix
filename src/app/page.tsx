"use client";

import { useEffect, useState } from "react";

import UnauthorizatedScreen from "./components/UnauthorizatedScreen";
import MyScreen from "./components/MyScreen";

export default function Home() {
  const [authorizated, setAuthorizated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      setAuthorizated(true);
    }
  }, [])

  return (
    <>
      {
        !authorizated
          ?
          <UnauthorizatedScreen />
          :
          <MyScreen />
      }
    </>
  );
}

