
var  message =null;

window.onload = function() {

    message =document.querySelector("#message");

    setTimeout(() => {
        message.style.display = "none";
    }, 5000);
}


// associa click ao botão close da messsge
$(document).on('click', '#close', function() {
    console.log('script.close');

    message.style.display = "none";

});


// associa click ao container do pokemon (detalhes)
$(document).on('click', '.card', function() {
    console.log('script.click');

    // recupera o numero do pokemon
    let divContainer = this;
    let idPokemom = divContainer.getAttribute('data-id');
    let postData =null;

    //console.log('idPokemom:', idPokemom);
    
    // GET - dados do pokemon
    $.ajax({
        url: '/detalhes/'+idPokemom,
        method: "get",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(postData),
        success: successDetalhes,
        error: errorDetalhes
    });

});


// associa click ao menu CADASTRAR
$(document).on('click', '#menu-cadastrar', function(event) {
    console.log('script.cadastrar');

    event.preventDefault();
        
    let postData =null;
    // POST com dados do pokemon
    $.ajax({
        url: '/cadastrar/render',
        method: "get",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(postData),
        success: successCadastrar,
        error: errorCadastrar
    });

});

/*
// associa click ao botão adicionar
$(document).on('click', '', function(event) {
    console.log('script.new');

    event.preventDefault();
        
    let nome =document.querySelector('#nome').value;
    let numero =document.querySelector('#numero').value;
    let tipo =document.querySelector('#tipo').value;
    let imagem =document.querySelector('#imagem').value;
    let descricao =document.querySelector('#descricao').value;
    let altura =document.querySelector('#altura').value;
    let peso =document.querySelector('#peso').value;
    let categoria =document.querySelector('#categoria').value;
    let habilidade =document.querySelector('#habilidade').value;

    let postData ={'nome': nome, 'numero': numero, 'tipo': tipo, 'imagem': imagem, 'descricao': descricao, 
            'altura': altura, 'peso': peso, 'categoria': categoria, 'habilidade': habilidade };
    // POST com dados do pokemon
    $.ajax({
        url: '/cadastrar/new',
        method: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(postData),
        success: successCadastrar,
        error: errorCadastrar
    });

});
    */

// evento de sucesso da resposta DETALHES
function successDetalhes(result) {
    console.log('script.successDetalhes');

    /*
    // torna o container 'content' invisible
    document.querySelector('#content').style.display = 'none';
    document.querySelector('#cadastrar').style.display = 'none';
    // torna o container 'detalhes' visible
    let detalhes = document.querySelector('#detalhes');
    detalhes.innerHTML = result;
    detalhes.style.display = 'flex';
    */

    // exibe o resultado
    let content = $('#content');
    content.css('display','none');
    content.removeClass('main');
    content.addClass('details');
    content.html( result );
    content.css('display','flex');
}

// evento de erro da resposta DETALHES
function errorDetalhes(result) {
    console.log('script.errorDetalhes');
    
}


// evento de sucesso da resposta de CADASTRAR
function successCadastrar(result) {
    console.log('script.successCadastrar');

    //console.log('result : ', result);

    // exibe o resultado
    let content = $('#content');
    content.css('display','none');
    content.removeClass('main');
    content.addClass('add');
    content.html( result );
    content.css('display','block');

}

// evento de erro da resposta CADASTRAR
function errorCadastrar(err) {
    console.log('script.errorCadastrar');
    
}