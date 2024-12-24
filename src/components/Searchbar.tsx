"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { showCustomToast } from "./Notificacion";
import { UserContext } from "@/context/UserContext";
import { IUserSearchResponse } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEFAULT_IMAGE = "defaultfoto.png";

export default function SearchBar() {
  const { setToken, setUserId } = useContext(UserContext);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredUsers([]);
      setTotalResults(0);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/users?username=${term}&page=${currentPage}&limit=${resultsPerPage}`
      );
      if (response.ok) {
        const data = await response.json();

        const usersWithDefaultImage = data.map((user: IUserSearchResponse) => ({
          ...user,
          profile_image:
            user.profile_image === "no_img.png"
              ? DEFAULT_IMAGE
              : user.profile_image,
        }));

        setFilteredUsers(usersWithDefaultImage);
      } else {
        console.error("Error fetching users:", response.statusText);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setFilteredUsers([]);
    }
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
    showCustomToast("Snappy", "Cerraste sesión correctamente", "success");
    router.push("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage <= 0) return;
    setCurrentPage(newPage);
    handleSearch({
      target: { value: searchTerm },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <header className="sticky top-0 left-0 w-full h-16 z-50 flex justify-center items-center border bg-white">
      <nav className="h-full flex items-center justify-between px-2 md:px-6 w-full">
        <Link href="/socialfeed" className="flex items-center">
          <Image src="/favicon.ico" width={60} height={60} alt="logo" />
          <h1 className="hidden md:block md:font-bold md:text-2xl">SNAPPY</h1>
        </Link>

        <div className="relative w-96">
          <form className="flex mx-2 md:mx-0">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-500 rounded-full rounded-r-none w-full h-11 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Buscar..."
            />
            <div className="border border-gray-500 rounded-full rounded-l-none w-14 h-11 flex items-center justify-center">
              <Image
                src="/lupa.png"
                width={30}
                height={30}
                alt="lupa"
                className="h-full object-contain"
              />
            </div>
          </form>

          {filteredUsers.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
              {filteredUsers.map((user: IUserSearchResponse) => (
                <li
                  key={user.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Link href={`/user/${user.id}`}>
                    <div className="flex items-center">
                      <Image
                        src={user.profile_image}
                        width={30}
                        height={30}
                        alt={`${user.fullname}'s profile`}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-semibold">{user.fullname}</p>
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {filteredUsers.length > resultsPerPage && (
            <div className="flex justify-center mt-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="mx-4">{currentPage}</span>
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={filteredUsers.length < resultsPerPage}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 relative">
          <Link
            href="/crearpublicacion"
            className="hidden md:block h-full object-contain cursor-pointer"
          >
            <Image
              src="/add.png"
              width={40}
              height={40}
              alt="crear publicación"
              className="h-full object-contain"
            />
          </Link>
          <Image
            src="/user.png"
            width={40}
            height={40}
            alt="user"
            className="h-full object-contain cursor-pointer"
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className="absolute top-14 right-0 bg-white shadow-lg rounded-md w-48">
              <Link
                href="/miperfil"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <Image src="/user.png" width={20} height={20} alt="Mi perfil" />
                <span className="ml-2">Mi perfil</span>
              </Link>
              <Link
                href="/crearpublicacion"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <Image
                  src="/add.png"
                  width={20}
                  height={20}
                  alt="Crear publicacion"
                />
                <span className="ml-2">Crear publicación</span>
              </Link>
              <Link
                href="/editarperfil"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <Image
                  src="/editarperfil.png"
                  width={20}
                  height={20}
                  alt="Editar perfil"
                />
                <span className="ml-2">Editar perfil</span>
              </Link>
              <Link
                href="/configuracion"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <Image
                  src="/settings.png"
                  width={20}
                  height={20}
                  alt="Configuración"
                />
                <span className="ml-2">Configuración</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <Image
                  src="/logout.png"
                  width={20}
                  height={20}
                  alt="Cerrar sesión"
                />
                <span className="ml-2">Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
