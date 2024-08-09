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
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/clientApp";
import { useRouter } from "next/navigation";
import Submit from "./components/Submit";
import { collection, getDocs, query } from "firebase/firestore";
import { signOut } from "firebase/auth";

const defaultQ = "No, this isn't the Cule you're searching for.";


const Game = () => {

    const router = useRouter();
    const [User, Loading, Error] = useAuthState(auth());

    useEffect(() => {
        if (!Loading && !User) {
            router.push("/login")
        }
    }, [Loading, User, router])

    const [list, setList] = useState([false, false, false, false, false, false, false, false]);

    const [scene, setScene] = useState(0);

    const [Qs, setQs] = useState(Array<{ id: string, Q: string, Ans: string, title: string, description: string }>);

    const [count, setCount] = useState("15:00");

    useEffect(() => {
        const timer = (count: number) => {
            const min = Math.floor((count) / 60);
            const sec = (count) % 60;
            let secT = "" + sec, minT = "" + min;
            if (sec >= 0 && sec <= 9) secT = `0${sec}`
            if (min > -1 && min <= 9) minT = "0" + min
            setCount(minT + ":" + secT)
        }
        let countdown = 15 * 60;
        const x = setInterval(() => {
            timer(countdown--);
            if (countdown < 0) {
                clearInterval(x);
                signOut(auth())
            }
        }, 1000)
    }, [])


    useEffect(() => {
        const getQs = async () => {
            const q = query(collection(db(), "Questions/0/Scene/" + scene + "/Qs"));
            const d = await getDocs(q);
            const res: Array<{ id: string, Q: string, Ans: string, title: string, description: string }> = [];
            d.docs.forEach((r) => {
                const l = r.data();
                res.push({ id: r.id, Ans: l.Ans, Q: l.Q, title: l.Title, description: l.Description });
            })
            setQs(res);
        }
        getQs();
    }, [scene])


    const [score, setScore] = useState(0);
    const check = (res: string, id: number) => {
        const temp = res.split(/[ ]+/)
        const ans = temp.join(" ");
        if (ans.toLowerCase().trim() === Qs[id]?.Ans) {
            setList((p) => {
                const newArr = [...p];
                if (scene === 0) newArr[id] = true;
                else if (scene === 1) newArr[id + 3] = true;
                else if (scene === 2) newArr[id + 5] = true;
                return newArr;
            })
            setScore(score + 1);
            return true
        }
        return false;
    }

    return (
        <Carousel className="text-black border-4 border-black  h-full w-full p-8  grid grid-cols-4 relative z-[0]  before:absolute before:flex before:left-[30px] before:top-[30px] before:h-[calc(100%-60px)] before:w-[calc(100%-60px)]  before:-z-[1] before:bg-slate-200 before:opacity-30">
            <div className="w-full h-full border-4 border-black row-span-3 col-span-3">
                <CarouselContent className="h-full  m-auto">
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/bedroom-scene-modified.jpeg"
                            alt="ngo"
                            fill
                        />
                        <Quiz title={Qs[0]?.title} description={Qs[0]?.description} q={Qs[0]?.Q} id={0} check={check} classname="left-[22%] bottom-[14%] w-[4%] h-[4%] " />
                        <Quiz title={Qs[1]?.title} description={Qs[1]?.description} q={Qs[1]?.Q} id={1} check={check} classname="bottom-[7%] left-[19%]  w-[5%] h-[5%] " />
                        <Quiz title={Qs[2]?.title} description={Qs[2]?.description} q={Qs[2]?.Q} id={2} check={check} classname="bottom-[12%] left-[5%]  w-[4%] h-[4%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" right-[20%] top-[22%] w-[8%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="right-[24%] bottom-[2%] w-[8%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" left-[45%] top-[50%] w-[5%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" right-[12%] top-[60%] w-[2%] h-[7%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" right-[13%] top-[45%] w-[2%] h-[7%] " />
                    </CarouselItem>
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/hut-scene-modified.jpg"
                            alt="ngo"
                            fill
                        />
                        <Quiz title={Qs[0]?.title} description={Qs[0]?.description} q={Qs[0]?.Q} id={0} check={check} classname="left-[44%] top-[44%] w-[8%] h-[10%] " />
                        <Quiz title={Qs[1]?.title} description={Qs[1]?.description} q={Qs[1]?.Q} id={1} check={check} classname="bottom-[6%] right-[27%]  w-[2%] h-[2%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" right-[27%] top-[43%] w-[5%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" right-[20%] top-[43%] w-[6%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" left-[37%] bottom-[5%] w-[5%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[25%] top-[13%] w-[5%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[22%] bottom-[10%] w-[5%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="right-[15%] bottom-[10%] w-[5%] h-[5%] " />
                    </CarouselItem>
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/ngo-scene-modified.jpg"
                            alt="ngo"
                            fill
                        />
                        <Quiz title={Qs[0]?.title} description={Qs[0]?.description} q={Qs[0]?.Q} id={0} check={check} classname="   left-[25%] top-[46%] w-[10%] h-[10%] " />
                        <Quiz title={Qs[1]?.title} description={Qs[1]?.description} q={Qs[1]?.Q} id={1} check={check} classname="   bottom-[1%] left-[43%]  w-[7%] h-[7%] " />
                        <Quiz title={Qs[2]?.title} description={Qs[2]?.description} q={Qs[2]?.Q} id={2} check={check} classname="   bottom-[10%] right-[7%]  w-[13%] h-[17%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="    left-[52%] top-[44%] w-[8%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="  left-[32%] top-[17%] w-[8%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="  right-[20%] top-[7%] w-[5%] h-[10%] " />
                    </CarouselItem>
                </CarouselContent>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full min-h-full max-h-0  border-4 border-black col-span-3">
                <h1 className=" text-2xl">Descripton {scene}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione accusamus pariatur, provident accusantium eligendi delectus ipsam velit, possimus nobis, atque quo consequuntur corporis optio distinctio esse enim reprehenderit deserunt quibusdam?</p>
            </div>
            <div className="  w-full h-full flex flex-col pt-2 border-4 border-black row-span-3 row-end-1 col-start-4 min-h-full max-h-0" >
                <h1 className=" text-3xl text-center font-bold">Score</h1>
                <p className=" text-3xl text-center mt-2 font-semibold">{score}/8</p>
                <div className="h-3/4 w-3/4 m-auto rounded-sm   flex flex-col items-center justify-center border-4 border-black">
                    {scene === 0 && (
                        <ul className="m-2 h-full w-full">
                            <h2 className="text-center text-2xl font-semibold">Clues</h2>
                            <li className="text-xl ml-2 p-4 pb-0 font-semibold">
                                <span className="  text-white mr-2">{">"}</span>
                                <span className={list[0] ? "line-through" : ""}>
                                    {Qs[0]?.title}
                                </span>
                            </li>
                            <li className="text-xl  ml-2 p-4 pb-0 font-semibold">
                                <span className=" text-white mr-2">{">"}</span>
                                <span className={list[1] ? "line-through" : ""}>
                                    {list[1] ? Qs[1]?.title : "???"}
                                </span>
                            </li>
                            <li className="text-xl  ml-2 p-4 pb-0 font-semibold">
                                <span className=" text-white mr-2">{">"}</span>
                                <span className={list[2] ? "line-through" : ""}>
                                    {list[2] ? Qs[2]?.title : "???"}
                                </span>
                            </li>
                        </ul>
                    )}
                    {scene === 1 && (
                        <ul className="m-2 h-full w-full">
                            <h2 className="text-center text-2xl font-semibold">Clues</h2>
                            <li className="text-xl ml-2 p-4 pb-0 font-semibold">
                                <span className="  text-white mr-2">{">"}</span>
                                <span className={list[3] ? "line-through" : ""}>
                                    {Qs[0]?.title}
                                </span>
                            </li>
                            <li className="text-xl  ml-2 p-4 pb-0 font-semibold">
                                <span className=" text-white mr-2">{">"}</span>
                                <span className={list[4] ? "line-through" : ""}>
                                    {list[4] ? Qs[1]?.title : "???"}
                                </span>
                            </li>
                        </ul>
                    )}
                    {scene === 2 && (
                        <ul className="m-2 h-full w-full">
                            <h2 className="text-center text-2xl font-semibold">Clues</h2>
                            <li className="text-xl ml-2 p-4 pb-0 font-semibold">
                                <span className="  text-white mr-2">{">"}</span>
                                <span className={list[5] ? "line-through" : ""}>
                                    {Qs[0]?.title}
                                </span>
                            </li>
                            <li className="text-xl  ml-2 p-4 pb-0 font-semibold">
                                <span className=" text-white mr-2">{">"}</span>
                                <span className={list[6] ? "line-through" : ""}>
                                    {list[6] ? Qs[1]?.title : "???"}
                                </span>
                            </li>
                            <li className="text-xl  ml-2 p-4 pb-0 font-semibold">
                                <span className=" text-white mr-2">{">"}</span>
                                <span className={list[7] ? "line-through" : ""}>
                                    {list[7] ? Qs[2]?.title : "???"}
                                </span>
                            </li>
                        </ul>
                    )}
                    <div className=" gap-y-2 flex flex-col animated-element w-4 text-6xl">
                        <p>
                            Time
                        </p>
                        {count}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full  border-4 border-black min-h-full max-h-0">
                <div className="mpt-6 text-white flex">
                    <div className=" w-24 h-10 m-2" onClick={() => { if (scene > 0 && scene <= 2) setScene(scene - 1) }}>
                        <CarouselPrevious size="lg" className=" bg-black w-24 h-12" />
                    </div>
                    <div className=" w-24 h-10 m-2" onClick={() => { if (scene >= 0 && scene < 2) setScene(scene + 1) }} >
                        <CarouselNext size="lg" className=" bg-black w-24 h-12" />
                    </div>
                </div>
                <Submit score={score} time={count} />
            </div>
        </Carousel>
    );
}

export default Game;