export interface Pomodoro {
    times: {
      focus: number,
      short: number,
      long: number,
    },
    stages: string[],
    options: {
        autoStart: boolean,
        sound: boolean
    }
  }

export interface Theme {
  bg: {
    focus: string,
    short: string,
    long: string,
  },
  text: {
    focus: string,
    short: string,
    long: string,
  },
  chip:{
    bg:{
      focus: string,
      short: string,
      long: string,
    },
    border:{
      focus: string,
      short: string,
      long: string,
    }
  },
  button:{
    bg: {
      focus: string,
      short: string,
      long: string,
    },
    specialBg: {
      focus: string,
      short: string,
      long: string,
    }
  }
}

export type ThemeColor = "focus" | "short" | "long"