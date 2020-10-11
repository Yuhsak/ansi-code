const isAppleTerminal = process.env.TERM_PROGRAM === 'Apple_Terminal'

/** Control Sequence Prefix */
const CSP = '\x1b['

export const font = {
  reset: CSP + '0m' as '\x1b[0m',
  family: {
    default: CSP + '10m' as '\x1b[10m',
    font1: CSP + '11m' as '\x1b[11m',
    font2: CSP + '12m' as '\x1b[12m',
    font3: CSP + '13m' as '\x1b[13m',
    font4: CSP + '14m' as '\x1b[14m',
    font5: CSP + '15m' as '\x1b[15m',
  },
  style: {
    bold: CSP + '1m' as '\x1b[1m',
    italic: CSP + '3m' as '\x1b[3m',
    underline: CSP + '4m' as '\x1b[4m',
  },
  color: {
    black: CSP + '30m' as '\x1b[30m',
    red: CSP + '31m' as '\x1b[31m',
    green: CSP + '32m' as '\x1b[32m',
    yellow: CSP + '33m' as '\x1b[33m',
    blue: CSP + '34m' as '\x1b[34m',
    magenta: CSP + '35m' as '\x1b[35m',
    cyan: CSP + '36m' as '\x1b[36m',
    white: CSP + '37m' as '\x1b[37m',
    gray: CSP + '90m' as '\x1b[90m',
    brightRed: CSP + '91m' as '\x1b[91m',
    brightGreen: CSP + '92m' as '\x1b[92m',
    brightYellow: CSP + '93m' as '\x1b[93m',
    brightBlue: CSP + '94m' as '\x1b[94m',
    brightMagenta: CSP + '95m' as '\x1b[95m',
    brightCyan: CSP + '96m' as '\x1b[96m',
    brightWhite: CSP + '97m' as '\x1b[97m',
    rgb: (r: number, g: number, b: number) => `${CSP}38;2;${r};${g};${b}m`,
  },
  bgColor: {
    black: CSP + '40m' as '\x1b[40m',
    red: CSP + '41m' as '\x1b[41m',
    green: CSP + '42m' as '\x1b[42m',
    yellow: CSP + '43m' as '\x1b[43m',
    blue: CSP + '44m' as '\x1b[44m',
    magenta: CSP + '45m' as '\x1b[45m',
    cyan: CSP + '46m' as '\x1b[46m',
    white: CSP + '47m' as '\x1b[47m',
    gray: CSP + '100m' as '\x1b[100m',
    brightRed: CSP + '101m' as '\x1b[101m',
    brightGreen: CSP + '102m' as '\x1b[102m',
    brightYellow: CSP + '103m' as '\x1b[103m',
    brightBlue: CSP + '104m' as '\x1b[104m',
    brightMagenta: CSP + '105m' as '\x1b[105m',
    brightCyan: CSP + '106m' as '\x1b[106m',
    brightWhite: CSP + '107m' as '\x1b[107m',
    rgb: (r: number, g: number, b: number) => `${CSP}48;2;${r};${g};${b}m`,
  },
}

const setMode = (mode: number) => `${CSP}?${mode}h`

const resetMode = (mode: number) => `${CSP}?${mode}l`

const clearScreen = '\x1bc' as '\x1bc'

const eraseScreen = `${CSP}2J` as '\x1b[2J'

