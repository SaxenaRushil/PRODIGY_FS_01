import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative flex items-center justify-center h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/zorop.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority // Optional: This tells Next.js to prioritize loading this image
        />
      </div>

      {/* Centered Box */}
      <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <p className="text-3xl text-gray-800 front-bold">Homepage</p>
      </div>
    </main>
  );
}
