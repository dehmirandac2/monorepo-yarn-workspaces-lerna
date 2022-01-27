## Lerna

`Lerna exec` irá pegar qualquer comando e executá-lo em todos os pacotes diferentes. Este comando instrui o Babel a executar em paralelo sobre cada pacote, puxando da pasta /src e compilando na pasta /lib. Não queremos incluir quaisquer testes ou histórias (que veremos mais tarde) no resultado compilado

```js
// Em ./package.json
"scripts": {
    "build": "lerna exec --parallel -- babel --root-mode upward src -d lib --ignore **/*.stories.js,**/*.spec.js"
}
```

Usar `--root-mode upward` (Yarn Workspaces) serve para dizer ao Babel que os node_modules estão localizados na raiz ao invés de aninhados dentro de cada um dos pacotes individuais. Isso evita que cada pacote tenha o mesmo node_modules e os extrai até a raiz

## Yarn workspaces

Utilizando o [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) para poder ter controle de versão independente para cada pacote (semver)

```js
// Em ./lerna.json
{
  "packages": ["packages/*"],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "independent"
}
```

```js
{
  "name": "root",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "lerna": "^4.0.0"
  }
}
```

Para instalar as dependências com Yarn, usando -W você instrui o Yarn a instalar as dependências fornecidas para todo o espaço de trabalho. Essas dependências geralmente são compartilhadas entre todos os pacotes.

Exemplo:

```js
yarn add --dev -W @babel/cli
```

## Múltiplos Pacotes

O principal motivo da estrutura de Monorepo é oferecer suporte a vários pacotes. Isso nos permite ter um único processo de lint, build, teste e lançamento para todos os pacotes. Vamos criar um pacote de entrada e adicionar um novo componente.

Então, dentro de `/packages` vamos criar uma pasta chamada `/components` e configurar nosso primeiro pacote.

```js
// Em ./packages/button/package.json
{
  "name": "components",
  "version": "1.0.0",
  "main": "lib/index.js",
  "module": "src/index.js",
  "dependencies": {
    "react": "latest",
    "react-dom": "latest",
    "styled-components": "latest"
  },
  "peerDependencies": {
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "styled-components": "^5.0.0"
  }
}
```

Este arquivo informa aos consumidores que module ficará dentro da pasta /src e que o resultado executado pelo Babel ( main) ficará dentro de /lib. Este será o principal ponto de entrada do pacote. Listar o peerDependencies ajuda a garantir que os consumidores estejam incluindo os pacotes corretos.

Também queremos vincular nossas dependências raiz ao nosso pacote recém-criado. Vamos criar um script para fazer isso dentro do nosso package.json.

```js
// Em ./package.json
"scripts": {
  "bootstrap": "lerna bootstrap --use-workspaces"
}

```

Agora podemos simplesmente executar yarn bootstrap para instalar e vincular todas as dependências.

## How install a local package

```js
yarn add file:packages/components
```
