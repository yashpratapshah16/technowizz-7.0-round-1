"use client"

import { MagnifyingGlass } from "react-loader-spinner";

const Loading = () => {
    return ( 
        <div className="h-full w-full flex flex-col items-center justify-center">
            <MagnifyingGlass height={100} width={100} glassColor="#fff" color="#000"/>
        </div>
     );
}
 
export default Loading;