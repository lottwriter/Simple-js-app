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
    },
    addListItem: function(pokemon){
        
            //document.write(`${pokemon.name} (height: ${pokemon.height}) `); //Adds pokemon names and height to the DOM in the form of text
            // if (pokemon.height > 5) {
            //     document.write(" - Tall fella. ")
            // }
            const self = this;
            let pokeList = document.querySelector('ul');
            let listItem = document.createElement('li');
            let button = document.createElement('button')
            button.innerText = `${pokemon.name}`
            button.classList.add('pokeButton')
            listItem.appendChild(button);
            pokeList.appendChild(listItem);
            button.addEventListener('click', function() {
                self.showDetails(pokemon);
            });

    },
    showDetails: function(pokemon){
        console.log(pokemon);
    }
}

})();

//return pokemonRepository.getAll()
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
})
