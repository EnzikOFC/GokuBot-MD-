import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
'info': '𝙸 𝙽 𝙵 𝙾 𝚁 𝙼 𝙰 𝙲 𝙸 𝙾́ 𝙽 ',
'grupo': '𝙶 𝚁 𝚄 𝙿 𝙾 𝚂',
'juegos': '𝙹 𝚄 𝙴 𝙶 𝙾 𝚂',
'descargas': ' 𝙳 𝙴 𝚂 𝙲 𝙰 𝚁 𝙶 𝙰 𝚂',
'jadibot': '𝙹 𝙰 𝙳 𝙸 𝙱 𝙾 𝚃 (𝚂 𝚄 𝙱 𝙱 𝙾 𝚃', 
'nable': '𝙴 𝙽 𝙰 𝙱 𝙻 𝙴 / 𝙳 𝙸 𝚂 𝙰 𝙱 𝙻 𝙴', 
'internet': '𝙱 𝚄 𝚂 𝙲 𝙰 𝙳 𝙾 𝚁 𝙴 𝚂',
'transformador': '𝙲 𝙾 𝙽 𝚅 𝙴 𝚁 𝚃 𝙸 𝙳 𝙾 𝚁 𝙴 𝚂', 
'sticker': '𝚂 𝚃 𝙸 𝙲 𝙺 𝙴 𝚁',
'rg': '𝚁 𝙿 𝙶',
'audio': '𝙰 𝚄 𝙳 𝙸 𝙾 𝚂 𝙴 𝙵 𝙴 𝙲 𝚃 𝙾', 
'implementos': '𝙷 𝙴 𝚁 𝚁 𝙰 𝙼 𝙸 𝙴 𝙽 𝚃 𝙰 𝚂', 
'anime': '𝙰 𝙽 𝙸 𝙼 𝙴', 
'nsfw': '𝙽 𝚂 𝙵 𝚆 +18', 
'owner': '𝙾𝚆𝙽𝙴𝚁',
'ai': 'I A',
}
const defaultMenu = {
before: `╔═══❖〔 𝚄 𝚂 𝚄 𝙰 𝚁 𝙸 𝙾 〕•❖═══╗
┃╭──────────────
┃┃ 💖 *Nombre:* %name
┃┃ 💖 *Limite:* %diamond
┃┃ 💖 *Nivel:* %level
┃┃ 💖 *Rango:* %role
┃┃ 💖 *Exp:* %exp
┃╰──────────────
├≪━─━─━─━─◈─━─━─━─━≫
┃
├╔═══❖〔 𝙸 𝙽 𝙵 𝙾 〕•❖═══╗
┃╭──────────────
┃┃ 💖 *Creador:* *_Jostin💖_*
┃┃ 💖 *Tiempo Activo:* %muptime
┃┃ 💖 *Registrados:* %rtotalreg de %totalreg usuarios
┃┃ 💖 *Owner:* data0
┃╰────────────── 
├≪━─━─━─━─◈─━─━─━─━≫
┃
├╔═══❖〔 𝙷 𝙾 𝚈 〕•❖═══╗
┃╭──────────────
┃┃ ⌛️ *Fecha:* %date
┃╰──────────────
╰≪━─━─━─━─◈─━─━─━─━≫
%readmore`.trimStart(),

header: '╔═══❖〔 %category 〕•❖═══╗\n┃╭───────────',
body: '┃┃  ⚡️ %cmd',
footer: '┃╰≪━─━─━─━─◈─━─━─━─━≫\n╰≪━─━─━─━─◈─━─━─━─━≫\n',
after: `
`,
}

var handler = async (m, { conn: azami, usedPrefix: _p, __dirname }) => {

try {

let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, diamond, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'

let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
return {
help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
prefix: 'customPrefix' in plugin,
diamond: plugin.diamond,
premium: plugin.premium,
enabled: !plugin.disabled,
}
})

for (let plugin of help)
if (plugin && 'tags' in plugin)
for (let tag of plugin.tags)
if (!(tag in tags) && tag) tags[tag] = tag
conn.menu = conn.menu ? conn.menu : {}
let before = conn.menu.before || defaultMenu.before
let header = conn.menu.header || defaultMenu.header
let body = conn.menu.body || defaultMenu.body
let footer = conn.menu.footer || defaultMenu.footer
let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
let _text = [
before,
...Object.keys(tags).map(tag => {
return header.replace(/%category/g, tags[tag]) + '\n' + [
...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
return menu.help.map(help => {
return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
.replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
.replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
.trim()
}).join('\n')
}),
footer
].join('\n')
}),
after
].join('\n')

let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, diamond, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

let whoPP = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let ppBot = await conn.profilePictureUrl(whoPP, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
  
await conn.reply(m.chat, '*𝙿𝚁𝙾𝚇𝙸𝙼𝙰𝙼𝙴𝙽𝚃𝙴 𝚂𝙴 𝚁𝙴𝙼𝙴𝚃𝙸𝚁𝙰 𝙴𝙻 𝙼𝙴𝙽𝚄 𝙳𝙴𝙻 𝙱𝙾𝚃.*', fkontak, { contextInfo:{ forwardingScore: 2022, isForwarded: true, externalAdReply: {title: '👋 Hola!!', body: saludo, sourceUrl: global.ig, thumbnailUrl: ppBot }}})
m.react('💫') 

conn.sendMessage(m.chat, {text: text.trim(), mentions: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: { mentionedJid: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": wm, "containsAutoReply": true, "mediaType": 1, "thumbnail": imagen2, "mediaUrl": global.nn, "sourceUrl": global.nn}}}, {quoted: fproducto});
    
} catch (e) {
conn.reply(m.chat, `*🚩 Ocurrió un fallo*`, m, fake, )
throw e}

}
handler.help = ['help']
handler.tags = ['main']
handler.command = ['help', 'menú', 'menu'] 
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('')
  }
