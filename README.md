# Teste Node + MongoDB

## Como rodar o projeto

### Pré requisitos

O projeto em questão utiliza a versão do Node 20.10.0 como especificado no arquivo ".tool-versions", mas é possível que funcione normalmente com outras versões

Banco MongoDB configurado

Porta 3000 do computador disponível, mas é possível configurar pelo .env

### Instalação de dependencias

Utilize o comando abaixo para instalar todos os pacotes necessários no projeto

`npm install`

### Configuração da variável de ambiente

Dentro da pasta raíz há um arquvio chamado ".env.example", basta renomealo para ".env" que todas as variáveis já estão configuradas.

Obs: Há um bloqueio por IP para conectar com o mongoDB, se for utilizar o mesmo cluster e banco que o meu entre em contato para que eu libere ou crie um novo baseado no tutorial abaixo.

[Como criar um banco de dados mongoDB](<url(https://www.mongodb.com/pt-br/basics/create-database)>)

[Como pegar o link do banco de dados para integrar ao Prisma](<url(https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/connect-your-database-typescript-mongodb)>)

### Como sincronizar o banco de dados com o projeto

Execute os comandos abaixo no terminal

`npm run db:generate && npm run db:push`

## Instruções Gerais:

Este teste avalia habilidades em MongoDB, Node.js, Express e uso de ORM.
Responda cada etapa no arquivo correspondente, com instruções detalhadas em cada seção.
Inclua comentários e documentação no código.
Documente quaisquer dúvidas ou problemas no arquivo.
Ao concluir, envie o código-fonte e arquivos relacionados.

<div id='parte1'/>

### [Parte 1: Configuração do Projeto](#parte1-an)

Crie uma aplicação Node.js usando Express.
Configure o projeto para utilizar ORM com MongoDB (sugestão: Mongoose, mas pode escolher outro).
Configure rotas básicas para operações CRUD em uma entidade fictícia "Produto", com campos: nome, preço e descrição.

<div id='parte2'/>

### [Parte 2: Modelagem e CRUD](#parte2-an)

Crie um modelo para "Produto" no MongoDB usando o ORM escolhido.
Implemente rotas para operações CRUD na entidade "Produto", incluindo validações adequadas.

<div id='parte3'/>

### [Parte 3: Consultas Avançadas](#parte3-an)

Implemente uma rota para listar produtos com preço acima de um valor especificado.
Crie uma rota para listar produtos contendo uma palavra-chave específica na descrição.

<div id='parte4'/>

### [Parte 4: Autenticação](#parte4-an)

Implemente um método de autenticação de sua escolha.

<div id='parte5'/>

### [Parte 5: Permissionamento](#parte5-an)

Implemente uma lógica de permissionamento tendo como base dois níveis: ADM e usuário básico. Onde o ADM tem todas as permissões e o usuário comum apenas a permissão de listagem.

<div id='parte6'/>

### [Parte 6: Testes](#parte6-an)

Escreva testes unitários para pelo menos duas rotas criadas, usando uma biblioteca de teste (ex: Jest, Mocha), coverage 100%.

### Observações Finais:

A avaliação considerará a estrutura do projeto, qualidade do código, eficiência das consultas, validação de entrada e implementação dos testes.
Documente quaisquer decisões de design ou considerações feitas durante o teste.

---

## Anotações sobre o teste

<div id='parte1-an'/>

### [Parte 1: Configuração do Projeto](#parte1)

- A escolha do ORM pelo prisma foi puramente por capricho, gostaria de aproveitar a oportunidade do teste para aprender algo novo
- Algumas configurações e bibliotecas também estou utilizando ou configurando pela primeira vez, também aproveitando a oportunidade para aprender algo novo, mais detalhes nos tópicos abaixo
  - Zod: é uma biblioteca que já utilizei mas nunca precisei configurar a fundo toda a utilização dela
  - Helmet: é a primeira vez que utilizo-a, descobri ela por acaso lendo sobre segurança em servidores com express
  - ESLint: adicionei ela para manter o padrão do código e me informar sobre possíveis bugs, também acredito ser essêncial para todo projeto moderno em typescript ou javascript
  - Prettier: adicionei ao projeto para manter o padrão de código também e não precisar me preocupar com formatações diferentes
  - Husky: Adicionei junto com as ferramentas ESlint e Prettier por força do hábito, mesmo não sendo necessário pode me ajudar com a padronização do código junto com o versionamento
- A principal dificuldade que tive nessa parte foi para lembrar algumas coisas necssárias para o NodeJs e Express funcionarem de forma perfeita, NestJS nos desacostuma bastante com o boilerplate pré configurado dele
  - Alguns midlewares como o de tratamento de erros por exemplo
- Utilizei o padrão de arquitetura modular pois acredito que resolva muito bem o problema geral proposto e se torna fácil de testar, debugar e adicionar novas features previstas nas próximas etapas
- Acredito que essa primeira etapa seja a mais longa e a mais necessária de auxilio de documentações, estou confiante que as próximas serão mais rápidas
- Precisei estudar um pouco sobre loggers para adicionar ao projeto e facilitar a visualização do funcionamento do backend
- Logs e tratamento de erros foram as coisas mais custosas para mim
- Achei desnecessário utilizar a entidade fíctia, já que que nessa parte já possui o ORM e o banco de dados configurados

Tempo de conclusão: 6h

<div id='parte2-an'/>

### [Parte 2: Modelagem e CRUD](#parte2)

- Essa parte foi extremamente mais simples do que a anterior. Tive apenas que adaptar um util para poder tratar erros de forma melhor.
- Da maneira que fiz o sistema na etapa anterior também facilitou para implementear o banco de dados
- Criei um env.example para colocar as variáveis necessárias para inciar o projeto
- Trabalhar com o prisma em uma tarefa com pouco conteúdo foi bem simples, mas já consigo perceber algumas dificuldades em relação ao Mongoose

Tempo de conclusão: 1h

<div id='parte3-an'/>

### [Parte 3: Consultas Avançadas](#parte3)

- Como eu imaginava essa foi a etapa mais tranquila de todas, mesmo sendo a primeira vez mexendo com prisma não tive dificuldades para realizar as querys
- Foi realizado uma alteração no midleware de validação de dados com Zod para aceitar também query
- Certas alterações em arquivos de maior complexidade eu sinto falta de testes unitários para manter o pleno funcionamento

Tempo de conclusão: 10min

<div id='parte4-an'/>

### [Parte 4: Autenticação](#parte4)

- A implementação do JWT em geral não teves grandes desafios utilizando jsonwebtoken e bcrypt
- Grande parte do tempo para a conclusão foi com alguns problemas que tive utilizando o nodemon, diretórios dinâmicos e tipagem customizada para o request
- Para resolver eu troquei o nodemon para o ts-node-dev, adicionei tsc-alias para os caminhos dinâmicos funcionarem no servidor de build e adicionei o tsconfig-path para os paths dinâmicos funcionarem com o ts-node-dev
- Limpei os comentários do tsconfig,json que foi gerado automaticamente ao adicionar typescript no projeto também para ficar mais fácil de visualizar o que poderia estar errado nas configurações de tipos customizados e caminhos dinâmicos

Tempo de conclusão: 2h

<div id='parte5-an'/>

### [Parte 5: Permissionamento](#parte5)

- Não tive nenhuma dificuldade nessa etapa
- Para implementar foi necessário apenas adicionar um novo campo no banco de dados, utilizei um enum para não ser possível outro valor
- Para adicionar os níveis do usuário apenas criei novos com uma role definida, alterei um usuário para admin diretamente no mongodb e testei as permissões

Tempo de conclusão: 30min

<div id='parte6-an'/>

### [Parte 6: Testes](#parte6)

- Essa parte foi possivelmente uma das mais complicadas para mim
- Deu bastante erro para configurar o Jest, fiquei mais ou menos uma hora para configurar corretamente
- Fiquei mais de 3h tentando fazer testes de integração com o servidor desligado
- Alguns testes que fiz não consegui cobertura de 100% dada a complexidade de testar middleware (pelo menos para mim)
- Infelizmente essa é a minha dificuldade e é o ponto que estou tentando melhorar
- Escrever todos os testes para mim também é bem demorado

Tempo de conclusão: 6h

---

### Considerações finais

Gostei bastante de concluir esse teste e agradeço a oportunidade.
