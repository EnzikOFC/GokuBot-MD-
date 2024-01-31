import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath, pathToFileURL } from 'url'

global.owner = [
  
  ['593939005387', '👑𝐂𝐑𝐄𝐀𝐃𝐎𝐑👑', true], ['5491168758497', '𝙴𝙽𝚉𝙸𝚃𝙾 𝙴𝙳𝙸𝚃𝙾𝚁 𝙾𝙵𝙲', true], ['573027866596', '𝙴𝙳𝙴𝚁 𝙳𝙴𝚂𝙰𝚁𝚁𝙾𝙻𝙻𝙰𝙳𝙾𝚁 𝙾𝙵𝙲', true], ['50558124470', '𝙴𝙽𝙳𝙴𝚁 𝙻𝙱', true], ['573013114854', '𝙳𝙸𝙴𝙶𝙾 𝙲𝙾𝙻𝙰𝙱𝙾𝚁𝙰𝙳𝙾𝚁', true],
  
  ['51929972576', '𝙰𝚇'], ['595981477001', '𝙳𝙾𝙽𝙰𝙳𝙾𝚁']
               ]

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +59309090909
global.confirmCode = ''

global.animxscans = ['5214531287294']
global.suittag = ['5214531287294']
global.mods = []
global.prems = []

global.packname = '© 𝙶𝙾𝙺𝚄𝙱𝙾𝚃'
global.author = 'Created By Jostin'
global.wm = '© GokuBot-MD'
global.wm2 = '𝗚oku : 𝗕𝗈𝗍'
global.azami = 'Jostin'
global.cb = 'GokuBot-MD'

global.vs = 'V2 • 1.0.5'
global.library = 'Baileys'
global.baileys = '@whiskeysockets/baileys'
global.lenguaje = 'Español'
global.menudi = ['⛶','❏','⫹⫺']
global.dev = '© 𝙶𝙾𝙺𝚄𝙱𝙾𝚃-𝙾𝙵𝙲'
global.devnum = '+52 1 729 488 8993'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => { unwatchFile(file)
console.log(chalk.yellow('Se actualizo el archivo config.js'))
import(`${file}?update=${Date.now()}`)
})
