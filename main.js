const form = document.getElementById('form-agenda');
const pessoas = [];
const numCelular = []; 
let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaContato();
    atualizaTabela();
});

function adicionaContato() {
    const inputNomeContato = document.getElementById('nome-contato');
    const inputNumeroContato = document.getElementById('numero-contato');
    const tipoDeContato = inputNumeroContato.value.replace(/\D/g, '');
    const tipoCelular = /^(\d{2})?9\d{8}$/.test(tipoDeContato);
    const tipoTelefone = /^(\d{2})?[2-8]\d{7}$/.test(tipoDeContato);

    if (numCelular.includes(tipoDeContato)) {
        alert(`O número "${inputNumeroContato.value}" já foi atribuído.`);
        inputNomeContato.value = '';
        inputNumeroContato.value = '';
        return;
    }

    pessoas.push(inputNomeContato.value);
    numCelular.push(tipoDeContato);

    let linha = '<tr>';
    linha += `<td>${inputNomeContato.value}</td>`;
    linha += `<td>${inputNumeroContato.value}</td>`;
    linha += `<td>${tipoCelular ? "Celular" : tipoTelefone ? "Telefone" : ''}</td>`;
    linha += `<td><button class="btn-deletar" data-numero="${tipoDeContato}">Deletar</button></td>`;
    linha += '</tr>';
    
    linhas += linha;
    inputNomeContato.value = '';
    inputNumeroContato.value = '';
}

function deletarContato(numero) {
    const index = numCelular.indexOf(numero);
    if (index !== -1) {
        pessoas.splice(index, 1);
        numCelular.splice(index, 1);
        
        linhas = '';
        pessoas.forEach((nome, i) => {
            const numeroFormatado = numCelular[i];
            const tipoCelular = /^(\d{2})?9\d{8}$/.test(numeroFormatado);
            const tipoTelefone = /^(\d{2})?[2-8]\d{7}$/.test(numeroFormatado);
            
            let linha = '<tr>';
            linha += `<td>${nome}</td>`;
            linha += `<td>${numeroFormatado}</td>`;
            linha += `<td>${tipoCelular ? "Celular" : tipoTelefone ? "Telefone" : ''}</td>`;
            linha += `<td><button class="btn-deletar" data-numero="${numeroFormatado}">Deletar</button></td>`;
            linha += '</tr>';
            
            linhas += linha;
        });
        
        atualizaTabela();
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-deletar')) {
        const numero = e.target.getAttribute('data-numero');
        deletarContato(numero);
    }
});