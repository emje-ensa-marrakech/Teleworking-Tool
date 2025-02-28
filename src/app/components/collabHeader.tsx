import Image from "next/image"
import { IoNotificationsOutline } from "react-icons/io5"

export function Header(userName :string) {
    return <div className="w-[90vw] h-[fit-content] flex flex-row items-center justify-between pl-5 pr-5 bg-white">
        <Image src={"/logo.png"} alt="Logo" width={180} height={38} />
        <div className="flex items-center justify-center ">
            <div className=" bg-gradient-to-r from-[rgba(69,168,72,0.5)] to-[rgba(1,166,187,0.5)] p-3 rounded-xl mr-3">
                Reserve Room
            </div>
            <IoNotificationsOutline className="mr-3 text-2xl" />
            <div className="bg-[rgba(74,166,89)] mr-5 ml-2 w-[6vh] h-[6vh] rounded-[50%] font-bold flex justify-center items-center">{userName.substring(0,1)}</div>
            <h1>{userName}</h1>
        </div>
    </div>

}