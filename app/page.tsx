'use client'

import Settings from "@/componets/Settings";
import { theme } from "@/utils/theme";
import { Button, Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CgCoffee } from "react-icons/cg";
import { FaBrain, FaForward, FaPause, FaPlay, FaSlidersH } from "react-icons/fa";

export default function Home() {

  const [focusTime, setFocusTime] = useState(25)
  const [shortBreakTime, setShortBreakTime] = useState(5)
  const [longBreakTime, setLongBreakTime] = useState(15)
  const [currentMinutes, setCurrentMinutes] = useState(focusTime)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [autoStart, setAutoStart] = useState(true)
  const [currentTheme, setCurrentTheme] = useState('red' as ThemeColor)
  const { theme: colorMode} = useTheme()

  type ThemeColor = "red" | "green" | "blue"



  const pomodoroStages:string[] = ['Focus', 'Short Break', 'Focus', 'Short Break', 'Focus', 'Short Break', 'Focus', 'Long Break']

  const playToggle = () => {
    setIsRunning(!isRunning)
  }

  useEffect( () => {
    if(currentStage < pomodoroStages.length){

      if(!autoStart) setIsRunning(false)

      if(pomodoroStages[currentStage] === 'Focus'){
        setCurrentTheme('red')
        setCurrentMinutes(focusTime)
        setCurrentSeconds(0)
      } 
      else if (pomodoroStages[currentStage] === 'Short Break'){
        setCurrentTheme('green')
        setCurrentMinutes(shortBreakTime)
        setCurrentSeconds(0)
      } else {
        setCurrentTheme('blue')
        setCurrentMinutes(longBreakTime)
        setCurrentSeconds(0)
      }
    } 
  }, [currentStage, focusTime, shortBreakTime, longBreakTime, autoStart])
  
  useEffect( () => {
    if(isRunning) {
      const interval = setInterval( () => {
        if(currentSeconds > 0) setCurrentSeconds(currentSeconds - 1)
        else if(currentMinutes > 0){
          setCurrentMinutes(currentMinutes - 1)
          setCurrentSeconds(59)
        } else {
          if(currentStage === pomodoroStages.length - 1){
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
    if(currentStage >= pomodoroStages.length - 1) resetPomodoro()
    else setCurrentStage(currentStage + 1)
  }



  return (
    <div className={`w-full h-full grid place-content-center ${theme.light.bg[currentTheme]}`}>
      <div className="w-fit h-fit flex flex-col">
        <Chip variant="bordered" classNames={{base: `${theme.light.chip.border[currentTheme]} px-10 py-4 text-xl mx-auto ${theme.light.text[currentTheme]} ${theme.light.chip.bg[currentTheme]}`}} startContent={pomodoroStages[currentStage] === 'Focus' ? <FaBrain/> : <CgCoffee/>}>{pomodoroStages[currentStage]}</Chip>

        <div className={`flex flex-col text-[12rem] leading-none text-center ${theme.light.text[currentTheme]}`}>
          <h1 className={`${isRunning ? 'font-bold' : 'font-thin'}`}>{currentMinutes > 9 ? currentMinutes : '0' + currentMinutes}</h1>
          <h1 className={`${isRunning ? 'font-bold' : 'font-thin'}`}>{currentSeconds > 9 ? currentSeconds : '0' + currentSeconds}</h1>
        </div>

        <div className='flex flex-row gap-4 mt-6 items-center justify-center'>
          {/* <SettingsButton currentTheme={currentTheme} focusTime={focusTime} setFocusTime={setFocusTime} shortBreakTime={shortBreakTime} setShortBreakTime={setShortBreakTime} longBreakTime={longBreakTime} setLongBreakTime={setLongBreakTime} autoStart={autoStart} setAutoStart={setAutoStart}   /> */}
          {/* <PlayButton currentTheme={currentTheme} isRunning={isRunning} setIsRunning={setIsRunning} /> */}
          <Settings currentTheme={currentTheme}/>
          <Button isIconOnly className={`${theme.light.button.specialBg[currentTheme]} w-32 h-24 text-2xl ${theme.light.text[currentTheme]} rounded-3xl`} onClick={playToggle}>{isRunning ? <FaPause/> : <FaPlay/>}</Button>
          <Button isIconOnly className={`${theme.light.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.light.text[currentTheme]} rounded-2xl`} onClick={nextStage}><FaForward/></Button>
          {/* <ForwardButton currentTheme={currentTheme} currentStage={currentStage} pomodoroStages={pomodoroStages} setCurrentStage={setCurrentStage} /> */}
        </div>

      </div>
    </div>
  );
}
