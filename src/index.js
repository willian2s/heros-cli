const Commander = require('commander')
const Database = require('./database')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .parse(process.argv)

  try {
    
  } catch (error) {
    console.error('Erro inesperado', error)
  }
}

main()
