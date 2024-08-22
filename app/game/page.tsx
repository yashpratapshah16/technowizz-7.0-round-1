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

const desc = ["Detectives Vector Clark and Shaw Chen enter Maria James' room, now a scene of chaos reflecting her final moments of despair. Amid overturned furniture, scattered belongings, and torn papers, they carefully search for clues that might explain her tragic suicide. A locked box, a phone with missed calls, —all suggest deeper secrets waiting to be uncovered. As they methodically piece together these fragments, they edge closer to understanding the truth behind Maria’s death and the forces that drove her to this desperate act.", "After uncovering the location from Maria’s phone, Detectives Vector Clark and Shaw Chen embark on a tense pursuit of the elusive Cypher. Their journey leads them to a desolate, isolated area where they discover the Cypher’s temporary headquarters—an abandoned structure shrouded in secrecy. The place, though seemingly deserted, holds subtle traces left behind intentionally. These trails—discarded documents, encrypted codes, and strategic markings—are clues left by the Cypher, challenging the detectives to decode them. With every step, Vector and Shaw get closer to unmasking the Cypher’s true identity and uncovering the sinister plans hidden within this barren landscape.", "Following a meticulous search at the previous locations, Detectives Vector Clark and Shaw Chen arrive at 'Dream A Smile', Maria James’ cherished second home—an NGO where the devastating fraud took place. This place, once a symbol of hope and compassion, now holds the secrets to Maria’s downfall. The detectives comb through the rooms, carefully examining financial records, donation logs, and digital devices, all in search of the crucial clues that could unravel the mystery. Each piece of evidence they uncover brings them one step closer to understanding the full extent of the fraud that ultimately led to Maria’s tragic fate."]


