const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
  constructor() {
    this.NOME_ARQUIVO = './src/database/herois.json'
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')

    return JSON.parse(arquivo.toString())
  }

  async escreverDadosArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))

    return true
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo()
    const id = heroi.id <= 2 ? heroi.id : Date.now();

    const heroiComId = {
      id,
      ...heroi
    }

    const dadosFinal = [
      ...dados,
      heroiComId
    ]
    
    const resultado = await this.escreverDadosArquivo(dadosFinal)

    return resultado
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo()
    const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
    return dadosFiltrados
  }

  async remover(id) {
    if(!id) {
      return await this.escreverDadosArquivo([])
    }

    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))
    if(indice === -1) {
      throw Error('O heroi informado não existe')
    }
    dados.splice(indice, 1)
    
    return await this.escreverDadosArquivo(dados)
  }

  async atualizar(id, mod) {
    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))

    if(indice === -1) {
      throw Error('O heroi informado não existe')
    }

    const atual = dados[indice]
    const objAtualizar = {
      ...atual,
      ...mod
    }
    dados.splice(indice, 1)

    return await this.escreverDadosArquivo([
      ...dados,
      objAtualizar
    ])
  }
}

module.exports = new Database()
