# ansi-code

Catalog of ANSI standard codes for ASCII terminals

## Install

```sh
npm install ansi-code
```

## Usage

```ts
import {font, cursor, screen, beep} from 'ansi-code'

const write = (...txt: string[]) => process.stdout.write(txt.join(''))

// Erase current screen, and move cursor position to top-left
write(
  screen.erase,
  cursor.to(0, 0)
)

// Text style
write(
  font.style.bold,
  'This is a bold text',
  font.reset,
  cursor.nextLine()
)

// Text color
write(
  font.color.red,
  'This is a red text',
  font.reset,
  cursor.nextLine()
)

// Text bgColor
write(
  font.bgColor.blue,
  'This is a text with blue background',
  font.reset,
  cursor.nextLine()
)

// Text style, color, and bgColor
write(
  font.style.underline,
  font.color.cyan,
  font.bgColor.red,
  'This is a underlined cyan text with red background',
  font.reset,
  cursor.nextLine()
)
```

## API

### Exported variables

* [font](#font)
* [cursor](#cursor)
* [screen](#screen)
* [beep](#beep)
___

### font

▪ `Const` object

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`reset` | string | \u001B[0m |
`family` | object | see below |
`style` | object | see below |
`color` | object | see below |
`bgColor` | object | see below |

**font.family**

Name | Type | Value |
------ | ------ | ------ |
default|string|\u001B[10m|
font1|string|\u001B[11m|
font2|string|\u001B[12m|
font3|string|\u001B[13m|
font4|string|\u001B[14m|
font5|string|\u001B[15m|

**font.style**

Name | Type | Value |
------ | ------ | ------ |
bold|string|\u001B[1m
italic|string|\u001B[3m
underline|string|\u001B[4m

**font.color**

Name | Type | Value |
------ | ------ | ------ |
black|string|\u001B[30m
red|string|\u001B[31m
green|string|\u001B[32m
yellow|string|\u001B[33m
blue|string|\u001B[34m
magenta|string|\u001B[35m
cyan|string|\u001B[36m
white|string|\u001B[37m
gray|string|\u001B[90m
brightRed|string|\u001B[91m
brightGreen|string|\u001B[92m
brightYellow|string|\u001B[93m
brightBlue|string|\u001B[94m
brightMagenta|string|\u001B[95m
brightCyan|string|\u001B[96m
brightWhite|string|\u001B[97m
rgb|function|(r: number, g: number, b: number) => \u001B[38;2;${r};${g}${b}m

**font.bgColor**

Name | Type | Value |
------ | ------ | ------ |
black|string|\u001B[40m
red|string|\u001B[41m
green|string|\u001B[42m
yellow|string|\u001B[43m
blue|string|\u001B[44m
magenta|string|\u001B[45m
cyan|string|\u001B[46m
white|string|\u001B[47m
gray|string|\u001B[100m
brightRed|string|\u001B[101m
brightGreen|string|\u001B[102m
brightYellow|string|\u001B[103m
brightBlue|string|\u001B[104m
brightMagenta|string|\u001B[105m
brightCyan|string|\u001B[106m
brightWhite|string|\u001B[107m
rgb|function|(r: number, g: number, b: number) => \u001B[48;2;${r};${g}${b}m

___

### cursor

▪ `Const` object

#### Properties:

Name | Type | Value | Description |
------ | ------ | ------ | ------ |
`show` | string | \u001B[?25h | Show the cursor |
`hide` | string | \u001B[?25l | Hide the cursor |
`save` | string | isAppleTerminal ? '\u001B7' : \u001Bs | Save current cursor position |
`restore` | string | isAppleTerminal ? \u001B8 : \u001Bu | Restore cursor position if saved before |
`eraseForward` | string | \u001B[0K | Erase from current cursor position to end of the line |
`eraseBackward` | string | \u001B[1K | Erase from beginning of the line to current cursor position |
`eraseLine` | string | \u001B[2K | Erase entire line |
`eraseDown` | string | \u001B[0J | Erase from current cursor position to end of screen |
`eraseUp` | string | \u001B[1J | Erase from beginning of the screen to current cursor position |
`forward` | function | (n: number) => string | Move the cursor n columns forward   |
`backward` | function | (n: number) => string | Move the cursor n columns backward   |
`up` | function | (n: number) => string | Move the cursor n rows up   |
`down` | function | (n: number) => string | Move the cursor n rows down   |
`nextLine` | function | (n: number) => string | Move the cursor to beginning of the line n rows down   |
`previsousLine` | function | (n: number) => string | Move the cursor to beginning of the line n rows up   |
`move` | function | (x: number,y: number) => string | Move the cursor to column x, row y relative to the current cursor position   |
`to` | function | (x: number,y?: number) => string | Move the cursor to column x, row y in screen (current view-port).  The position starts x: 0, y: 0 from top-left of the screen.   |

___

### screen

▪ `Const` object

#### Properties:

Name | Type | Value | Description |
------ | ------ | ------ | ------ |
`clear` | string | \u001Bc | Clear current screen |
`erase` | string | \u001B[2J | Erase entire current screen (the cursor position stays as-is) |
`eraseWhole` | string | \u001B[3J | Erase whole screen including scroll-back buffer (the cursor position stays as-is) |
`scrollUp` | function | (n: number) => \u001B[${n}S | Move entire screen up for n rows, insert new line at bottom   |
`scrollDown` | function | (n: number) => \u001B[${n}T | Insert n new lines at the top of screen   |
`setMode` | function | (mode: string) => \u001B[?${mode}h | Set mode  |
`resetMode` | function | (mode: string) => \u001B[?${mode}l | Reset mode  |
`normalBuffer` | string | \u001B[?47l | Switch to normal screen buffer |
`alternateBuffer` | string | \u001B[?47h | Switch to alternate screen buffer |
`rmcup` | string | \u001B[?1049l | Switch to normal screen buffer, clear memory before switching |
`smcup` | string | \u001B[?1049h | Switch to alternate screen buffer, clear memory before switching |

---

### beep

• `Const` : \u0007
