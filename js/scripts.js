let pokemonRepository = (function(){
    let pokemonList = [
        {name: 'Hitmonchan', height: 7, types: ['fighting']},
        {name: 'Emolga', height: 3, types: ['electric', 'flying']}, 
        {name: 'Lucario', height: 7, types: ['fighting', 'steel']}
    ];


return {
    add: function(pokemon) {
        pokemonList.push(pokemon);
    },
    getAll: function() {
        return pokemonList;
    }
}

})();
//return pokemonRepository.getAll()

pokemonRepository.getAll().forEach(function(pokemon){
    document.write(`${pokemon.name} (height: ${pokemon.height}) `); //Adds pokemon names and height to the DOM in the form of text
    if (pokemon.height > 5) {
        document.write(" - Tall fella. ")
    }
})