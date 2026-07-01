# Casos de Uso — AgroSensor

## Objetivo

Este documento apresenta os principais casos de uso do AgroSensor, descrevendo as interações entre o usuário e o sistema durante o gerenciamento das informações e o monitoramento das variáveis ambientais.

---

# Ator do Sistema

| Ator | Descrição |
|------|-----------|
| Usuário | Responsável pelo gerenciamento das plantações, sensores, dispositivos e acompanhamento das informações monitoradas pelo sistema. |

---

# Casos de Uso

| Código | Caso de Uso | Descrição |
|--------|-------------|-----------|
| UC01 | Cadastrar usuário | Permitir o cadastro de um novo usuário no sistema. |
| UC02 | Realizar login | Permitir a autenticação do usuário. |
| UC03 | Editar usuário | Permitir a atualização das informações cadastrais do usuário. |
| UC04 | Excluir usuário | Permitir a remoção do cadastro do usuário. |
| UC05 | Cadastrar plantação | Permitir o cadastro de uma nova plantação. |
| UC06 | Editar plantação | Permitir alterar os dados de uma plantação. |
| UC07 | Excluir plantação | Permitir remover uma plantação cadastrada. |
| UC08 | Cadastrar sensor | Permitir cadastrar um novo sensor disponível no sistema. |
| UC09 | Associar sensor à plantação | Permitir vincular sensores às plantações. |
| UC10 | Definir limites do sensor | Permitir configurar valores mínimos e máximos para cada sensor associado à plantação. |
| UC11 | Cadastrar dispositivo | Permitir registrar dispositivos responsáveis pelo envio das leituras. |
| UC12 | Receber leituras ambientais | Permitir que o Gateway encaminhe automaticamente as leituras ao backend. |
| UC13 | Armazenar leituras | Registrar automaticamente as leituras ambientais no banco de dados. |
| UC14 | Gerar alerta | Criar automaticamente alertas quando os limites configurados forem ultrapassados. |
| UC15 | Consultar histórico de leituras | Permitir consultar as leituras armazenadas. |
| UC16 | Consultar histórico de alertas | Permitir visualizar os alertas registrados pelo sistema. |
| UC17 | Enviar notificação via WhatsApp | Encaminhar automaticamente alertas críticos ao usuário utilizando o serviço CallMeBot. |

---

# Fluxo Geral dos Casos de Uso

O funcionamento do sistema ocorre conforme o fluxo abaixo:

1. O usuário realiza autenticação.
2. O usuário cadastra plantações, sensores e dispositivos.
3. O usuário configura os limites de funcionamento de cada sensor.
4. O Arduino realiza a coleta das variáveis ambientais.
5. O Gateway recebe e valida as leituras.
6. O backend processa e armazena as informações.
7. O sistema verifica automaticamente se os limites configurados foram ultrapassados.
8. Caso necessário, um alerta é gerado e enviado ao usuário por meio do WhatsApp.
