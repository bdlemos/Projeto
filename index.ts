import { recuperaProduto, adicionarProduto, carregaEstoque, criaProduto, listaEstoque, removeProduto, valorTotal, mediaValor, qtdTotalItems, pesoTotal, mediaPeso, qtdTotalProdutos } from './controller/controleEstoque';
import { Data } from './model/data.interface';
import readline from 'readline';

async function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("Escolha uma opção:");
  console.log("1. Adicionar Produto");
  console.log("2. Remover Produto");
  console.log("3. Listar Estoque");
  console.log("4. Valor Total");
  console.log("5. Peso Total");
  console.log("6. Média de Valor dos Produtos");
  console.log("7. Média de Peso dos Produtos");
  console.log("8. Quantidade Total de itens no estoque");
  console.log("9. Quantidade Total de produtos único no estoque");
  console.log("0. Sair");
}

async function main() {
  carregaEstoque();
  while (true) {
    menu();

    const option = await askQuestion("Opção: ");
    console.log('\n');

    switch (option) {
      case '1':

        var nome = await askQuestion("Nome/ID do produto: ");
        var peso = parseFloat(await askQuestion("Peso do produto: "));
        var valor = parseFloat(await askQuestion("Valor do produto: "));
        var qtd = parseInt(await askQuestion("Quantidade do produto: "));
        const data = criaProduto(nome, peso, valor, qtd);

        await adicionarProduto(data);
        break;
      case '2':
          const id = await askQuestion("ID do produto: ");
          try{
            console.log(await recuperaProduto(id));
          }catch(error){
            console.log(error);
            break;
          }
          console.log("Você deseja remover esse produto? \n0. Não\n1. Sim");
          const option = await askQuestion("Opção: ");
          if (option == '0') {
            break;
          }

          await removeProduto(id);
          break;
      case '3':
        listaEstoque();
        break;
      case '4':
        console.log('O valor total é:',await valorTotal(), 'R$\n');
        break;
      case '5':
        console.log('O peso total é: ',await pesoTotal(), 'kg\n');
        break;
      case '6':
        console.log('A média de valor dos produtos é: ',await mediaValor(), 'R$\n');
        break;
      case '7':
        console.log('A média de peso dos produtos é: ',await mediaPeso(), 'kg\n');
        break;
      case '8':
        console.log('A quantidade total de itens é: ',await qtdTotalItems());
        break;
      case '9':
        console.log('A quantidade total de produtos únicos é: ', await qtdTotalProdutos());
        break;
      case '0':
        rl.close();
        return;
      default:
        console.log("Opção inválida!");
    }
  }
}

main();