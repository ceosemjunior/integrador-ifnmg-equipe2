import { prisma } from '../lib/prisma';
import { Prisma } from '../../generated/prisma/client';

export const AlertaModel = {
  async criar(data: Prisma.AlertaCreateInput) {
    return await prisma.alerta.create({
      data,
    });
  },

  async criarMultiplos(data: Prisma.AlertaCreateManyInput[]) {
    return await prisma.alerta.createMany({
      data,
    });
  },

  async buscarPorId(id: string) {
    return await prisma.alerta.findUnique({
      where: { id },
    });
  },

  async buscarPorPlantacao(plantacao_id: string) {
    return await prisma.alerta.findMany({
      where: { plantacao_id },
      orderBy: { gerado_em: 'desc' },
    });
  },

  async buscarPorUsuario(usuario_id: string) {
    return await prisma.alerta.findMany({
      where: { usuario_id },
      orderBy: { gerado_em: 'desc' },
    });
  },

  async buscarTodos(pagina: number = 1, limite: number = 50) {
    const [dados, total] = await Promise.all([
      prisma.alerta.findMany({
        skip: (pagina - 1) * limite,
        take: limite,
        orderBy: { gerado_em: 'desc' },
      }),
      prisma.alerta.count(),
    ]);
    return { dados, total, pagina, totalPaginas: Math.ceil(total / limite) };
  },

  async buscarResumo(plantacao_id: string) {
    const [total, atencao, critico, ultimos7Dias, ultimo] = await Promise.all([
      prisma.alerta.count({ where: { plantacao_id } }),
      prisma.alerta.count({ where: { plantacao_id, tipo: 'Atencao' } }),
      prisma.alerta.count({ where: { plantacao_id, tipo: 'Critico' } }),
      prisma.alerta.count({
        where: { plantacao_id, gerado_em: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
      prisma.alerta.findFirst({
        where: { plantacao_id },
        orderBy: { gerado_em: 'desc' },
        select: { tipo: true, mensagem: true, gerado_em: true },
      }),
    ]);

    return { total, atencao, critico, ultimos_7_dias: ultimos7Dias, ultimo_alerta: ultimo };
  },

  async deletar(id: string) {
    return await prisma.alerta.delete({
      where: { id },
    });
  },
};
