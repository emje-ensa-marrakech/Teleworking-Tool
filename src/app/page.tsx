
import Image from 'next/image'
import Link from 'next/link';
export default function HomePage() {
  return (
    <div>
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-green-700 to-cyan-600 text-white">
        <Image src="/avl.png" alt="AVL logo" width={110} height={50} />
        <div className="flex items-center gap-4">
    <button className="p-2 rounded  flex items-center justify-center">
      <Image
        src="/monde.png"
        alt="langues"
        className="text-xl"
        width={20}
        height={20}
      />
    </button>
    <Link href="/signIn" className="font-medium">
      Sign in
    </Link>
        </div>
      </header>

      <main className="flex h-[calc(100vh-80px)]">
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <Image
            src="/HOMEPAGE.jpeg"
            alt="Office"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-12 flex flex-col justify-center relative">
          <h1 className="text-3xl font-bold mb-6 mr-24">
            Welcome to Our Space Reservation System!
          </h1>
          <p className="mb-4 text-gray-700">
            Experience seamless space management with our intuitive platform designed for your convenience. Make reservations, track attendance, and generate insightful reports effortlessly.
          </p>
          <div className="border border-gray-300 rounded-lg shadow-md p-6 mt-12">
            <h3 className="text-xl font-semibold mb-2">✨ Welcome Back!</h3>
            <p className="text-gray-600">Sign in to manage your reservations and track your spaces efficiently.</p>
          </div>
          <Image
            src="/logo.png"
            alt="AVL Space"
            width={200}
            height={100}
            className="absolute top-8 right-8"
          />
        </div>
      </main>
    </div>
  )
}
