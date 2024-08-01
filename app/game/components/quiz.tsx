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
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

interface props{
    classname:string
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));


export const Quiz:React.FC<props>=({classname})=>{

  const [open,isOpen]=useState(false);

  const handleSubmit=()=>{
    
  }

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger>
      <div className={twMerge(" absolute cursor-pointer",classname)}/>
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>Question</DialogTitle>
          <DialogDescription>
            Description
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e)=>{
          wait().then((()=>isOpen(false)))
          e.preventDefault();
        }} className="grid gap-4 py-4">
            <h1>Question</h1>
            <Input type="text" name="" className="text-black"/>
            <Button>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
