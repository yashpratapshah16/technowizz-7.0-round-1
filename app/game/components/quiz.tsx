import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

interface props{
    classname:string
    q:string
    check:(res:string,id:number)=>boolean
    id:number
    dis?:boolean
    title?:string
    description?:string
}
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));


export const Quiz:React.FC<props>=({classname,check,q,id,dis=false,title="Oops!",description="Nothing"})=>{

  const [open,isOpen]=useState(false);

  const [correct,setCorrect]=useState(false);

  const [ans,setAns]=useState("");

  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault();
    
    const res=check(ans,id);

    setCorrect(res);
    res? toast.success("Correct Answer!"):toast.error("Worng Answer!")
    res && wait().then((()=>isOpen(false)))
  }

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger>
      <div className={twMerge(" absolute  cursor-zoom-out ",classname)}/>
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {"You have found "+description+" to acquire this clue Answer the Following Question:"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e)=>handleSubmit(e)} className="grid gap-4 py-4">
            <h1>{q}</h1>
            <Input required autoComplete="off" disabled={correct||dis} onChange={(e)=>(setAns(e.target.value))} type="text" name="Ans" className="text-black"/>
            <Button disabled={correct||dis}>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
