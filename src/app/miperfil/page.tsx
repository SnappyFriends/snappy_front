import Conectados from "@/components/Conectados";
import NavBar from "@/components/NavBar";
import PerfilComponent from "@/components/Perfil";
import Sidebar from "@/components/Sidebar";

export default function MiPerfil() {
	return (
		<>
			<Sidebar />
			<NavBar />
			<PerfilComponent />

			<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
				<Conectados />
			</div>
		</>
	);
}
