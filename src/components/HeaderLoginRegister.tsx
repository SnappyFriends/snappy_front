import Image from "next/image";

export default function HeaderLoginRegister() {
  return (
    <header className="w-full">
      <div className="flex flex-col items-center">
        <div>
          <Image
            src="/favicon.ico"
            alt="Snappy logo"
            width={150}
            height={150}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">SNAPPY FRIENDS</h1>
        </div>
      </div>
    </header>
  );
}