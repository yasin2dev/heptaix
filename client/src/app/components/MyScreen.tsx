"use client"

import React, { useEffect, useState } from 'react';
import DualChartCard from './charts/PieChart';
import { User } from '@server/types';

export function MyScreen() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const localUser = localStorage.getItem('USER');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, [setUser]);

  return (
    <div className="container min-w-full items-center justify-center p-4">
      <h2 className="text-lg text-center font-semibold mb-6">
        Welcome, {user?.name}
      </h2>
      <DualChartCard />
    </div>
  );
}
