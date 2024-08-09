"use client";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaPlay } from "react-icons/fa";



export default function Home() {
  const [user, loading, error] = useAuthState(auth());
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [router, loading, user]);

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center gap-y-5">
      <h1 className=" text-7xl text-neutral-400 animate-text-pop-up-top">
        TECHNOWIZZ 7.0
      </h1>
      <p className=" text-5xl text-neutral-400 animate-text-pop-up-top my-3">
        ROUND 1
      </p>
      <button
        onClick={() => router.push("/game")}
        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000,45%,rgb(163,163,163),55%,#000)] bg-[length:200%_100%] px-6 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <FaPlay />Start
      </button>
    </div>
  );
}