export const cursor = {

  /** Show the cursor */
  show: setMode(25) as '\x1b[?25h',

  /** Hide the cursor */
  hide: resetMode(25) as '\x1b[?25l',

  /** Move the cursor n rows up
   * @param {number} [n=1] - number of rows to move up (default: 1)
   * @returns {string} ANSI escape code "\u001B[{n}A"
   */
  up: (n: number=1) => `${CSP}${n}A`,

  /** Move the cursor n rows down
   * @param {number} [n=1] - number of rows to move down (default: 1)
   * @returns {string} ANSI escape code "\u001B[{n}B"
   */
  down: (n: number = 1) => `${CSP}${n}B`,

  /** Move the cursor n columns forward
   * @param {number} [n=1] - number of columns to move forward (default: 1)
   * @returns {string} ANSI escape code "\u001B[{n}C"
   */
  forward: (n: number = 1) => `${CSP}${n}C`,

  /** Move the cursor n columns backward
   * @param {number} [n=1] - number of columns to move backward (default: 1)
   * @returns {string} ANSI escape code "\u001B[{n}D"
   */
  backward: (n: number = 1) => `${CSP}${n}D`,

  /** Move the cursor to beginning of the line n rows down
   * @param {number} [n=1] - number of rows to move down (default: 1)
   * @returns {string} ANSI escape code "\u001B[{n}E"
   */
  nextLine: (n: number = 1) => `${CSP}${n}E`,

  /** Move the cursor to beginning of the line n rows up
   * @param {number} [n=1] - number of rows to move up (default: 1)
   * @returns {string} ANSI escape code "\u001B[{n}F"
   */
  previsousLine: (n: number = 1) => `${CSP}${n}F`,

  /** Move the cursor to column x, row y in screen (current view-port).
   *  The position starts x: 0, y: 0 from top-left of the screen.
   * @param {number} x - column position from left edge of the screen
   * @param {number} [y] - row position from top edge of the screen. If not specified, cursor will only move horizontal.
   * @returns {string} ANSI escape code "\u001B[{x+1}G" or "\u001B[{y+1};{x+1}H"
   */
  to: (x: number, y?: number) => {
    if (typeof y !== 'number') return `${CSP}${x+1}G`
    return `${CSP}${y+1};${x+1}H`
  },

  /** Move the cursor to column x, row y relative to the current cursor position
   * @param {number} x - relative column position from current column opsition
   * @param {number} [y=0] - relative row position from current row opsition (default: 0)
   * @returns {string} ANSI escape code
   */
  move: (x: number, y: number=0) => {
    let c = ''
    if (x > 0) {
      c += cursor.forward(x)
    } else if (x < 0) {
      c += cursor.backward(-x)
    }
    if (y > 0) {
      c += cursor.down(y)
    } else if (y < 0) {
      c += cursor.up(-y)
    }
    return c
  },

  /** Save the current cursor position */
  save: isAppleTerminal ? '\x1b7' : `${CSP}s`,

  /** Restore the cursor position if saved before */
  restore: isAppleTerminal ? '\x1b8' : `${CSP}u`,

  /** Erase from current position to end of the line */
  eraseForward: `${CSP}0K` as '\x1b[0K',

  /** Erase from beginning of the line to current position */
  eraseBackward: `${CSP}1K` as '\x1b[1K',

  /** Erase entire line */
  eraseLine: `${CSP}2K` as '\x1b[2K',

  /** Erase from current position to end of screen */
  eraseDown: `${CSP}0J` as '\x1b[0J',

  /** Erase from beginning of the screen to current position  */
  eraseUp: `${CSP}1J` as '\x1b[1J',
}

export const screen = {
  /** Set mode
   * @param {number} mode
   * @returns {string} ANSI escape code "\u001B[{mode}h"
   */
  setMode,

  /** Reset mode
   * @param {number} mode
   * @returns {string} ANSI escape code "\u001B[?{mode}l"
   */
  resetMode,

  /** Move entire screen up for n rows, insert new line at bottom
   * @param {number} n - number of rows to move up the screen
   * @returns {string} ANSI escape code "\u001B[{n}S"
   */
  scrollUp: (n: number = 1) => `${CSP}${n}S`,

  /** Insert n new lines at the top of screen
   * @param {number} n - number of lines
   * @returns {string} ANSI escape code "\u001B[{n}T"
   */
  scrollDown: (n: number = 1) => `${CSP}${n}T`,

  /** Erase entire current screen (the cursor position stays as-is) */
  erase: eraseScreen,

  /** Erase whole screen including scroll-back buffer (the cursor position stays as-is) */
  eraseWhole: `${CSP}3J` as '\x1b[3J',

  /** Clear current screen */
  clear: clearScreen,

  /** Switch to alternate screen buffer */
  alternateBuffer: setMode(47) as '\x1b[?47h',

  /** Switch to normal screen buffer */
  normalBuffer: resetMode(47) as '\x1b[?47l',

  /** Switch to alternate screen buffer, clear memory before switching */
  smcup: setMode(1049) as '\x1b[?1049h',

  /** Switch to normal screen buffer, clear memory before switching */
  rmcup: resetMode(1049) as '\x1b[?1049l'
}

export const beep = '\x07' as '\x07'
