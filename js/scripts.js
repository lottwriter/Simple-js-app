/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
var pokemonRepository = (function () {
  const repository = []
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20'
  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      repository.push(pokemon)
    } else {
      console.log('add an object')
    }
  }
  function getAll () {
    return repository
  }
  function addListItem (pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      const $row = $('.row')

      const $card = $('<div class="card" style="width:400px"></div>')
      const $image = $(
        '<img class="card-img-top" alt="Card image" style="width:20%" />'
      )
      $image.attr('src', pokemon.imageUrlFront)
      const $cardBody = $('<div class="card-body"></div>')
      const $cardTitle = $("<h4 class='card-title' >" + pokemon.name + '</h4>')
      const $seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      )

      $row.append($card)
      // Append the image to each card
      $card.append($image)
      $card.append($cardBody)
      $cardBody.append($cardTitle)
      $cardBody.append($seeProfile)

      $seeProfile.on('click', function (event) {
        showDetails(pokemon)
      })
    })
  }
  function showDetails (item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item)
      showModal(item)
    })
  }
  function loadList () {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url
          }
          add(pokemon)
          console.log(pokemon)
        })
      })
      .catch(function (e) {
        console.error(e)
      })
  }

  function loadDetails (item) {
    const url = item.detailsUrl
    return $.ajax(url)
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default
        item.imageUrlBack = details.sprites.back_default
        item.height = details.height
        // loop for each ofthe pokemon types.
        // Also changing the background color depend on each pokemon type.
        item.types = []
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name)
        }
        // item.types = [];
        // details.types.forEach(function (i) {
        //   item.types.push(i.type.name);
        // });
        if (item.types.includes('grass')) {
          $('.modal-header').css('color', 'green')
          // $listItem.css("color", "lightgreen");
          // $(this).css('color', 'red');
        } else if (item.types.includes('fire')) {
          $('.modal-header').css('color', 'red')
        } else if (item.types.includes('psychic')) {
          $('.modal-header').css('color', '#FF69B4')
        } else if (item.types.includes('poison')) {
          $('.modal-header').css('color', 'purple')
        } else if (item.types.includes('water')) {
          $('.modal-header').css('color', 'blue')
        } else if (item.types.includes('bug')) {
          $('.modal-header').css('color', '#3f000f')
        } else if (item.types.includes('rock')) {
          $('.modal-header').css('color', '#BC8F8F')
        } else if (item.types.includes('flying')) {
          $('.modal-header').css('color', '#2F4F4F')
        } else if (item.types.includes('electric')) {
          $('.modal-header').css('color', 'gold')
        } else if (item.types.includes('ice')) {
          $('.modal-header').css('color', '#4169E1')
        } else if (item.types.includes('ghost')) {
          $('.modal-header').css('color', '#8B008B')
        } else if (item.types.includes('ground')) {
          $('.modal-header').css('color', '#D2B48C')
        } else if (item.types.includes('fairy')) {
          $('.modal-header').css('color', '#EE82EE')
        } else if (item.types.includes('steel')) {
          $('.modal-header').css('color', '#708090')
        }
        // loop to get the abilities of a selected pokemon
        item.abilities = []
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name)
        }

        item.weight = details.weight
      })
      .catch(function (e) {
        console.error(e)
      })
  }
  // show the modal content
  function showModal (item) {
    const modalBody = $('.modal-body')
    const modalTitle = $('.modal-title')
    const modalHeader = $('.modal-header')
    // let $modalContainer = $("#modal-container");
    // clear existing content of the model
    // modalHeader.empty();
    modalTitle.empty()
    modalBody.empty()

    // creating element for name in modal content
    const nameElement = $('<h1>' + item.name + '</h1>')
    // // creating img in modal content
    const imageElementFront = $('<img class="modal-img" style="width:50%">')
    imageElementFront.attr('src', item.imageUrlFront)
    const imageElementBack = $('<img class="modal-img" style="width:50%">')
    imageElementBack.attr('src', item.imageUrlBack)
    // //creating element for height in modal content
    const heightElement = $('<p>' + 'height : ' + item.height + '</p>')
    // //creating element for weight in modal content
    const weightElement = $('<p>' + 'weight : ' + item.weight + '</p>')
    // //creating element for type in modal content
    const typesElement = $('<p>' + 'types : ' + item.types + '</p>')
    // //creating element for abilities in modal content
    const abilitiesElement = $('<p>' + 'abilities : ' + item.abilities + '</p>')

    modalTitle.append(nameElement)
    modalBody.append(imageElementFront)
    modalBody.append(imageElementBack)
    modalBody.append(heightElement)
    modalBody.append(weightElement)
    modalBody.append(typesElement)
    modalBody.append(abilitiesElement)
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showModal
    // hideModal: hideModal
  }
})()
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  })
})
