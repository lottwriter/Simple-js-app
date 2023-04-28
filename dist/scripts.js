/*eslint-disable*/
var pokemonRepository=function(){let e=[];function t(t){"object"==typeof t&&"name"in t&&"detailsUrl"in t?e.push(t):console.log("add an object")}function o(){return e}function a(e){let t=$(".modal-body"),o=$(".modal-title");$(".modal-header"),o.empty(),t.empty();let a=$("<h1>"+e.name+"</h1>"),s=$('<img class="modal-img" style="width:50%">');s.attr("src",e.imageUrlFront);let l=$('<img class="modal-img" style="width:50%">');l.attr("src",e.imageUrlBack);let i=$("<p>height : "+e.height+"</p>"),n=$("<p>weight : "+e.weight+"</p>"),d=$("<p>types : "+e.types+"</p>"),r=$("<p>abilities : "+e.abilities+"</p>");o.append(a),t.append(s),t.append(l),t.append(i),t.append(n),t.append(d),t.append(r)}return{add:t,getAll:o,addListItem:function e(t){pokemonRepository.loadDetails(t).then(function(){let e=$(".row"),o=$('<div class="card" style="width:400px"></div>'),s=$('<img class="card-img-top" alt="Card image" style="width:20%" />');s.attr("src",t.imageUrlFront);let l=$('<div class="card-body"></div>'),i=$("<h4 class='card-title' >"+t.name+"</h4>"),n=$('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>');e.append(o),o.append(s),o.append(l),l.append(i),l.append(n),n.on("click",function(e){(function e(t){pokemonRepository.loadDetails(t).then(function(){console.log(t),a(t)})})(t)})})},loadList:function e(){return $.ajax("https://pokeapi.co/api/v2/pokemon/?limit=20").then(function(e){e.results.forEach(function(e){let o={name:e.name,detailsUrl:e.url};t(o),console.log(o)})}).catch(function(e){console.error(e)})},loadDetails:function e(t){let o=t.detailsUrl;return $.ajax(o).then(function(e){t.imageUrlFront=e.sprites.front_default,t.imageUrlBack=e.sprites.back_default,t.height=e.height,t.types=[];for(var o=0;o<e.types.length;o++)t.types.push(e.types[o].type.name);t.types.includes("grass")?$(".modal-header").css("color","green"):t.types.includes("fire")?$(".modal-header").css("color","red"):t.types.includes("psychic")?$(".modal-header").css("color","#FF69B4"):t.types.includes("poison")?$(".modal-header").css("color","purple"):t.types.includes("water")?$(".modal-header").css("color","blue"):t.types.includes("bug")?$(".modal-header").css("color","#3f000f"):t.types.includes("rock")?$(".modal-header").css("color","#BC8F8F"):t.types.includes("flying")?$(".modal-header").css("color","#2F4F4F"):t.types.includes("electric")?$(".modal-header").css("color","gold"):t.types.includes("ice")?$(".modal-header").css("color","#4169E1"):t.types.includes("ghost")?$(".modal-header").css("color","#8B008B"):t.types.includes("ground")?$(".modal-header").css("color","#D2B48C"):t.types.includes("fairy")?$(".modal-header").css("color","#EE82EE"):t.types.includes("steel")&&$(".modal-header").css("color","#708090"),t.abilities=[];for(var o=0;o<e.abilities.length;o++)t.abilities.push(e.abilities[o].ability.name);t.weight=e.weight}).catch(function(e){console.error(e)})},showModal:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});