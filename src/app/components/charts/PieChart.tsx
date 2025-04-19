"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import { Card, CardContent } from "@/ui/card";
import { useEffect, useState } from "react";
import { User } from "../../../../server/types";

const statusData = [
  { name: "Done", value: 1 }, // Yeşil
  { name: "Waiting", value: 1 }, // Sarı
  { name: "Not Started", value: 1 }, // Gri
  { name: "In Progress", value: 4 }, // Mavi
];

const categoriesData = [
  { name: "Category 1", value: 45 },
  { name: "Category 2", value: 25 },
  { name: "Category 3", value: 15 },
  { name: "Category 4", value: 15 },
];

const statusDataFiltered = statusData.filter((item) => item.value > 0);
const categoriesDataFiltered = categoriesData.filter((item) => item.value > 0);

const PASTEL_COLORS = [
  "rgba(76, 175, 80, 0.4)",
  "rgba(255, 193, 7, 0.4)",
  "rgba(158, 158, 158, 0.4)",
  "rgba(33, 150, 243, 0.4)",
];

const PASTEL_COLORS_BORDERS = [
  "rgba(76, 175, 80, 0.6)",
  "rgba(255, 193, 7, 0.6)",
  "rgba(158, 158, 158, 0.6)",
  "rgba(33, 150, 243, 0.6)",
];

export default function DualChartCard() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const localUser = localStorage.getItem("USER");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, [setUser]);

  return (
    <Card className="w-full flex justify-between max-w-full shadow-md m-4 p-4">
      <CardContent className="mb-10">
        <h2 className="text-lg text-center font-semibold mb-6">
          Welcome, {user?.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-64">
            <h3 className="text-sm text-center font-medium mb-6">Todo Stats</h3>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  className="focus:outline-none"
                  data={statusDataFiltered}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-pie-${index}`}
                      fill={PASTEL_COLORS[index % PASTEL_COLORS.length]}
                      stroke={
                        PASTEL_COLORS_BORDERS[
                          index % PASTEL_COLORS_BORDERS.length
                        ]
                      }
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Doughnut Chart */}
          <div className="h-64">
            <h3 className="text-sm text-center font-medium mb-6">
              Todo Categories
            </h3>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  className="focus:outline-none"
                  data={categoriesDataFiltered}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell
                      key={`cell-doughnut-${index}`}
                      fill={PASTEL_COLORS[index % PASTEL_COLORS.length]}
                      stroke={
                        PASTEL_COLORS_BORDERS[
                          index % PASTEL_COLORS_BORDERS.length
                        ]
                      }
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
