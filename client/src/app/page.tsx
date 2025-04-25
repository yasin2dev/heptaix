"use client";

import { UnauthorizedScreen, LoadingScreen, MyScreen } from "@client/app/components";

import { useAuth } from "@client/app/contexts";

export default function Home() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingScreen/>
  }

  return isAuthenticated ? <MyScreen /> : <UnauthorizedScreen />;
}
