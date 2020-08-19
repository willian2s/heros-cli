const Commander = require('commander')
const Database = require('./database/database')
const Heroi = require('./heroi')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "ID do Heroi")

    .option('-c, --cadastrar', "Cadastrar novo heroi")
    .option('-l, --listar', "Listar herois")
    .option('-r, --remover', "Remove um heroi pelo id")
    .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")


    .parse(process.argv)

  const heroi = new Heroi(Commander)
  
  try {
    if(Commander.cadastrar) {
      delete heroi.id
      const resultado = await Database.cadastrar(heroi)

      if(!resultado) {
        console.error('Heroi não foi cadastrado!')
        return;
      }
      console.log('Heroi cadastrado com sucesso!')
    }
    
    if(Commander.listar) {
      const resultado = await Database.listar()
      console.log(resultado)
      return;
    }

    if(Commander.remover) {
      const resultado = await Database.remover(heroi.id)
      if(!resultado) {
        console.error('Não foi possivel remover o heroi')
        return;
      }
      console.log('Heroi removido com sucesso')
    }

    if(Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);
      
      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)
      const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

      if(!resultado) {
        console.error('Não foi possivel atualizar o heroi')
        return;
      }
      console.log('Heroi atualizado com sucesso')
    }
  } catch (error) {
    console.error('Erro inesperado', error)
  }
}

main()
