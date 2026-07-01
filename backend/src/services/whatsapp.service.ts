import { env } from '../env/index';

export async function enviarWhatsApp(mensagem: string): Promise<void> {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${env.CALLMEBOT_PHONE}&text=${encodeURIComponent(mensagem)}&apikey=${env.CALLMEBOT_APIKEY}`;
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) {
    console.error('WhatsApp falhou:', res.status, text);
  } else {
    console.log('✅ Resposta CallMeBot:', text);
  }
}

const isMain = process.argv[1]?.includes('whatsapp.service');
if (isMain) {
  enviarWhatsApp('son 😭')
    .then(() => console.log('OK'))
    .catch(console.error);
}
