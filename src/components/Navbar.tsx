"use client";

import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { showCustomToast } from "./Notificacion";

export default function NavBarResponsive() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setToken } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setToken(null);
    showCustomToast("Snappy", "Cerraste sesión correctamente", "success");
    router.push("/");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <header className="shadow-md">
      <nav className="px-4 sm:px-10 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div
          id="logoynombre"
          className="flex items-center justify-center sm:justify-start sm:col-span-1 hidden sm:flex"
        >
          <Image src="/favicon.ico" width={60} height={60} alt="snappy logo" />
          <h1 className="font-bold text-2xl ml-2">SNAPPY FRIENDS</h1>
        </div>

        <div
          id="barradebusqueda"
          className="flex justify-center sm:justify-center sm:col-span-1"
        >
          <form className="flex items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-4 pr-10 py-2 text-sm text-gray-700 bg-white border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-300"
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div
          id="barradenavegacion"
          className="flex justify-center sm:justify-end sm:col-span-1"
        >
          <ul className="flex space-x-4 sm:space-x-5 items-center">
            <li>
              <Link href="/">
                <Image src="/home.png" width={40} height={40} alt="home" />
              </Link>
            </li>
            <li>
              <Link href="/mensajesprivados">
                <Image
                  src="/chatsprivados.png"
                  width={40}
                  height={40}
                  alt="chats privados"
                />
              </Link>
            </li>
            <li>
              <Link href="/newchat">
                <Image
                  src="/logochatsnuevos.png"
                  width={50}
                  height={40}
                  alt="snappear"
                />
              </Link>
            </li>
            <li>
              <Link href="/notificaciones">
                <Image
                  src="/bell.png"
                  width={40}
                  height={40}
                  alt="notificaciones"
                />
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="focus:outline-none"
                aria-label="Toggle dropdown"
              >
                <Image
                  src="/user.png"
                  width={40}
                  height={40}
                  alt="foto de perfil"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/miperfil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/user.png"
                          alt="Mi perfil"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Mi perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/createpost"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/add.png"
                          alt="Crear publicación"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Crear publicación
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/editarperfil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/settings.png"
                          alt="Configuración"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Configuración
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image
                          src="/logout.png"
                          alt="Cerrar sesión"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

// "use client";

// import React, { useContext, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import SearchBar from "./Searchbar";
// import Cookies from "js-cookie";
// import { UserContext } from "@/context/UserContext";
// import { useRouter } from "next/navigation";

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { setToken } = useContext(UserContext);
//   const router = useRouter();

//   const handleLogout = () => {
//     Cookies.remove("auth_token");
//     setToken(null);
//     router.push("/");
//   };

//   const icons = [
//     { href: "/socialfeed", src: "/home1.png", alt: "Home Icon" },
//     { href: "/mensajesprivados", src: "/mensajes.png", alt: "Messages Icon" },
//     { href: "/newchat", src: "/logochatsnuevos.png", alt: "Arrow Icon" },
//     { href: "/notificaciones", src: "/notificaciones.png", alt: "Notifications Icon" },
//   ];

//   return (
//     <nav className="bg-white text-gray-800 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           <Link href="/socialfeed">
//             <div className="flex items-center space-x-4 flex-shrink-0">
//               <Image src="/favicon.ico" alt="Left Icon" width={50} height={50} />
//               <span className="text-2xl font-bold text-gray-800">
//                 SNAPPY FRIENDS
//               </span>
//             </div>
//           </Link>

//           <div className="flex-grow ml-48">
//             <SearchBar />
//           </div>

//           <div className="hidden md:flex items-center space-x-6 relative">
//             {icons.map(({ href, src, alt }) => (
//               <Link href={href} key={href}>
//                 <Image src={src} alt={alt} width={32} height={32} />
//               </Link>
//             ))}

//             <div className="relative">
//               <Image
//                 src="/usuario.png"
//                 alt="Usuario"
//                 width={32}
//                 height={32}
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="cursor-pointer hover:opacity-80"
//               />

//               {isMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">

//                   <Link
//                     href="/miperfil"
//                     className="flex items-center px-4 py-2 hover:bg-gray-200"
//                   >
//                     <Image
//                       src="/usuario.png"
//                       alt="Mi Perfil"
//                       width={20}
//                       height={20}
//                       className="mr-2"
//                     />
//                     <span>Mi perfil</span>
//                   </Link>

//                   <Link
//                     href="/inprogress"
//                     className="flex items-center px-4 py-2 hover:bg-gray-200"
//                   >
//                     <Image
//                       src="/mas.jpg"
//                       alt="Crear Publicación"
//                       width={20}
//                       height={20}
//                       className="mr-2"
//                     />
//                     <span>Crear publicación</span>
//                   </Link>

//                   <Link
//                     href="/editarperfil"
//                     className="flex items-center px-4 py-2 hover:bg-gray-200"
//                   >
//                     <Image
//                       src="/rueda.png"
//                       alt="Configuración"
//                       width={20}
//                       height={20}
//                       className="mr-2"
//                     />
//                     <span>Configuración</span>
//                   </Link>

//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
//                   >
//                     <Image
//                       src="/cerrarsesion.png"
//                       alt="Cerrar sesión"
//                       width={20}
//                       height={20}
//                       className="mr-2"
//                     />
//                     <span>Cerrar sesión</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-800 focus:outline-none"
//               aria-label="Abrir menú"
//               title="Abrir menú"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
