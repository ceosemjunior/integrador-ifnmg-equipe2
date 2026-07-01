# AgroSensor – Sistema Inteligente de Monitoramento Climático para Agricultura Familiar

---

# Tema do Projeto

Desenvolvimento de uma solução baseada em Internet das Coisas (IoT) para monitoramento climático aplicado à agricultura familiar, utilizando sensores ambientais, sistema embarcado, gateway de comunicação e arquitetura modular para processamento e gerenciamento das informações.

---

# Proposta

O AgroSensor consiste em uma solução integrada desenvolvida para automatizar o monitoramento de variáveis ambientais em plantações, permitindo que pequenos produtores acompanhem as condições climáticas por meio de uma aplicação computacional.

O sistema utiliza sensores conectados a uma placa **Arduino Mega 2560** para realizar a coleta de informações referentes à temperatura ambiente, umidade relativa do ar, umidade do solo e luminosidade. As leituras são transmitidas por comunicação serial para um **Gateway**, responsável por validar os dados recebidos e encaminhá-los à API REST do sistema.

No backend, as informações são processadas de acordo com as regras de negócio, armazenadas em banco de dados relacional e associadas à plantação correspondente. Quando valores críticos são identificados, o sistema realiza a geração automática de alertas, podendo encaminhar notificações aos usuários por meio da integração com o serviço **CallMeBot**, utilizando o aplicativo WhatsApp.

Toda a aplicação foi desenvolvida utilizando arquitetura modular, favorecendo a separação das responsabilidades entre os componentes do sistema, facilitando sua manutenção, reutilização e expansão futura.

---

# Contexto Regional

O projeto foi desenvolvido considerando a realidade da agricultura familiar do município de **Araçuaí** e do **Vale do Jequitinhonha**, região marcada por elevada variabilidade climática, períodos prolongados de estiagem e limitações no acesso a tecnologias voltadas ao monitoramento agrícola.

Nesse contexto, o AgroSensor busca disponibilizar uma alternativa acessível, baseada em componentes eletrônicos de baixo custo e tecnologias amplamente difundidas, contribuindo para o acompanhamento das condições ambientais das plantações e apoiando a tomada de decisões relacionadas ao manejo agrícola.

---

# Objetivo Geral

Desenvolver uma solução baseada em Internet das Coisas capaz de realizar o monitoramento automático de variáveis ambientais em plantações, permitindo a aquisição, transmissão, processamento e armazenamento das informações para apoio ao gerenciamento agrícola.

---

# Objetivos Específicos

- Monitorar temperatura ambiente;
- Monitorar umidade relativa do ar;
- Monitorar umidade do solo;
- Monitorar luminosidade;
- Realizar a aquisição automática das leituras utilizando sensores conectados ao Arduino Mega 2560;
- Transmitir os dados por meio de um Gateway de comunicação serial;
- Validar e processar automaticamente as informações recebidas;
- Desenvolver uma API REST para gerenciamento das informações;
- Armazenar as leituras em banco de dados relacional;
- Gerenciar usuários, plantações, sensores, dispositivos e alertas;
- Gerar notificações automáticas em situações críticas;
- Disponibilizar uma arquitetura modular que facilite a manutenção e evolução da aplicação.

---

# Arquitetura da Solução

O AgroSensor foi desenvolvido utilizando uma arquitetura em camadas composta pelos seguintes módulos:

- Sistema Embarcado (Arduino Mega 2560);
- Sensores ambientais;
- Gateway de comunicação serial;
- Backend desenvolvido em Node.js;
- API REST;
- Banco de dados SQLite utilizando Prisma ORM;
- Serviço de notificações via WhatsApp.

Essa arquitetura reduz o acoplamento entre hardware e software, facilita futuras expansões da aplicação e proporciona maior organização estrutural.

---

# Tecnologias Utilizadas

## Hardware

- Arduino Mega 2560;
- Sensor DHT22;
- Sensor de Umidade do Solo HW-080;
- Sensor de Luminosidade LDR.

## Backend

- Node.js;
- Express.js;
- TypeScript;
- Prisma ORM;
- SQLite;
- JSON Web Token (JWT);
- bcrypt;
- Zod.

## Gateway

- Node.js;
- TypeScript;
- SerialPort;
- Zod.

## Ferramentas

- Git;
- GitHub;
- Visual Studio Code;
- Arduino IDE;
- Figma;
- BrModelo.
