import { Pomodoro, Theme, ThemeColor } from "@/types/types";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Switch, useDisclosure } from "@nextui-org/react";
import { IoMdSettings } from "react-icons/io";

export default function Settings({currentTheme, pomodoro,  setPomodoro, theme, setTheme}:{
    currentTheme: ThemeColor
    pomodoro: Pomodoro,
    setPomodoro: React.Dispatch<React.SetStateAction<Pomodoro>>,
    theme: Theme
    setTheme: React.Dispatch<React.SetStateAction<Theme>>,
}) {

    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()

    const handleSwitch = ({type}:{
        type: 'sound' | 'autoStart',
    }) => {

        switch (type) {
            case 'sound':
                setPomodoro( prev => ({...prev, options: {...prev.options, sound: !prev.options.sound}}) )
                break;

            case 'autoStart':
                setPomodoro( prev => ({...prev, options: {...prev.options, autoStart: !prev.options.autoStart}}) )
                break;
        
            default:
                break;
        }
    }

    const timesChanger = ({type, time}:
        {
            type: 'focus' | 'short' | 'long',
            time: number
        }) => {

            switch (type) {
                case 'focus':
                    setPomodoro( prev => ({...prev, times: { ...pomodoro.times, focus: time} }))
                    break;

                case 'short':
                    setPomodoro( prev => ({...prev, times: { ...pomodoro.times, short: time} }))
                    break;

                case 'long':
                    setPomodoro( prev => ({...prev, times: { ...pomodoro.times, long: time} }))
                    break;
            
                default:
                    break;
            }
    }

    return (
        <>
        <Button isIconOnly className={`${theme.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.text[currentTheme]} rounded-2xl`} onClick={onOpen}><IoMdSettings/></Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="center" backdrop="blur">
            <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalBody>
                    <div className="flex flex-row justify-between">
                        <span>Auto start</span>
                        <Switch isSelected={pomodoro.options.autoStart} onValueChange={() => handleSwitch({type: 'autoStart'})}/>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <span>Focus Time</span>
                        <Input type="number" size="sm" className='w-16' variant="flat" value={pomodoro.times.focus.toString()} onChange={event => timesChanger({type: 'focus', time: parseFloat(event.target.value)})}/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Short Break Time</span>
                        <Input type="number" size="sm" className='w-16' value={pomodoro.times.short.toString()} onChange={event => timesChanger({type: 'short', time: parseFloat(event.target.value)})}/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Long Break Time</span>
                        <Input type="number" size="sm" className='w-16' value={pomodoro.times.long.toString()} onChange={event => timesChanger({type: 'long', time: parseFloat(event.target.value)})}/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Sound</span>
                        <Switch isSelected={pomodoro.options.sound} onValueChange={()=>{handleSwitch({type:'sound'})}}/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Typography</span>
                        {/* <Switch isSelected={pomodoro.options.sound} onValueChange={()=>{handleSwitch({type:'sound'})}}/> */}
                        <Select classNames={{base: "w-32"}} size="sm" selectedKeys={[theme.font]} onChange={event => { setTheme( olds => ({...olds, font: event.target.value as Theme['font']})) }}>
                            <SelectItem key={'font-roboto'}>Roboto</SelectItem>
                            <SelectItem key={'font-roboto-mono'}>Roboto Mono</SelectItem>
                            <SelectItem key={'font-poppins'}>Poppins</SelectItem>
                            <SelectItem key={'font-montserrat'}>Montserrat</SelectItem>
                        </Select>
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