import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import Login from "@/components/Login";
import FooterLoginRegister from "../components/FooterLoginRegister";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <HeaderLoginRegister />
      <Login />
      <FooterLoginRegister />
    </div>
  );
}
