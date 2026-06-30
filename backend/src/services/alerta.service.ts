import { tipoAlerta, DirecaoAlerta } from '../../generated/prisma/client';
import { AlertaModel } from '../models/alerta.model';
import { LeituraModel } from '../models/leitura.model';
import { PlantacaoModel } from '../models/plantacao.model';
import { PlantacaoSensorModel } from '../models/plantacao-sensor.model';
import { findOrThrow } from '../utils/find-or-throw';
import { enviarWhatsApp } from './whatsapp.service';

interface CriarAlertaDados {
  leitura_id: string;
  usuario_id: string;
  plantacao_id: string;
  tipo: tipoAlerta;
  mensagem: string;
  notificacao?: boolean;
}

export const AlertaService = {
  async criar(dados: CriarAlertaDados) {
    const alertaDados = {
      tipo: dados.tipo,
      mensagem: dados.mensagem,
      notificacao: dados.notificacao ?? false,
      leitura: { connect: { id: dados.leitura_id } },
      usuario: { connect: { id: dados.usuario_id } },
      plantacao: { connect: { id: dados.plantacao_id } },
    };
    return await AlertaModel.criar(alertaDados);
  },

  async buscarPorId(id: string) {
    return await findOrThrow(AlertaModel, id, 'alerta');
  },

  async buscarPorPlantacao(plantacao_id: string) {
    return await AlertaModel.buscarPorPlantacao(plantacao_id);
  },

  async buscarPorUsuario(usuario_id: string) {
    return await AlertaModel.buscarPorUsuario(usuario_id);
  },

  async buscarTodos(pagina?: number, limite?: number) {
    return await AlertaModel.buscarTodos(pagina, limite);
  },

  async buscarResumo(plantacao_id: string) {
    return await AlertaModel.buscarResumo(plantacao_id);
  },

  async deletar(id: string) {
    await AlertaService.buscarPorId(id);
    await AlertaModel.deletar(id);
    return { mensagem: 'Alerta removido com sucesso.' };
  },

  async gerarAlertasParaLeitura(leitura_id: string, plantacao_id: string) {
    const [leitura, plantacao, vinculos] = await Promise.all([
      LeituraModel.buscarPorId(leitura_id),
      PlantacaoModel.buscarPorId(plantacao_id),
      PlantacaoSensorModel.buscarPorPlantacao(plantacao_id),
    ]);

    if (!leitura || !plantacao) return [];

    const alertasParaCriar: { tipo: tipoAlerta; mensagem: string }[] = [];

    for (const vinculo of vinculos) {
      const valor = leitura[vinculo.sensor.tipo as keyof typeof leitura];

      if (typeof valor !== 'number') continue;

      const ehMenorQue = vinculo.sensor.direcao === DirecaoAlerta.ABAIXO;

      const excedeuCritico = ehMenorQue
        ? valor <= vinculo.limite_critico
        : valor >= vinculo.limite_critico;

      const excedeuAtencao = ehMenorQue
        ? valor <= vinculo.limite_atencao
        : valor >= vinculo.limite_atencao;

      if (excedeuCritico) {
        alertasParaCriar.push({
          tipo: tipoAlerta.Critico,
          mensagem: `Alerta Crítico: ${vinculo.sensor.nome} atingiu ${valor}. Limite crítico: ${vinculo.limite_critico}.`,
        });
      } else if (excedeuAtencao) {
        alertasParaCriar.push({
          tipo: tipoAlerta.Atencao,
          mensagem: `Alerta de Atenção: ${vinculo.sensor.nome} atingiu ${valor}. Limite de atenção: ${vinculo.limite_atencao}.`,
        });
      }
    }

    if (alertasParaCriar.length === 0) return [];

    await AlertaModel.criarMultiplos(
      alertasParaCriar.map(alerta => ({
        leitura_id,
        usuario_id: plantacao.usuario_id,
        plantacao_id,
        tipo: alerta.tipo,
        mensagem: alerta.mensagem,
      }))
    );

    alertasParaCriar.forEach(a => enviarWhatsApp(a.mensagem).catch(erro => console.error('WhatsApp error:', erro)));

    return alertasParaCriar;
  },
};