const Game = () => {
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            // Prevent F5 key press
            if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
                event.preventDefault();
                // Optionally display a message or alert
                // alert('Refresh is disabled on this page. Please use other means to navigate.');
            }
        };

        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [loading, SetLoading] = useState(false);

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
    const [time, setTime] = useState("00:00");

    useEffect(() => {
        const timer = (count: number) => {
            const min = Math.floor((count) / 60);
            const sec = (count) % 60;
            let secT = "" + sec, minT = "" + min;
            if (sec >= 0 && sec <= 9) secT = `0${sec}`
            if (min > -1 && min <= 9) minT = "0" + min
            setCount(minT + ":" + secT)
        }
        const counter = (count: number) => {
            const min = Math.floor((count) / 60);
            const sec = (count) % 60;
            let secT = "" + sec, minT = "" + min;
            if (sec >= 0 && sec <= 9) secT = `0${sec}`
            if (min > -1 && min <= 9) minT = "0" + min
            setTime(minT + ":" + secT)
        }
        let countdown = 15*60;
        let timedown = 0 * 60;
        const x = setInterval(() => {
            timer(countdown--);
            counter(timedown++);
            if (countdown < 0) {
                clearInterval(x);
                signOut(auth())
            }
        }, 1000)
    }, [])


    useEffect(() => {
        SetLoading(true);
        const getQs = async () => {
            const q = query(collection(db(), "Questions/1/Scene/" + scene + "/Qs"));
            const d = await getDocs(q);
            const res: Array<{ id: string, Q: string, Ans: string, title: string, description: string }> = [];
            d.docs.forEach((r) => {
                const l = r.data();
                res.push({ id: r.id, Ans: l.Ans, Q: l.Q, title: l.Title, description: l.Description });
            })
            setQs(res);
            SetLoading(false);
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
                            src="/bedroom-scene-2-BW.jpg"
                            alt="ngo"
                            fill
                        />
                        <Quiz title={Qs[0]?.title} description={Qs[0]?.description} q={Qs[0]?.Q} id={0} check={check} classname="right-[35%] bottom-[12%] w-[5%] h-[5%] " />
                        <Quiz title={Qs[1]?.title} description={Qs[1]?.description} q={Qs[1]?.Q} id={1} check={check} classname="bottom-[28%] left-[36%]  w-[1%] h-[4%] " />
                        <Quiz title={Qs[2]?.title} description={Qs[2]?.description} q={Qs[2]?.Q} id={2} check={check} classname="bottom-[11%] left-[28%]  w-[6%] h-[5%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[20%] top-[45%] w-[6%] h-[11%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[24%] bottom-[3%] w-[7%] h-[7%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[44%] bottom-[9%] w-[5%] h-[5%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[39%] top-[31%] w-[5%] h-[8%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[37%] top-[21%] w-[4%] h-[8%] " />
                    </CarouselItem>
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/hut-scene-2-BW.jpg"
                            alt="ngo"
                            fill
                        />
                        <Quiz title={Qs[0]?.title} description={Qs[0]?.description} q={Qs[0]?.Q} id={0} check={check} classname="left-[3%] top-[45%] w-[7%] h-[20%] " />
                        <Quiz title={Qs[1]?.title} description={Qs[1]?.description} q={Qs[1]?.Q} id={1} check={check} classname="bottom-[36%] right-[3%]  w-[2%] h-[7%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[37%] top-[43%] w-[7%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[45%] top-[41%] w-[10%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[42%] bottom-[26%] w-[3%] h-[3%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="left-[29%] bottom-[9%] w-[7%] h-[7%] " />
                    </CarouselItem>
                    <CarouselItem className="relative">
                        <Image
                            className=" object-contain"
                            src="/ngo-scene-2-BW.jpg"
                            alt="ngo"
                            fill
                        />
                        <Quiz title={Qs[0]?.title} description={Qs[0]?.description} q={Qs[0]?.Q} id={0} check={check} classname="right-[39%] top-[42%] w-[3%] h-[6%] " />
                        <Quiz title={Qs[1]?.title} description={Qs[1]?.description} q={Qs[1]?.Q} id={1} check={check} classname="top-[46%] left-[10%]  w-[4%] h-[4%] " />
                        <Quiz title={Qs[2]?.title} description={Qs[2]?.description} q={Qs[2]?.Q} id={2} check={check} classname="bottom-[1%] left-[3%]  w-[10%] h-[23%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" left-[19%] top-[32%] w-[11%] h-[15%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" left-[47%] bottom-[24%] w-[5%] h-[13%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname=" right-[10%] bottom-[1%] w-[5%] h-[7%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="right-[15%] bottom-[12%] w-[10%] h-[10%] " />
                        <Quiz dis q={defaultQ} id={1} check={check} classname="right-[15%] top-[32%] w-[5%] h-[8%] " />
                    </CarouselItem>
                </CarouselContent>
            </div>
            <div className=" bg-black text-white flex flex-col items-center justify-center w-full h-full min-h-full max-h-0 border-4 border-black col-span-3">
                <h1 className="text-3xl">Scene {scene + 1}</h1>
                <p className="font-semibold text-base">{desc[scene]}</p>
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
                                    {!loading && list[1] ? Qs[1]?.title : "???"}
                                </span>
                            </li>
                            <li className="text-xl  ml-2 p-4 pb-0 font-semibold">
                                <span className=" text-white mr-2">{">"}</span>
                                <span className={list[2] ? "line-through" : ""}>
                                    {!loading && list[2] ? Qs[2]?.title : "???"}
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
                                    {!loading && list[4] ? Qs[1]?.title : "???"}
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
                                    {!loading && list[6] ? Qs[1]?.title : "???"}
                                </span>
                            </li>
                            <li className="text-xl  ml-2 p-4 pb-0 font-semibold">
                                <span className=" text-white mr-2">{">"}</span>
                                <span className={list[7] ? "line-through" : ""}>
                                    {!loading && list[7] ? Qs[2]?.title : "???"}
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
                <Submit score={score} time={time} />
            </div>
        </Carousel>
    );
}

export default Game;