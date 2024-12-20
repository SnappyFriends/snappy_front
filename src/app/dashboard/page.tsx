"use client";

import React from "react";
import Image from "next/image";

const Dashboard = () => {
  const userStats = {
    totalUsers: 500,
    activeUsers: 220,
    newUsers: 50,
    posts: 180,
    activePosts: 150,
    usersByCountry: {
      argentina: 150,
      colombia: 120,
      chile: 80,
    },
    premiumUsers: 35,
    mostUsedFeaturesLastMonth: {
      messagesSent: 350,
      profileViews: 250,
      friendRequests: 180,
    },
    leastUsedFeaturesLastMonth: {
      photoUploads: 25,
      eventCreations: 15,
    },
  };

  const reportStats = {
    reportedAccounts: 12,
    deletedPosts: 5,
    bannedUsers: 2,
  };

  const adminActions = [
    "Aprobar/rechazar publicaciones",
    "Editar perfiles de usuario",
    "Gestionar suspensiones de cuentas",
    "Ver estadísticas detalladas de actividad",
    "Gestionar roles y permisos de usuarios",
  ];

  const userRoles = {
    admins: 6,
    moderators: 10,
    members: 484,
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 flex flex-col items-center">
      <div className="mb-10">
        <Image
          src="/favicon.ico"
          alt="Logo de Snappy Friends"
          className="h-16 mx-auto"
          width={64}
          height={64}
        />
      </div>

      <h2 className="text-3xl font-bold text-center mb-10">Reportes Snappy Friends</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Resumen General</h3>
          <ul className="space-y-3">
            <li>Total de Usuarios: <span className="font-bold">{userStats.totalUsers}</span></li>
            <li>Usuarios Nuevos este mes: <span className="font-bold">{userStats.newUsers}</span></li>
            <li>Total de Publicaciones: <span className="font-bold">{userStats.posts}</span></li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Estadísticas de Crecimiento</h3>
          <ul className="space-y-3">
            <li>Usuarios Nuevos este mes: <span className="font-bold">{userStats.newUsers}</span></li>
            <li>Crecimiento en Usuarios Activos en los últimos 6 meses: <span className="font-bold">{userStats.activeUsers}</span></li>
            <li>Crecimiento de Publicaciones en los últimos 6 meses: <span className="font-bold">{userStats.posts}</span></li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Usuarios por País</h3>
          <ul className="space-y-3">
            <li>Argentina: <span className="font-bold">{userStats.usersByCountry.argentina}</span> usuarios</li>
            <li>Colombia: <span className="font-bold">{userStats.usersByCountry.colombia}</span> usuarios</li>
            <li>Chile: <span className="font-bold">{userStats.usersByCountry.chile}</span> usuarios</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Usuarios con Membresía Premium</h3>
          <ul className="space-y-3">
            <li>Total de Usuarios Premium: <span className="font-bold">{userStats.premiumUsers}</span></li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Funciones Más Usadas</h3>
          <ul className="space-y-3">
            <li>Mensajes Enviados: <span className="font-bold">{userStats.mostUsedFeaturesLastMonth.messagesSent}</span> mensajes</li>
            <li>Vistas de Perfil: <span className="font-bold">{userStats.mostUsedFeaturesLastMonth.profileViews}</span> vistas</li>
            <li>Solicitudes de Amistad: <span className="font-bold">{userStats.mostUsedFeaturesLastMonth.friendRequests}</span> solicitudes</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Funciones Menos Usadas</h3>
          <ul className="space-y-3">
            <li>Subidas de Fotos: <span className="font-bold">{userStats.leastUsedFeaturesLastMonth.photoUploads}</span> fotos</li>
            <li>Creaciones de Eventos: <span className="font-bold">{userStats.leastUsedFeaturesLastMonth.eventCreations}</span> eventos</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Usuarios Activos por Rol</h3>
          <ul className="space-y-3">
            <li>Administradores: <span className="font-bold">{userRoles.admins}</span></li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Reportes Críticos</h3>
          <ul className="space-y-3">
            <li>Cuentas Reportadas: <span className="font-bold">{reportStats.reportedAccounts}</span></li>
            <li>Usuarios Baneados: <span className="font-bold">{reportStats.bannedUsers}</span></li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Acciones de Administración</h3>
          <ul className="space-y-3">
            {adminActions.map((action, index) => (
              <li key={index} className="font-semibold">{action}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
