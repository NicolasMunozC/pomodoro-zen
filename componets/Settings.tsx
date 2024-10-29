import { theme } from "@/utils/theme";
import { Button } from "@nextui-org/react";
import { IoMdSettings } from "react-icons/io";

export default function Settings({currentTheme}:{
    currentTheme: "red" | "green" | "blue"
}) {
    return (
        <Button isIconOnly className={`${theme.light.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.light.text[currentTheme]} rounded-2xl`}><IoMdSettings/></Button>
    )
}