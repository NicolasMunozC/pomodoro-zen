'use client'

import Settings from "@/componets/Settings";
import { Pomodoro, Theme, ThemeColor } from "@/types/types";
// import { theme } from "@/utils/theme";
import { Button, Chip } from "@nextui-org/react";
// import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CgCoffee } from "react-icons/cg";
import { FaForward, FaPause, FaPlay } from "react-icons/fa";
import { PiBrain } from "react-icons/pi";

export default function Home() {

  const [pomodoro, setPomodoro] = useState<Pomodoro>({
    times:{
      focus: 25,
      short: 5,
      long: 15,
    },
    stages: ['Focus', 'Short Break', 'Focus', 'Short Break', 'Focus', 'Short Break', 'Focus', 'Long Break'],
    options: {
      autoStart: true,
      sound: false,
    }
  })

  const [theme, setTheme] = useState<Theme>({
    bg: {
      focus: 'bg-red-50',
      short: 'bg-green-50',
      long: 'bg-blue-50',
    },
    text: {
      focus: 'text-red-950',
      short: 'text-green-950',
      long: 'text-blue-950',
    },
    chip:{
      bg:{
        focus: 'bg-redAlpha-100/[0.15]',
        short: 'bg-greenAlpha-100/[0.15]',
        long: 'bg-blueAlpha-100/[0.15]',
      },
      border:{
        focus: 'border-red-900',
        short: 'border-green-900',
        long: 'border-blue-900',
      }
    },
    button:{
      bg: {
        focus: 'bg-redAlpha-100/[0.15]',
        short: 'bg-greenAlpha-100/[0.15]',
        long: 'bg-blueAlpha-100/[0.15]',
      },
      specialBg: {
        focus: 'bg-redAlpha-700/[0.71]',
        short: 'bg-greenAlpha-600/[0.62]',
        long: 'bg-blueAlpha-600/[0.62]',
      }
    }
  })

  const [currentMinutes, setCurrentMinutes] = useState(pomodoro.times.focus)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>('focus')

  useEffect( () => {
    if(currentStageIndex < pomodoro.stages.length){

      if(!pomodoro.options.autoStart) setIsRunning(false)

      if(pomodoro.stages[currentStageIndex] === 'Focus'){
        setCurrentTheme('focus')
        setCurrentMinutes(pomodoro.times.focus)
        setCurrentSeconds(0)
      } 
      else if (pomodoro.stages[currentStageIndex] === 'Short Break'){
        setCurrentTheme('short')
        setCurrentMinutes(pomodoro.times.short)
        setCurrentSeconds(0)
      } else {
        setCurrentTheme('long')
        setCurrentMinutes(pomodoro.times.long)
        setCurrentSeconds(0)
      }
    } 
  }, [currentStageIndex, pomodoro])
  
  useEffect(() => {

    let sound: HTMLAudioElement | null = null;


    if (isRunning) {
      const interval = setInterval(() => {
        // Calcula los próximos valores de minutos y segundos
        const nextMinutes = currentSeconds > 0 ? currentMinutes : currentMinutes - 1;
        const nextSeconds = currentSeconds > 0 ? currentSeconds - 1 : 59;
  
        // Actualiza el título con el próximo valor en vez del valor actual
        document.title = `Zen: ${nextMinutes > 9 ? nextMinutes : '0' + nextMinutes}:${nextSeconds > 9 ? nextSeconds : '0' + nextSeconds} - ${pomodoro.stages[currentStageIndex]}`;
  
        // Ajusta el temporizador en pantalla
        if (currentSeconds > 0) {
          setCurrentSeconds(currentSeconds - 1);
        } else if (currentMinutes > 0) {
          setCurrentMinutes(currentMinutes - 1);
          setCurrentSeconds(59);
        } else {
          
          if(pomodoro.options.sound){
            if (!sound) sound = new Audio('/assets/sound.mp3');
            sound.play()
          }

          if (currentStageIndex === pomodoro.stages.length - 1) {
            resetPomodoro();
          } else {
            setCurrentStageIndex(currentStageIndex + 1);
          }
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [isRunning, currentMinutes, currentSeconds, currentStageIndex, pomodoro]);

  function resetPomodoro(){
    setIsRunning(false)
    setCurrentStageIndex(0)
  }

  useEffect(()=>{
    resetPomodoro()
  },[pomodoro])


  function nextStage() {
    if(currentStageIndex >= pomodoro.stages.length - 1) resetPomodoro()
    else setCurrentStageIndex(currentStageIndex + 1)
  }


  return (
    <div className={`w-full h-full grid place-content-center ${theme.bg[currentTheme]}`}>
      <div className="w-fit h-fit flex flex-col">
        <Chip variant="bordered" classNames={{base: `${theme.chip.border[currentTheme]} px-10 py-4 text-xl mx-auto ${theme.text[currentTheme]} ${theme.chip.bg[currentTheme]}`}} startContent={pomodoro.stages[currentStageIndex] === 'Focus' ? <PiBrain/> : <CgCoffee/>}>{pomodoro.stages[currentStageIndex]}</Chip>

        <div className={`flex flex-col text-[12rem] leading-none text-center ${theme.text[currentTheme]}`}>
          <h1 className={`${isRunning ? 'font-bold' : 'font-thin'}`}>{currentMinutes > 9 ? currentMinutes : '0' + currentMinutes}</h1>
          <h1 className={`${isRunning ? 'font-bold' : 'font-thin'}`}>{currentSeconds > 9 ? currentSeconds : '0' + currentSeconds}</h1>
        </div>

        <div className='flex flex-row gap-4 mt-6 items-center justify-center'>
          <Settings theme={theme} currentTheme={currentTheme} pomodoro={pomodoro} setPomodoro={setPomodoro}/>
          <Button isIconOnly className={`${theme.button.specialBg[currentTheme]} w-32 h-24 text-2xl ${theme.text[currentTheme]} rounded-3xl`} onClick={()=>setIsRunning(!isRunning)}>{isRunning ? <FaPause/> : <FaPlay/>}</Button>
          <Button isIconOnly className={`${theme.button.bg[currentTheme]} w-16 h-16 text-xl ${theme.text[currentTheme]} rounded-2xl`} onClick={nextStage}><FaForward/></Button>
        </div>

      </div>
    </div>
  );
}
