import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { auth, db } from "@/firebase/clientApp";
import { signOut } from "firebase/auth";
import { collection,doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { any } from "zod";

interface SubmitProps {
    score: number;
    time:string
}

const Submit: React.FC<SubmitProps> = ({ score,time }) => {

    const router=useRouter();

    const [loading, setLoading] = useState(false);

    const [User, Loading, error] = useAuthState(auth());
    const [email,setEmail]=useState(any);

    useEffect(() => {
        if (!Loading && User) {
            const email:any=User.email;
            setEmail(email);
        }
    },[Loading,User]);

    const handleSubmit = async () => {
        setLoading(true);
        const q = query(collection(db(), "Users"), where("email", "==",email))
        const res=await getDocs(q);
        await updateDoc(doc(db(),"Users",res.docs[0].id),{score,time});
        setLoading(false);
        await signOut(auth());
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="bg-black w-24 h-12 text-white rounded-full m-2">Submit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-black text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.Your Answer will be Submmitted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading} className="text-black">Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} className="destructives" onClick={handleSubmit}>Submit</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Submit;