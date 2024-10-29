import { Pomodoro } from "@/types/types";
import { theme } from "@/utils/theme";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { IoMdSettings } from "react-icons/io";

export default function Settings({currentTheme, setPomodoro}:{
    currentTheme: "red" | "green" | "blue",
    setPomodoro: Dispatch<SetStateAction<Pomodoro>>
}) {
    return (
        <Button isIconOnly className={`${theme.light.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.light.text[currentTheme]} rounded-2xl`}><IoMdSettings/></Button>
    )
}