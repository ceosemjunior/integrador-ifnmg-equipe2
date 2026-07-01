# Modelagem do Banco de Dados — AgroSensor

## Objetivo

Este documento apresenta a modelagem lógica do banco de dados utilizada pelo AgroSensor, descrevendo as principais entidades implementadas, seus atributos e relacionamentos.

O sistema utiliza o **SQLite** como Sistema Gerenciador de Banco de Dados (SGBD) e o **Prisma ORM** como camada de acesso e gerenciamento da persistência das informações.

---

# Modelo de Dados

A modelagem foi desenvolvida para permitir o gerenciamento de usuários, plantações, sensores, dispositivos, leituras ambientais e alertas, mantendo a integridade das informações e facilitando futuras expansões da aplicação.

---

# Entidades

## Usuário

Representa os responsáveis pelo gerenciamento das informações cadastradas no sistema.

### Principais atributos

- ID
- Nome
- E-mail
- Telefone
- Senha criptografada

Relacionamentos:

- Um usuário pode possuir várias plantações.

---

## Plantação

Representa cada área monitorada pelo sistema.

### Principais atributos

- ID
- Nome
- Cultura
- Localização
- Usuário responsável

Relacionamentos:

- Pertence a um usuário.
- Pode possuir vários sensores associados.
- Possui diversas leituras ambientais.
- Possui diversos alertas.

---

## Sensor

Representa os sensores disponíveis para monitoramento das variáveis ambientais.

### Principais atributos

- ID
- Tipo
- Modelo
- Unidade de medida

Relacionamentos:

- Pode ser associado a diferentes plantações por meio da entidade de associação.

---

## PlantaçãoSensor

Entidade responsável pelo relacionamento entre sensores e plantações.

Além da associação, armazena os limites de funcionamento utilizados para geração automática de alertas.

### Principais atributos

- ID
- Plantação
- Sensor
- Valor mínimo
- Valor máximo

Relacionamentos:

- Pertence a uma plantação.
- Referencia um sensor.

---

## Dispositivo

Representa o equipamento responsável pelo envio das leituras ao sistema.

### Principais atributos

- ID
- Nome
- Identificador
- Status

Relacionamentos:

- Pode originar diversas leituras ambientais.

---

## Leitura

Armazena todas as informações coletadas pelos sensores.

### Principais atributos

- ID
- Valor da leitura
- Data e hora
- Sensor
- Plantação
- Dispositivo

Relacionamentos:

- Pertence a uma plantação.
- Está vinculada a um sensor.
- Está associada ao dispositivo responsável pela transmissão.

---

## Alerta

Representa os alertas gerados automaticamente pelo sistema.

### Principais atributos

- ID
- Tipo
- Mensagem
- Nível
- Data e hora

Relacionamentos:

- Está associado à plantação onde ocorreu o evento.

---

# Relacionamentos

O modelo de dados implementa os seguintes relacionamentos principais:

- Um usuário pode possuir várias plantações;
- Uma plantação pertence a apenas um usuário;
- Uma plantação pode possuir vários sensores;
- Um sensor pode ser associado a diferentes plantações por meio da entidade PlantaçãoSensor;
- Uma plantação possui diversas leituras;
- Um dispositivo pode originar diversas leituras;
- Uma plantação pode possuir diversos alertas.

---

# Tecnologias Utilizadas

- SQLite
- Prisma ORM

---

# Modelos do Banco de Dados

Para apoiar a documentação da estrutura do banco de dados, foram elaborados os seguintes modelos:

- **Modelo Conceitual** (`modelo_conceitual.png`), que representa as entidades e seus relacionamentos em nível de abstração, independentemente da implementação física do banco de dados;
- **Modelo Lógico** (`modelo_logico.png`), que detalha a estrutura das entidades, atributos e relacionamentos utilizados na implementação do sistema.

Também são disponibilizados os arquivos-fonte desenvolvidos no BrModelo para facilitar futuras alterações na modelagem.

Todos os arquivos encontram-se na pasta:

```text
documentacao/diagramas/
```
