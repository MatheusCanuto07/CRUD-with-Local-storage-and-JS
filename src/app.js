// Carrega dados padrões para exemplificação
function carregaDados() {
  objDados = {
      contatos:
          [
              { id: 1000, nome: "Alessandra Bicalho Pereira", telefone: "31999784358", cidade: "Nova Iorque" },
              { id: 1001, nome: "Douglas Faria", telefone: "31987955587", cidade: "Contagem" },
              { id: 1002, nome: "Kelly Batista", telefone: "31987951234", cidade: "Belo-Horizonte" },
              { id: 1003, nome: "Leandra Rezende", telefone: "31978955468", cidade: "São Paulo" }
          ]
  }

  localStorage.setItem('crudCanuto', JSON.stringify(objDados));
  imprimeDados(objDados);
}
// Lê o que está no local storage
function leDados() {
  //Armazena em uma variavel os itens presentes no local storage do navegador com a chave crudCanuto
  let strDados = localStorage.getItem('crudCanuto');

  //Cria o objeto que vai receber dados
  var objDados = {};

  //Converte o que foi recebido para json
  objDados = JSON.parse(strDados);

  //Retorna esse objeto
  return objDados;
}
// Manda dados para o local storage
function salvaDados(dados) {
  //Parametro 1 - chave do local storage
  //Parametro 2 - Dados no formato JSON para serem armazenados no banco
  localStorage.setItem('crudCanuto', JSON.stringify(dados));
}
// Pega os dados dos inputs e os envia para o local storage
function incluirContato() {
  //Armazena em uma variavel os itens presentes no local storage do navegador com a chave crudCanuto
  let objDados = leDados();
  

  //Lógica para a criação de um id único. Verifica se existe o id dentro do local storage, caso ele não exista a variavel passa a valer 0
  var lastId = (objDados.contatos.length > 0) ? objDados.contatos[objDados.contatos.length - 1].id || 0 : 0;

  console.log(lastId)
  var id = (lastId == 0) ? 1000 : lastId + 1;

  let campoNome = document.getElementById('campoNome').value;
  let campoTelefone = document.getElementById('campoTelefone').value;
  let campoCidade = document.getElementById('campoCidade').value;
  console.log(id);

  let novoContato = {
      id: id,
      nome: campoNome,
      telefone: campoTelefone,
      cidade: campoCidade
  };

  objDados.contatos.push(novoContato);

  // Salvar os dados no localStorage novamente
  salvaDados(objDados);

  // Atualiza os dados da tela
  imprimeDados(objDados);
}
// Função que remove todos os dados do local storage
function limpaDados() {
  objDados = {
      contatos:
          [

          ]
  }

  //Node.firstChild é uma propriedade do tipo somente leitura que retorna o node (nó) do primeiro elemento filho de uma árvore DOM ou null no caso do elemento não ter filhos (children).
  //Essa parte do código se tornou redundante, uma vez que era para atualizar os dados da tela. Troquei a função que tira os filhos pela função que imprime os dados
  // var elemento = document.getElementById("tabela");
  // while (tabela.firstChild) {
  //     tabela.removeChild(tabela.firstChild);
  // }
  salvaDados(objDados);
  imprimeDados();
}

function imprimeDados() {
  let objDados = leDados();
  let tabela = document.getElementById('tabela');
  let strHtml = '';
  let botao = "botao";
  //<th scope="row">${objDados.contatos[i].id}</th>
  for (i = 0; i < objDados.contatos.length; i++) {
      strHtml += `
      <tr id="${"linha" + objDados.contatos[i].id}" class="">
      <th scope="row">${objDados.contatos[i].id}</th>
          <td>${objDados.contatos[i].nome}</td>
          <td>${objDados.contatos[i].telefone}</td>
          <td>${objDados.contatos[i].cidade}</td>
          <!-- <td><button class="btn btn-warning" id="${objDados.contatos[i].id}" onclick="editaDados(${objDados.contatos[i].id})">Editar</button></td> -->
          <td><button class="btn btn-danger" id="${objDados.contatos[i].id}" onclick="removeDados(${objDados.contatos[i].id})">Apagar</button></td>
      </tr>
    `
      //console.log(i)
  }
  tabela.innerHTML = strHtml;
}

function removeDados(id) {
  let dados = JSON.parse(localStorage.getItem('crudCanuto')) ?? [];
  //console.log(dados);

  // Essa função filtra os dados para remover o contato com o ID fornecido
  function removerContatoPorId(id) {
      //Pega esse array de dados e aplica a função filter que vai retirar do array o registro que tiver determinado id
      dados.contatos = dados.contatos.filter(function (contato) {
          return contato.id !== id;
      });
  }

  removerContatoPorId(id);
  salvaDados(dados);
  imprimeDados(dados);
}
//Em processo de implementação
function editaDados(id) {
  let objDados = JSON.parse(localStorage.getItem('crudCanuto')) ?? [];
  let objEspecifico = [];
  console.log(id)

  objEspecifico.contatos = objDados.contatos.filter(function(aux){
      return aux.id == id;
  })
  console.log(objEspecifico.contatos)

  let inputId = document.getElementById('campoId');
  let inputNome = document.getElementById('campoNome');
  let inputTelefone = document.getElementById('campoTelefone');
  let inputCidade = document.getElementById('campoCidade');

  inputId.value = id
  inputNome.value = objEspecifico.contatos[0].nome
  inputTelefone.value = objEspecifico.contatos[0].telefone
  inputCidade.value = objEspecifico.contatos[0].cidade

}

// Configura os botões
document.getElementById('btnCarregaDados').addEventListener('click', carregaDados);
document.getElementById('btnIncluirContato').addEventListener('click', incluirContato);
document.getElementById('btnLimpaDados').addEventListener('click', limpaDados);
document.getElementById('btnAtualizarContato').addEventListener('click', editaDados);

// Crie uma função que lê os dados