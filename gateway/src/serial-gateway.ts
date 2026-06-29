import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { env } from './env/index.js';

const caminhoPortaSerial = env.SERIAL_PORT;
const urlBackend = env.BACKEND_URL;
const taxaBaud = env.SERIAL_BAUD;
const urlBackendBase = new URL(urlBackend).origin;
const timeoutOfflineMs = 1_500_000; // TEST: 20_000 pra debugar 

let ultimaPlantacaoId = '';
let timerOffline: NodeJS.Timeout | null = null;

async function enviarParaBackend(dadosSensor: any): Promise<void> {
  try {
    const resposta = await fetch(urlBackend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosSensor),
    });

    if (!resposta.ok) {
      const dadosErro = await resposta.json().catch(() => null) as { erro?: string } | null;
      console.error(`❌ Servidor rejeitou os dados (Status ${resposta.status}):`, dadosErro?.erro || 'Erro desconhecido');
      return;
    }

    console.log('✅ Dados salvos com sucesso no backend.');
  } catch (err) {
    console.error('⚠️ Erro de conexão com a API Backend:', err instanceof Error ? err.message : String(err));
  }
}

function processarDadosArduino(linha: string) {
  const dadosSegmentados = linha.trim().split(',');

  if (dadosSegmentados.length !== 5) {
    console.warn(`⚠️ Ignorado: Esperado 5 colunas, recebido ${dadosSegmentados.length}.`);
    return null;
  }

  const dadosSensor = {
    plantacao_id: dadosSegmentados[0],
    umidade_solo: parseFloat(dadosSegmentados[1]),
    umidade_ar: parseFloat(dadosSegmentados[2]),
    temperatura: parseFloat(dadosSegmentados[3]),
    luminosidade: parseFloat(dadosSegmentados[4]),
  };

  const dadosValidos =
    dadosSensor.plantacao_id !== "" &&
    !isNaN(dadosSensor.umidade_solo) &&
    !isNaN(dadosSensor.umidade_ar) &&
    !isNaN(dadosSensor.temperatura) &&
    !isNaN(dadosSensor.luminosidade);

  if (!dadosValidos) {
    console.warn('⚠️ Dados ignorados: ID vazio ou conversão gerou valores não numéricos (NaN).');
    return null;
  }

  return dadosSensor;
}

let reconectar = false;

function agendarReconexao(): void {
  if (reconectar) return;

  reconectar = true;
  console.warn(`⏳ Tentando nova conexão em 5 segundos...`);

  setTimeout(() => {
    reconectar = false;
    conectarSerial();
  }, 5000);
}

function conectarSerial(): void {
  const serialPort = new SerialPort({
    path: caminhoPortaSerial,
    baudRate: taxaBaud,
  });

  const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  serialPort.on('open', () => {
    console.log(`  Conectado ao dispositivo em: ${caminhoPortaSerial} @ ${taxaBaud} bps`);
  });

  serialPort.on('error', (erro: Error) => {
    console.error(`❌ Erro na porta serial:`, erro.message);
    if (!serialPort.isOpen) {
      agendarReconexao();
    }
  });

  serialPort.on('close', () => {
    console.warn(`⚠️ Conexão perdida.`);
    agendarReconexao();

    if (ultimaPlantacaoId && !timerOffline) {
      timerOffline = setTimeout(() => {
        fetch(`${urlBackendBase}/api/alertas/dispositivo-offline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plantacao_id: ultimaPlantacaoId,
            mensagem: `⚠️ Dispositivo offline há mais de 25 minutos!`,
          }),
        }).catch(err => console.error('Falha ao notificar dispositivo offline:', err.message));
      }, timeoutOfflineMs);
    }
  });

  parser.on('data', async (linha: string) => {
    const dadosSensor = processarDadosArduino(linha);

    if (dadosSensor) {
      ultimaPlantacaoId = dadosSensor.plantacao_id;
      if (timerOffline) {
        clearTimeout(timerOffline);
        timerOffline = null;
      }

      console.log(`🌱 Plantação: ${dadosSensor.plantacao_id} | Solo: ${dadosSensor.umidade_solo}% | Ar: ${dadosSensor.umidade_ar}% | Temp: ${dadosSensor.temperatura}ºC | Luz: ${dadosSensor.luminosidade}%`);
      await enviarParaBackend(dadosSensor);
    }
  });
}

console.log('😈 Gateway AgroSensor iniciado!');
console.log(`  Rota de destino: ${urlBackend}`);
conectarSerial();
