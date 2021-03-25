// Variáveis 
var convidados = JSON.parse(localStorage.getItem("convidados")) || [];
var li;
var ulMasculino;
var ulFeminino;
var elCadastro;
var elExcluir;

// Lista
var elLista = document.getElementById("lista"); 

// Input Text - ID
var elNome = document.getElementById("nome"); 
var elIdade = document.getElementById("idade");
var elCpf = document.getElementById("cpf");

// Form Radio - Name
var elGenero = document.getElementsByName("genero");
var elVip = document.getElementsByName("vip");

// Botão - ID
var elBotao = document.getElementById("botao");
const btnCadastrar = document.getElementById("btnModal"); // Botão para cadastrar os convidados

btnCadastrar.addEventListener('click', () => iniciaModal('modalCadastro')); // Evento para abrir o modal de cadastro

// Group By
Array.prototype.groupBy = function(prop) {
    var value = this.reduce(function(total, item) { 
    var key = item[prop];
        total[key] = (total[key] || []).concat(item);

        return total;
    }, {});
        return value;
};

// Função para abrir e  fehcar o modal
function iniciaModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        // Abre o modal
        modal.classList.add('mostrar');
        // Evento para fechar o modal caso o cliente aperto no "X" ou clique para fora do modal
        modal.addEventListener ('click', (e) => {
            if(e.target.id == modalId || e.target.className == 'janelaCadastroBtnFechar' || e.target.id == 'btnFechar' || e.target.id == 'botao') {
                modal.classList.remove('mostrar'); // Fecha o modal
                limparInput(); // Limpa os valores inseridos nos campos de cadastro
            }
        });
    }
}

// Função para aparecer o sweetalert de "Cadastro Concluido"
function cadastroConcluido() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Cadastro concluido com sucesso'
    })
}

// Função para aparecer o sweetalert de "Cadastro não Concluido"
function cadastroErro() {
   const Toast = Swal.mixin({
       toast: true,
       position: 'top-end',
       showConfirmButton: false,
       timer: 7000,
       timerProgressBar: true,
       didOpen: (toast) => {
           toast.addEventListener('mouseenter', Swal.stopTimer)
           toast.addEventListener('mouseleave', Swal.resumeTimer)
       }
   })

   Toast.fire({
       icon: 'error',
       title: 'Cadastro não concluido com sucesso!',
   })
}

// Função para informar qual campo não foi preenchido no formulario de cadastro
function campoVazio(campo) {
     alert("Campo " + campo + " vazio");      
}

// Função para limpar os campos do formulario de cadastro
limparInput = function(){
    elNome.value = ""; // Limpa o input, apos cadastrar
    elIdade.value = ""; // Limpa o input, apos cadastrar
    elCpf.value = ""; // Limpa o input, apos cadastrar
    elVip.value = ""; // Limpa o input, apos cadastrar

    // Limpa o campo genero
    for (var i = 0; i < elGenero.length; i++) {
       if (elGenero[i].checked) {
            elGenero[i].checked = false; // Desmarca a opção escolhida
       }
   }
   
   // Limpa o campo vip
   for (var i = 0; i < elVip.length; i++) {
       if (elVip[i].checked) {
            elVip[i].checked = false; // Desmarca a opção escolhida
       }
   };

}

