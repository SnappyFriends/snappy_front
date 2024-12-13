import Link from "next/link";

export default function FooterLoginRegister() {
  return (
    <footer className="w-full flex justify-center">
      <div className="w-80">
        <p className="text-center">
          Al registrarte, aceptas nuestras{" "}
          <Link href="/terminos" className="text-blue-700">
            Condiciones
          </Link>{" "}
          y nuestra{" "}
          <Link href="/terminos" className="text-blue-700">
            Política de privacidad
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
