
// constantes e variaveis do app
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

var pokedex = [];
var message = "";



// app functions

// procura o pokemon no array
function findPokemon(index) {

    let result =null;
    if(index > pokedex.length-1) {
        return result;
    };
    return pokedex[index];
}

// adiciona pokemons no array
function adicionaPokemon(pokemon) {

    pokedex.push( pokemon );
    pokemon.id =pokedex.length-1;

}

// carrega os pokemons no array
function loadPokedex() {

    // verificação para não duplicar items e manter (RAM) algum item adicionado pelo usuário.
    if( pokedex.length > 0 ) {
        return;
    };

    adicionaPokemon( { 'nome': 'Bulbasaur',
                    'numero': 1,
                    'tipo': 'poison',
                    'imagem': '/img/001.png',
                    'descricao':'Há uma semente de planta em suas costas desde o dia que nasceu' } );
    
    adicionaPokemon( { 'nome': 'Charmander',
                    'numero': 4,
                    'tipo': 'fire',
                    'imagem': '/img/004.png',
                    'descricao':'Tem preferência por coisas quentes.' } );

    adicionaPokemon( { 'nome': 'Charizzard',
                    'numero': 6,
                    'tipo': 'fly',
                    'imagem': '/img/006.png',
                    'descricao':'Ele cospe fogo que é quente o suficiente para derreter pedregulhos. Pode causar incêndios florestais soprando chamas.' } );

}

// app configuration
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));



// GET - render principal
app.get("/", function (req, res) {

    loadPokedex();

    setTimeout(() => {
        message = "";
      }, 1000)

    res.render("index", { 'pokedex': pokedex, 'title':'Pokedéx', 'message': message } );
});

// GET - cadastramento
app.get("/cadastrar", function (req, res) {
    console.log(req.method + '  ' + req.url);

    res.redirect("/");
});

// GET - render cadastramento
app.get("/cadastrar/render", function (req, res) {
    res.render("cadastrar");
});

// POST - adicionar (new)
app.post("/cadastrar/new", function (req, res) {
    
    let pokeData =req.body;

    // adiciona dados do pokemon no array
    adicionaPokemon( pokeData );

    // pokemon adicionado com sucesso
    message = `Sucesso!. O pokemon ${pokeData.nome} foi adicionado à lista`;
        
    // exibe tela com novo pokemon
    res.redirect("/");

});

// GET - detalhes
app.get("/detalhes", function (req, res) {
    console.log(req.method + '  ' + req.url);

    res.redirect("/");
});

// GET - detalhes do pokemon
app.get("/detalhes/:id", function (req, res) {

    let id =req.params.id;

    // localizar pokemon
    let pokemon = findPokemon(id);

    if( ! pokemon ) {
        pokemon = {};
        pokemon.nome = '';
        pokemon.numero =0;
        pokemon.descricao ='Este pokemon não existe. :(';
    }
    res.render("detalhes", {'pokemon': pokemon} );
});

// servidor
app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});