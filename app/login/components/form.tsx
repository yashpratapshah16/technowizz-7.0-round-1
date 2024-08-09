"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { auth, db } from "@/firebase/clientApp"
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    Player1_name: z.string().min(2, {
        message: "Player1 must be at least 2 characters.",
    }),
    Player2_name: z.string().min(2, {
        message: "Player2 must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invail email format.",
    })
})

export function ProfileForm() {

    const [value,setValues]=useState({Player1_name:"",Player2_name:"",email:""});

    const [signUp, user, loading, error] = useCreateUserWithEmailAndPassword(auth());

    const router = useRouter();

    const [User, Loading, Error] = useAuthState(auth());

    useEffect(() => {
        if (!loading && user) {
            const p2 = async () => {
                await addDoc(collection(db(), "Users"), {
                    email: value.email,
                    player1: value.Player1_name,
                    player2: value.Player2_name,
                    score:"0"
                });
            }
            p2();
            router.push("/");
        }
        if (!Loading && User) {
            router.push("/");
        }
        if(!loading && error){
            toast.error("Email is already used!");
        }
    }, [router, loading, user, Loading, User,error,value]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Player1_name: "",
            Player2_name: "",
            email: "",
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        signUp(values.email, Date.now().toString())
        setValues(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-black">
                <h1 className="text-center text-2xl">Welcome to The Round 1!</h1>
                <p className="text-center">Login</p>
                <FormField
                    control={form.control}
                    name="Player1_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Player1</FormLabel>
                            <FormControl>
                                <Input disabled={loading} autoComplete="off" className=" text-black" placeholder="Player1 Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Player2_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Player2</FormLabel>
                            <FormControl>
                                <Input disabled={loading} autoComplete="off" className=" text-black" placeholder="Player2 Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={loading} autoComplete="off" className=" text-black" placeholder="Ex:Technowizz7@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading}
                    className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000,45%,rgb(163,163,163),55%,#000)] bg-[length:200%_100%] px-6 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Form>
    )
}
