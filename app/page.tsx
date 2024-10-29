'use client'

import Settings from "@/componets/Settings";
import { Pomodoro } from "@/types/interfaces";
import { theme } from "@/utils/theme";
import { Button, Chip } from "@nextui-org/react";
// import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CgCoffee } from "react-icons/cg";
import { FaBrain, FaForward, FaPause, FaPlay } from "react-icons/fa";

export default function Home() {

  const [pomodoro, setPomodoro] = useState<Pomodoro>({
    times:{
      focus: 25,
      short: 5,
      long: 15,
    },
    stages: ['Focus', 'Short Break', 'Focus', 'Short Break', 'Focus', 'Short Break', 'Focus', 'Long Break'],
    options:{
      autoStart: true
    }
  })

  const [currentMinutes, setCurrentMinutes] = useState(pomodoro.times.focus)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('red' as ThemeColor)
  // const { theme: colorMode} = useTheme()

  type ThemeColor = "red" | "green" | "blue"

  const playToggle = () => {
    setIsRunning(!isRunning)
  }

  useEffect( () => {
    if(currentStage < pomodoro.stages.length){

      if(!pomodoro.options.autoStart) setIsRunning(false)

      if(pomodoro.stages[currentStage] === 'Focus'){
        setCurrentTheme('red')
        setCurrentMinutes(pomodoro.times.focus)
        setCurrentSeconds(0)
      } 
      else if (pomodoro.stages[currentStage] === 'Short Break'){
        setCurrentTheme('green')
        setCurrentMinutes(pomodoro.times.short)
        setCurrentSeconds(0)
      } else {
        setCurrentTheme('blue')
        setCurrentMinutes(pomodoro.times.long)
        setCurrentSeconds(0)
      }
    } 
  }, [currentStage, pomodoro])
  
  useEffect( () => {
    if(isRunning) {
      const interval = setInterval( () => {
        if(currentSeconds > 0) setCurrentSeconds(currentSeconds - 1)
        else if(currentMinutes > 0){
          setCurrentMinutes(currentMinutes - 1)
          setCurrentSeconds(59)
        } else {
          if(currentStage === pomodoro.stages.length - 1){
            resetPomodoro()
          } else {
            setCurrentStage(currentStage + 1)
          }
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  })

  function resetPomodoro(){
    setIsRunning(false)
    setCurrentStage(0)
  }


  function nextStage() {
    if(currentStage >= pomodoro.stages.length - 1) resetPomodoro()
    else setCurrentStage(currentStage + 1)
  }



  return (
    <div className={`w-full h-full grid place-content-center ${theme.light.bg[currentTheme]}`}>
      <div className="w-fit h-fit flex flex-col">
        <Chip variant="bordered" classNames={{base: `${theme.light.chip.border[currentTheme]} px-10 py-4 text-xl mx-auto ${theme.light.text[currentTheme]} ${theme.light.chip.bg[currentTheme]}`}} startContent={pomodoro.stages[currentStage] === 'Focus' ? <FaBrain/> : <CgCoffee/>}>{pomodoro.stages[currentStage]}</Chip>

        <div className={`flex flex-col text-[12rem] leading-none text-center ${theme.light.text[currentTheme]}`}>
          <h1 className={`${isRunning ? 'font-bold' : 'font-thin'}`}>{currentMinutes > 9 ? currentMinutes : '0' + currentMinutes}</h1>
          <h1 className={`${isRunning ? 'font-bold' : 'font-thin'}`}>{currentSeconds > 9 ? currentSeconds : '0' + currentSeconds}</h1>
        </div>

        <div className='flex flex-row gap-4 mt-6 items-center justify-center'>
          <Settings currentTheme={currentTheme}/>
          <Button isIconOnly className={`${theme.light.button.specialBg[currentTheme]} w-32 h-24 text-2xl ${theme.light.text[currentTheme]} rounded-3xl`} onClick={playToggle}>{isRunning ? <FaPause/> : <FaPlay/>}</Button>
          <Button isIconOnly className={`${theme.light.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.light.text[currentTheme]} rounded-2xl`} onClick={nextStage}><FaForward/></Button>
        </div>

      </div>
    </div>
  );
}
