# Diagramas do Projeto — AgroSensor

## Objetivo

Esta pasta reúne os principais diagramas produzidos durante o desenvolvimento do AgroSensor, utilizados para documentar a arquitetura da solução, a modelagem do banco de dados e apoiar a implementação do sistema.

Os modelos apresentados representam a estrutura atualmente implementada no projeto.

---

# Diagramas Disponíveis

## Modelo Conceitual

Arquivo:

```text
modelo_conceitual.png
```

Representa as entidades do domínio do sistema, seus atributos e relacionamentos, descrevendo a estrutura dos dados em um nível conceitual, independentemente da implementação física do banco de dados.

Principais entidades representadas:

- Usuário
- Plantação
- Sensor
- PlantaçãoSensor
- Dispositivo
- Leitura
- Alerta

Também apresenta os principais relacionamentos existentes entre essas entidades.

---

## Modelo Lógico

Arquivo:

```text
modelo_logico.png
```

Representa a estrutura lógica utilizada na implementação do banco de dados, incluindo:

- tabelas;
- atributos;
- tipos de dados;
- chaves primárias;
- chaves estrangeiras;
- cardinalidades;
- relacionamentos.

Esse modelo corresponde à estrutura utilizada pelo Prisma ORM e ao banco de dados SQLite implementado no projeto.

---

# Arquivos do BrModelo

Além das imagens, também são disponibilizados os arquivos editáveis produzidos no BrModelo:

```text
modelo_conceitual.brM3
modelo_logico.brM3
```

Esses arquivos permitem futuras alterações ou evolução da modelagem sem necessidade de recriação dos diagramas.

---

# Ferramenta Utilizada

Os diagramas foram elaborados utilizando o software **BrModelo**, amplamente empregado para modelagem de bancos de dados e documentação de projetos acadêmicos.

---

# Organização da Pasta

```text
diagramas/
├── modelo_conceitual.brM3
├── modelo_conceitual.png
├── modelo_logico.brM3
├── modelo_logico.png
└── README.md
```
