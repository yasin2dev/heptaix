import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-amber-600 text-lg font-semibold animate-pulse">
          Loading..
        </p>
      </div>
    </div>
  );
}

