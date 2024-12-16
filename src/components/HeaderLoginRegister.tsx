import Image from "next/image";

export default function HeaderLoginRegister() {
  return (
    <header className="w-full p-4 bg-gray-100">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
      <div className="mb-4 md:mb-0">
        <Image
        src="/favicon.ico"
        alt="Snappy logo"
        width={150}
        height={150}
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center md:text-left">SNAPPY FRIENDS</h1>
      </div>
      </div>
    </header>
  );
}