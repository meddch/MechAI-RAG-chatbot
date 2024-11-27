import Image from "next/image";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <p className="fixed left-0 top-0 flex w-full font-bold justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
       Chat with your files&nbsp;
      </p>
      <div className="flex items-center justify-center w-1/2 h-1/2 lg:w-auto lg:space-x-4">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="font-bold text-xl">MechAI</h1>
      </div>
    </div>
  );
}
   