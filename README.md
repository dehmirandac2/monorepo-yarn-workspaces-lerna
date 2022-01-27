## Lerna

Lerna exec irá pegar qualquer comando e executá-lo em todos os pacotes diferentes. Este comando instrui o Babel a executar em paralelo sobre cada pacote, puxando da pasta /src e compilando na pasta /lib. Não queremos incluir quaisquer testes ou histórias (que veremos mais tarde) no resultado compilado

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
