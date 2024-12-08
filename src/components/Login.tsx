export default function Login() {
  return (
    <main className="bg-red-400">
      <div className="bg-blue-700">
        <h2 className="">Ingresa a tu cuenta</h2>
        <form className="bg-yellow-400">
          <div className="">
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Contraseña" />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <div>
          <button type="submit">Continuar con Google</button>
          <button type="submit">Crear cuenta nueva</button>
        </div>
      </div>
    </main>
  );
}
