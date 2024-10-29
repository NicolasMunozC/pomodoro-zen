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

export type ThemeColor = "red" | "green" | "blue"