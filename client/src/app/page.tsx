"use client";

import { UnauthorizedScreen, LoadingScreen, MyScreen } from "@client/app/components";

import { useAuth } from "@client/app/contexts";

export default function Home() {
  const { loading, isAuthenticated, checkAuth } = useAuth();

  if (loading) {
    return <LoadingScreen/>
  }

  if (isAuthenticated) checkAuth();

  return isAuthenticated ? <MyScreen /> : <UnauthorizedScreen />;
}
