// Botoes do Formulario

const pesquisar = document.querySelector("#btnPesquisar");
const limpar = document.querySelector("#btnLimpar");
const campoCEP = document.querySelector("#cep");

// Evento

pesquisar.addEventListener("click", event => {
    event.preventDefault();

    ajaxCEP() ;
});

campoCEP.addEventListener("blur", event => {
    event.preventDefault();

    ajaxCEP() ;
});

// Funcao Ajax

const options = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
}

function ajaxCEP() {
    const CEP = document.querySelector("#cep");
    const url = `https://viacep.com.br/ws/${CEP.value}/json/`;

    fetch(url, options).then(response => {
        return response.json();
    }).then(dados => {
        if(dados.erro) {
            CEP.classList.add("is-invalid")
            return;
        }
        if (CEP.classList.contains("is-invalid")) {
            CEP.classList.remove("is-invalid");
        }
        CEP.classList.add("is-valid")
        preenchimentoAutomatico(dados);
    }).catch(erro => {
        CEP.classList.add("is-invalid");
    });
}

// preenchimento dos campos

function preenchimentoAutomatico(dados) {
    const rua = document.querySelector("#rua");
    const complemento = document.querySelector("#complemento");
    const bairro = document.querySelector("#bairro");
    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");

    rua.value = dados.logradouro;
    complemento.value = dados.complemento;
    bairro.value = dados.bairro;
    cidade.value = dados.localidade;
    estado.value = dados.uf;
}