// Adiciona a função de adicionar um convidado para o botão
elBotao.onclick = function (){

    // Verifica se o campo nome está vazio
    if (!elNome.value) {
        campoVazio("Nome"); // Informa que o campo nome está vazio
        cadastroErro(); // Informa o erro para o cliente com o sweetalert

    }else{
        var nomeConvidado = elNome.value; // Puxa o nome informado no input
    }

    // Verifica se o campo nome está vazio
    if (!elIdade.value) {
        campoVazio("Idade"); // Informa que o campo idade está vazio
        cadastroErro(); // Informa o erro para o cliente com o sweetalert
    
    }else{
        var idadeConvidado = elIdade.value; // Puxa a idade informada no input
    }

    // Verifica se o campo cpf está vazio
    if (!elCpf.value) {
        campoVazio("Cpf"); // Informa que o campo cpf está vazio
        cadastroErro(); // Informa o erro para o cliente com o sweetalert
    }else{
        var cpfConvidado = elCpf.value; // Puxa o cpf informado no input
    }         
    
    // Puxa o genero do convidado
    for (var i = 0; i < elGenero.length; i++) {
       if (elGenero[i].checked) {
            var generoConvidado = elGenero[i].value; // Puxa a informação informada
            elGenero[i].checked = false; // Desmarca a opção escolhida
       }
   };
   
    // Verifica se o campo genero está vazio
    if(generoConvidado == undefined){
        campoVazio("Genêro"); // Informa que o campo genero está vazio
    }
    
   // Puxa o genero do convidado
    for (var i = 0; i < elVip.length; i++) {
       if (elVip[i].checked) {
            var vipConvidado = elVip[i].value; // Puxa a informação informada
            elVip[i].checked = false; // Desmarca a opção escolhida
       }
    };
   
    // Verifica se o campo vip está vazio
    if(vipConvidado == undefined){
      campoVazio("Vip");
    }

    // Caso alguns dos campos estiverem vazios, limpa todos os campos, informa o erro no cadastro e interrompe a função
    if (!elNome.value || !elIdade.value || !elCpf.value || vipConvidado == undefined || generoConvidado == undefined) {
        limparInput(); // Limpa os campos
        cadastroErro(); // Informa o erro para o usuario
        return false; // Interrompe a função
    }

    // Insere o convidado cadastrado no array 
    convidados.push({ nome: nomeConvidado, idade: idadeConvidado, cpf: cpfConvidado, genero: generoConvidado, vip: vipConvidado}); // Adiciona o convidado novo
   
    limparInput(); // Lmpa os campos após o cadastro
    salvarConvidados(); // Armazena no local storage
    listarConvidados(); // Atualiza os nomes da lista
    cadastroConcluido(); // Informa que o cadastro foi concluido com sucesso
    modal.classList.remove('mostrar'); // Fecha o modal
};

// Função para salvar o conviado no local storage
function salvarConvidados() {
    localStorage.setItem("convidados", JSON.stringify(convidados)); // Salva o convidado no local storage do navegador, simulando um banco de dados
};

// Função para criar a linha aonde será inserido as informações do convidado cadastrado
createItemEl = function (itemValue, tipo) {
    li.setAttribute("id", "infoConvidado"); // Atribui um id para a linha criada
    var span = document.createElement('span'); // Cria um elemento "Span"
    // span = document.createTextNode(tipo + ": " + itemValue + " ") // Insere os dados do convidado no span
    
    if (tipo == "Idade"){ // Caso seja idade, adicione o texto "anos"
        span = document.createTextNode(" " + tipo + ": "+ itemValue +" anos" + " ---") // Insere os dados do convidado no span
    } if(tipo == "Vip"){ // Caso seja vip tire os "---"
        span = document.createTextNode(" " + tipo + ": "+ itemValue) // Insere os dados do convidado no span
    }else{ // Caso não seja nenhum dos dois, adicione a informação normalmente
        span = document.createTextNode(" " + tipo + ": "+ itemValue + " ---") // Insere os dados do convidado no span
    }
  
    li.appendChild(span); // Insere o conteudo do span, para a linha criada
    return li; // Retorna a linha com o conteudo do convidado inserido 
}

