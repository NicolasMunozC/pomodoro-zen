import { Pomodoro } from "@/types/types";
import { theme } from "@/utils/theme";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, useDisclosure } from "@nextui-org/react";
import { IoMdSettings } from "react-icons/io";

export default function Settings({currentTheme, pomodoro,  setPomodoro}:{
    currentTheme: "red" | "green" | "blue",
    pomodoro: Pomodoro,
    setPomodoro: React.Dispatch<React.SetStateAction<Pomodoro>>
}) {

    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()


    const handleAutoStart = (event: boolean) => {
        setPomodoro( prev => ({...prev, options: {...prev.options, autoStart: event}}) )
    }

    return (
        <>
        <Button isIconOnly className={`${theme.light.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.light.text[currentTheme]} rounded-2xl`} onClick={onOpen}><IoMdSettings/></Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="center">
            <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalBody>
                    <div className="flex flex-row justify-between">
                        <span>Auto start</span>
                        <Switch isSelected={pomodoro.options.autoStart} onValueChange={handleAutoStart}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    Created by <a href="https://nmunoz.vercel.app" className="font-semibold">Nicolás Muñoz</a> 🪐☕️
                </ModalFooter>
            </ModalContent>

        </Modal>
        </>
    )
}