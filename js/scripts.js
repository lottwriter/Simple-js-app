let pokemonRepository = (function(){
    let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon) {
    pokemonList.push(pokemon);
}

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }
return {
    add: add,
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
    
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
}

})();

//return pokemonRepository.getAll()
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
})

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });