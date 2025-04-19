"use client";

import UnauthorizedScreen from "./components/UnauthorizedScreen";
import MyScreen from "./components/MyScreen";
import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from "./contexts/AuthContext";

export default function Home() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingScreen/>
  }

  return isAuthenticated ? <MyScreen /> : <UnauthorizedScreen />;
}