// Função para verificar se já existe a ul dos convidados homens
verificarUlMasculino = function(){
    verificaUlMasculino = elLista.querySelector('#convidadoMasculino'); // Verifica se existe a ul dos convidados homens
    if (verificaUlMasculino == null){ // Caso não exista a ul dos convidados homens
           ulMasculino = document.createElement('ul'); // Cria um elemento 'ul'
           ulMasculino.setAttribute('id','convidadoMasculino'); // Atribui um id para a ul dos convidados homens
           var h3 = document.createElement('h3'); // Cria um elemnto 'h3'
           h3.innerHTML= "<h3> Homens: </h3>"; // Insere um codigo html para um subtitulo
           ulMasculino.appendChild(h3); // Insere o conteudo do subtitulo para a ul dos convidados homens
           elLista.appendChild(ulMasculino); // Insere o conteudo da ul para a lista principal
       }
}

// Função para verificar se já existe a ul das convidados mulheres
verificarUlFeminino = function() {
    verificaUlFeminino = elLista.querySelector('#convidadoFeminino'); // Verifica se existe a ul das convidados mulheres
    if (verificaUlFeminino == null){ // Caso não exista a ul das convidados mulheres
        ulFeminino = document.createElement('ul'); // Cria um elemento 'ul'
        ulFeminino.setAttribute('id','convidadoFeminino'); // Atribui um id para a ul das convidados mulheres
        var h3 = document.createElement('h3'); // Cria um elemnto 'h3'
        h3.innerHTML= "<h3> Mulheres: </h3>"; // Insere um codigo html para um subtitulo
        ulFeminino.appendChild(h3); // Insere o conteudo do subtitulo para a ul das convidados mulheres
        elLista.appendChild(ulFeminino); // Insere o conteudo da ul para a lista principal
    }
}

// Função para mostrar na tela as informações dos convidados
function listarConvidados() {  
  
    elLista.innerHTML = ""; // Limpa todos os convidados da lista
    
    // Insere todos os convidados do array "convidados" para a variavel "convidado"
    for (const convidado of convidados) {
        
        // Criando o html, para inserir os convidados no html
        
        li = document.createElement('li'); // Cria a linha
  
        var elNome = createItemEl( convidado.nome, "Nome"); // Insere o nome do convidado 
        var elIdade = createItemEl(convidado.idade, "Idade"); // Insere a idade do convidado 
        var elCpf = createItemEl(convidado.cpf, "Cpf"); // Insere o cpf do convidado 
        var elGenero = createItemEl( convidado.genero, "Genero"); // Insere o genero do convidado 
        var elVip = createItemEl(convidado.vip, "Vip"); // Insere o status do convidado 

        var btnExcluir = document.createElement('button'); // Cria um botão
        btnExcluir.setAttribute('id', 'btnExcluir'); // Atribui um id para o botão
        btnExcluir.innerHTML = '<i class="fa fa-trash"></i>'; // Insere um código html de um icone de lixo
             
        // Adiciona a função de excluir um convidado
        btnExcluir.onclick = function () {
            convidados = convidados.filter(function(item){
                // Retorna todos os convidados, menos o convidado excluido
                return item.nome !== convidado.nome;
            });
              
            salvarConvidados(); // Armazena no local storage
            listarConvidados(); // Lista novamente os convidados, menos o excluido
        };

        li.appendChild(btnExcluir); // Adiciona o texto para exlcusão do convidado

        // Confere se o convidao é homem
        if ( (convidado.genero == 'Masculino')  ){
            verificarUlMasculino(); // Chama a função para verifica se já existe uma ul dos convidados homens
            ulMasculino.appendChild(li); // Insere na ul os dados do convidado 
            elLista.appendChild(ulMasculino); // Insere na lista principal o convidado
            
            // Confere se o convidao é mulher
        } if (convidado.genero == 'Feminino') {
            verificarUlFeminino(); // Chama a função para verifica se já existe uma ul das convidadas
            ulFeminino.appendChild(li); // Insere na ul os dados da convidada 
            elLista.appendChild(ulFeminino);  // Insere na lista principal o convidado
        }
    };
};

listarConvidados(); // Lista os convidados já inseridos