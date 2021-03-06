# CLI HERO

CLI CRUD para gerenciar herois.

## Comandos disponiveis

```
'-n, --nome [value]', "Nome do Heroi"
'-p, --poder [value]', "Poder do Heroi"
'-i, --id [value]', "ID do Heroi"

'-c, --cadastrar', "Cadastrar novo heroi"
'-l, --listar', "Listar herois"
'-r, --remover', "Remove um heroi pelo id"
'-a, --atualizar [value]', "Atualizar um heroi pelo id"
```

## Como rodar

Este projeto fui construindo utilizando o gerenciador de pacotes NPM, porém, nada o impede de utilizar o YARN se assim preferir.

1 - Clone o repositório:

```
git clone https://github.com/willian2s/heros-cli.git
```

2 - Instale as dependências

```
npm install
```

> Lembrando que você é livre para utilizar o YARN.

3 - Renomeie o aquivo `herois.json.example` para `herois.json`

4 - Rode:

* Para adicionar um novo heroi:
```
node src/index.js -c -n Batman -p Investigativo
```

* Para lista herois:
```
node src/index.js -l
```

* Para atualizar um heroi:
```
node src/index.js -a -i idDoHeroi -n Batman -p Dinheiro
```

* Para Remover um heroi:
```
node src/index.js -r -i idDoHeroi
```
