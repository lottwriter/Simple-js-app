let pokemonList = [
    {name: 'Hitmonchan', height: 7, types: ['fighting']},
    {name: 'Emolga', height: 3, types: ['electric', 'flying']}, 
    {name: 'Lucario', height: 7, types: ['fighting', 'steel']}
];
for (let i = 0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `); //Adds pokemon names and height to the DOM in the form of text
    if (pokemonList[i].height > 5) {
        document.write(" - Tall fella. ")
    }
}
