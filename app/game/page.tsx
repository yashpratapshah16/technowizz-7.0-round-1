import Image from "next/image";

const Game = () => {
    return (
        <div className="text-black border-4 border-black h-[617px] w-full grid grid-cols-4 relative z-[0] before:absolute before:h-full before:w-full before:-z-[1] before:bg-slate-200 before:opacity-30">
            <div className=" w-full h-[452px] flex flex-col justify-center items-center border-4 border-black row-span-3 col-span-3">
                <Image
                    src="/ngo-scene-modified.jpg"
                    style={{"objectFit":"contain"}}
                    height={700}
                    width={700}
                    alt="ngo"
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[157px]  border-4 border-black col-span-3">
                <h1 className=" text-5xl">Descripton</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[452px] border-4 border-black row-span-3 row-end-1 col-start-4" >
                <h1 className=" text-5xl">Score and cules life</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[157px]  border-4 border-black ">
                <h1 className=" text-5xl">buttons</h1>
            </div>
        </div>
    );
}

export default Game;