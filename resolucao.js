const brokenDB = require('./broken-database.json');

//Funcao para recuperar o nome verdadeiro
const recoverName = () => {

    //cria um array apenas com os nomes
    names = brokenDB.map(obj => obj.name);
    
    //array de retorno com nomes formatados
    nameFormated = [];

    //percorre todos os nomes
    names.forEach(name => {

        //procura e substitui os caracteres solicitados
        name = name.replace(/ø/g, "o");
        name = name.replace(/æ/g, "a");
        name = name.replace(/¢/g, "c");
        name = name.replace(/ß/g, "b");
        name = name.replace(/&/g, "e"); 

        //adiciona no array final
        nameFormated.push(name);
    });

    //console.log(nameFormated);

    return nameFormated;
}

recoverName();
console.log(brokenDB);