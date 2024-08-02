"use client"
import Image from "next/image";
import { Quiz } from "./components/quiz";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react";

const Game = () => {

    const [scene, setScene] = useState(0);

    return (
        <Carousel className="text-black border-4 border-black  h-full w-full p-8  grid grid-cols-4 relative z-[0]  before:absolute before:flex before:left-[30px] before:top-[30px] before:h-[calc(100%-60px)] before:w-[calc(100%-60px)]  before:-z-[1] before:bg-slate-200 before:opacity-30">
            <div className="w-full h-full border-4 border-black row-span-3 col-span-3">
                <CarouselContent className="h-full">
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/ngo-scene-modified.jpg"
                            alt="ngo"
                            fill
                            useMap="#test"
                        />
                        <Quiz classname=" left-[25%] top-[46%] w-[10%] h-[10%] " />
                    </CarouselItem>
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/ngo-scene-modified.jpg"
                            alt="ngo"
                            fill
                            useMap="#test"
                        />
                        <Quiz classname=" left-[25%] top-[46%] w-[10%] h-[10%] " />
                    </CarouselItem>
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/ngo-scene-modified.jpg"
                            alt="ngo"
                            fill
                            useMap="#test"
                        />
                        <Quiz classname=" left-[25%] top-[46%] w-[10%] h-[10%] " />
                    </CarouselItem>
                </CarouselContent>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full min-h-full max-h-0  border-4 border-black col-span-3">
                <h1 className=" text-2xl">Descripton {scene}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione accusamus pariatur, provident accusantium eligendi delectus ipsam velit, possimus nobis, atque quo consequuntur corporis optio distinctio esse enim reprehenderit deserunt quibusdam?</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full border-4 border-black row-span-3 row-end-1 col-start-4 min-h-full max-h-0" >
                <h1 className=" text-5xl">Score and cules life {scene}</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full  border-4 border-black min-h-full max-h-0">
                <div className="mt-6 text-white flex">
                    <div className=" w-20 h-10 m-2" onClick={() => { if(scene>0 && scene<=2) setScene(scene - 1) }}>
                        <CarouselPrevious size="lg" className=" bg-black w-20 h-10" />
                    </div>
                    <div className=" w-20 h-10 m-2" onClick={()=>{ if(scene>=0 && scene<2) setScene(scene+1)}} >
                        <CarouselNext size="lg" className=" bg-black w-20 h-10" />
                    </div>
                </div>
            </div>
        </Carousel>
    );
}

export default Game;