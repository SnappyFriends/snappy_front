import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { IChartData, IReportData } from "@/interfaces/types";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UserPurchasesChart: React.FC = () => {
  const [mostReportedUsersData, setMostReportedUsersData] =
    useState<IChartData | null>(null);
  const [usersWhoReportData, setUsersWhoReportData] =
    useState<IChartData | null>(null);
  const [totalUsersData, setTotalUsersData] = useState<IChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/logs/user-reports`
        );
        const data: IReportData = await response.json();

        const mostReportedUsersNames = data.mostReportedUsers.map(
          (user) => user.fullname
        );
        const reportedCounts = data.mostReportedUsers.map(
          (user) => user.reportedCount || 0
        );

        const usersWhoReportNames = data.usersWhoReport.map(
          (user) => user.fullname
        );
        const reportCounts = data.usersWhoReport.map(
          (user) => user.reportCount || 0
        );

        setMostReportedUsersData({
          labels: mostReportedUsersNames,
          datasets: [
            {
              label: "Cantidad de reportes recibidos",
              data: reportedCounts,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        });

        setUsersWhoReportData({
          labels: usersWhoReportNames,
          datasets: [
            {
              label: "Cantidad de reportes generados",
              data: reportCounts,
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        });

        setTotalUsersData({
          labels: ["Usuarios reportados", "Usuarios no reportados"],
          datasets: [
            {
              label: "Cantidad de usuarios",
              data: [data.totalReportedUsers, data.totalUnreportedUsers],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(0, 255, 103, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(0, 255, 103, 1)"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center mt-4">
      {mostReportedUsersData && (
        <div className="w-full md:w-1/2 p-4">
          <div className="rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
              Usuarios más reportados
            </h2>
            <Bar
              data={mostReportedUsersData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Usuarios más reportados",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
      {usersWhoReportData && (
        <div className="w-full md:w-1/2 p-4">
          <div className="rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
              Usuarios que más reportes han generado
            </h2>
            <Bar
              data={usersWhoReportData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Usuarios que más reportes han generado",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
      {totalUsersData && (
        <div className="w-full md:w-1/2 p-4 mb-10">
          <div className="rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
              Cantidad de usuarios reportados vs no reportados
            </h2>
            <Pie
              data={totalUsersData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Cantidad de usuarios reportados vs no reportados",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPurchasesChart;
