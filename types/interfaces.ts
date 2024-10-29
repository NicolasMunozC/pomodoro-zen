export interface Pomodoro {
    times: {
      focus: number,
      short: number,
      long: number,
    },
    stages: string[],
    options: {
        autoStart: boolean
    }
  }