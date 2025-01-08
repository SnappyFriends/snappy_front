"use client";

import { timeAgo } from "@/helpers/timeAgo";
import { IReport } from "@/interfaces/types";
import { fetchReports } from "@/services/reportService";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ReportesPage: React.FC = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    getReports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Reportes de usuarios
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-200 text-center">
                Foto de Perfil (Reportante)
              </th>
              <th className="px-4 py-2 border border-gray-200 text-center">
                Username (Reportante)
              </th>
              <th className="px-4 py-2 border border-gray-200 text-center">
                Foto de Perfil (Reportado)
              </th>
              <th className="px-4 py-2 border border-gray-200 text-center">
                Username (Reportado)
              </th>
              <th className="px-4 py-2 border border-gray-200 text-center">
                Fecha de Reporte
              </th>
              <th className="px-4 py-2 border border-gray-200 text-center">
                Descripción
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.report_id} className="border-t">
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <Link href={`../perfil/${report.reporting_user.username}`}>
                    <Image
                      src={report.reporting_user.profile_image}
                      alt={report.reporting_user.username}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </Link>
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <Link href={`../perfil/${report.reporting_user.username}`}>
                    {report.reporting_user.username}
                  </Link>
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <Link href={`../perfil/${report.reported_user.username}`}>
                    <Image
                      src={report.reported_user.profile_image}
                      alt={report.reported_user.username}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </Link>
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <Link href={`../perfil/${report.reported_user.username}`}>
                    {report.reported_user.username}
                  </Link>
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  {timeAgo(report.report_date)}
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  {report.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportesPage;
