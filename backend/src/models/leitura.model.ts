import { prisma } from '../lib/prisma';
import { Prisma } from '../../generated/prisma/client';

export const LeituraModel = {
  async criar(data: Prisma.LeituraUncheckedCreateInput) {
    return await prisma.leitura.create({
      data,
    });
  },

  async buscarTodos(pagina: number = 1, limite: number = 50) {
    const [dados, total] = await Promise.all([
      prisma.leitura.findMany({
        skip: (pagina - 1) * limite,
        take: limite,
        orderBy: { data_hora: 'desc' },
        include: { plantacao: { select: { id: true, nome: true } } },
      }),
      prisma.leitura.count(),
    ]);
    return { dados, total, pagina, totalPaginas: Math.ceil(total / limite) };
  },

  async buscarPorId(id: string) {
    return await prisma.leitura.findUnique({
      where: { id },
      include: { plantacao: { select: { id: true, nome: true } } },
    });
  },

  async buscarDadosDashboard(plantacao_id: string) {
    const [ultima, agregado, totalLeituras, totalAlertas] = await Promise.all([
      prisma.leitura.findFirst({
        where: { plantacao_id },
        orderBy: { data_hora: 'desc' },
      }),
      prisma.leitura.aggregate({
        where: { plantacao_id },
        _avg: { temperatura: true, umidade_solo: true, umidade_ar: true, luminosidade: true },
      }),
      prisma.leitura.count({ where: { plantacao_id } }),
      prisma.alerta.count({ where: { plantacao_id } }),
    ]);

    return { ultima, medias: agregado._avg, total_leituras: totalLeituras, total_alertas: totalAlertas };
  },

  async atualizar(id: string, data: Prisma.LeituraUpdateInput) {
    return await prisma.leitura.update({
      where: { id },
      data,
    });
  },

  async deletar(id: string) {
    return await prisma.leitura.delete({ where: { id } });
  },
};
