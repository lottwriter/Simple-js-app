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

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');
      
      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
    
      let contentElement = document.createElement('p');
      contentElement.innerText = `${pokemon.name} is ${pokemon.height} units tall.`;

      let modalImg = document.createElement('img');
      modalImg.src=`${pokemon.imageUrl}`;

      
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(modalImg);
      modalContainer.appendChild(modal);
      
      modalContainer.classList.add('is-visible');}
      
      )
      }
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      })
      window.addEventListener('keydown', (e) => {
        
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
        ;
      });
      
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