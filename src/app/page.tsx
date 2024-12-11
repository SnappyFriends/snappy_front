
import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import Login from "@/components/Login";
import FooterLoginRegister from "../components/FooterLoginRegister";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen">
      <HeaderLoginRegister />
      <Login />
      <FooterLoginRegister />
    </div>
  );
}

