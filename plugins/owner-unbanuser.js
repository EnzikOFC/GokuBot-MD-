let handler = async (m, {conn, text}) => {
  if (!text) throw "*[❗𝐈𝐍𝐅𝐎❗] TIENE QUE INGRESAR EL @tag DE ALGUN USUARIO*"
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw "*[❗𝐈𝐍𝐅𝐎❗] DEBE INGRESAR EL @tag DE ALGUN USUARIO*"
  let users = global.db.data.users
  users[who].banned = false
  conn.reply(m.chat, `*⏤͟͟͞͞🍓ESTE USUARIO FUE DESBANEADO CON ÉXITO*\n*[🌟] YA PUEDE USAR GOKU BOT-MD*`, m)}
handler.help = ["unbanuser"]
handler.tags = ["owner"]
handler.command = /^unbanuser$/i
handler.rowner = true
export default handler
