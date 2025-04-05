import Link from "next/link"
import Image from "next/image"

export default function Upgrading() {
  return (
  <div className="flex flex-col w-[100svw] h-[100svh] bg-white overflow-hidden">
      <div className="w-full p-4 text-right">
        <p className="text-sm md:text-base">
          Reach out to us at{" "}
          <Link href="mailto:hi@blowmycandles.com" className="text-accent">
            hi@blowmycandles.com
          </Link>
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center p-4">
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="blowmycandles Logo"
            width={200}
            height={80}
            priority
          />
        </div>
        <p className="text-xl md:text-2xl mb-8 font-extrabold">
          We are <span className="text-accent">upgrading</span>
          <span className="text-accent">!</span>
        </p>
        <p className="text-lg md:text-xl">Do check back again!</p>
      </div>
    </div>
  )
}

