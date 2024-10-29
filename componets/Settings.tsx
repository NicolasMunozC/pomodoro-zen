import { theme } from "@/utils/theme";
import { Button } from "@nextui-org/react";
import { FaSlidersH } from "react-icons/fa";

export default function Settings({currentTheme}:{
    currentTheme: "red" | "green" | "blue"
}) {
    return (
        <Button isIconOnly className={`${theme.light.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.light.text[currentTheme]} rounded-2loxl`}><FaSlidersH/></Button>
    )
}