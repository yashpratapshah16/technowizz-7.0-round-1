import { ProfileForm } from "./components/form";

export const revalidate=0;


const login = () => {
    return (
        <div className=" h-full w-full p-16 flex flex-col items-center justify-center relative z-[0]  before:absolute before:flex before:left-[30px] before:top-[30px] before:h-[calc(100%-60px)] before:w-[calc(100%-60px)] before:-z-[1] before:bg-slate-200 before:opacity-30">
            <div className=" w-1/3 border-black border-4 bg-neutral-400 p-4">
                <ProfileForm />
            </div>
        </div>
    );
}

export default login;