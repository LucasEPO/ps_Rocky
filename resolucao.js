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

//Funcao que recupera os precos transformando as string em numbers
const recoverPrice = () => {
    
    //cria um array so com os precos
    prices = brokenDB.map(obj => obj.price);

    //array de retorno com todos os valores sendo numeros
    priceFormated = [];

    //percorre todos os precos
    prices.forEach(price => {

        //verifica se o valor nao e um numero
        if(isNaN){

            //se nao for entao converte para float
            price = parseFloat(price);
        }

        //adiciona no vetor final
        priceFormated.push(price);
    });
    
    //console.log(priceFormated);
    return priceFormated;
}

recoverName();
recoverPrice();
console.log(brokenDB);