import Image from 'next/image';

export default function HeaderLoginRegister() {
  return (
    <header className='flex flex-col items-center bg-red-900'>
        <div>
            <Image src="/favicon.ico" alt="Snappy logo" width={150} height={150} />
        </div>
        <div>
            <h1 className='font-bold text-2xl'>SNAPPY FRIENDS</h1>
        </div>
    </header>
  )
}