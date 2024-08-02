"use client"
import Image from "next/image";
import { Quiz } from "./components/quiz";

const Game = () => {
    return (
        <div className="text-black border-4 border-black  h-full w-full p-8  grid grid-cols-4 relative z-[0]  before:absolute before:flex before:left-[30px] before:top-[30px] before:h-[calc(100%-60px)] before:w-[calc(100%-60px)]  before:-z-[1] before:bg-slate-200 before:opacity-30">
            <div className=" relative w-full h-full border-4 border-black row-span-3 col-span-3">
                    <Image
                        className=" object-contain"
                        src="/ngo-scene-modified.jpg"
                        alt="ngo"
                        fill
                        useMap="#test"
                    />
                      <Quiz classname=" left-[25%] top-[46%] w-[10%] h-[10%] "/>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full min-h-full max-h-0  border-4 border-black col-span-3">
                <h1 className=" text-2xl">Descripton</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione accusamus pariatur, provident accusantium eligendi delectus ipsam velit, possimus nobis, atque quo consequuntur corporis optio distinctio esse enim reprehenderit deserunt quibusdam?</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full border-4 border-black row-span-3 row-end-1 col-start-4 min-h-full max-h-0" >
                <h1 className=" text-5xl">Score and cules life</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full  border-4 border-black min-h-full max-h-0">
                <h1 className=" text-5xl">buttons</h1>
            </div>
        </div>
    );
}

export default Game;