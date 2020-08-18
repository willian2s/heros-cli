const { deepEqual, ok } = require('assert')
const database = require('../src/database/database')

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna Verder',
  poder: 'Eergina do anel',
  id: 2
}

describe('Suit de manipulação de Heróis',() => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)

  })

  it('Deve listar herois buscando em arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [resultado] = await database.listar(expected.id)

    deepEqual(resultado, expected)
  })

  it('Deve cadastrar herois usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

    deepEqual(actual, expected)
  })

  it('Deve remover um heroi', async () => {
    const expected = true
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

    deepEqual(resultado, expected)
  })

  it('Deve atualizar um heroi', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Money'
    }
    const novoDado = {
      nome: 'Batman',
      poder: 'Money'
    }

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

    deepEqual(resultado, expected)
  })
})
