let handler = async (m, { conn, participants, usedPrefix, command }) => {
let BANtext = `*⚠️ ETIQUETE A UNA PERSONA*\n\n💡 EJEMPLO\n*${usedPrefix + command} @${global.suittag}*`
if (!m.mentionedJid[0] && !m.quoted) return m.reply(BANtext, m.chat, { mentions: conn.parseMention(BANtext)})
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
else who = m.chat
let users = global.db.data.users
users[who].banned = true
m.reply('*⏤͟͟͞͞💫ESTE USUARIO FUE BANEADO CON ÉXITO💫*\n\n*_[❗𝐈𝐍𝐅𝐎❗] ESTE USUARIO NO PUEDE USAR GOKU BOT-MD_*')    }
handler.tags = ['owner']
handler.command = /^banuser$/i
handler.rowner = true
export default handler
