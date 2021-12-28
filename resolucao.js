//funcao para leitura do json
const readJSON = () => require('./broken-database.json');

//Funcao para recuperar o nome verdadeiro
const recoverName = () => {

    brokenDB = readJSON();
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
}

//Funcao que recupera os precos transformando as string em numbers
const recoverPrice = () => {
    
    brokenDB = readJSON();
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
}

//Funcao que cria os objetos que serao salvos na saida
const createObjects = () => {

    brokenDB = readJSON();
    //chama as funcoes que corrige o nome e preco
    recoverName();
    recoverPrice();

    //copia para alterar no vetor final apenas
    finalObj = brokenDB;

    //percorre todos os objetos
    for (const index in finalObj) {

        //altera o nome para o corrigido ja que eles sempre estao no mesmo index
        finalObj[index].name = nameFormated[index];

        //altera o preco para o corrigido
        finalObj[index].price = priceFormated[index];

        //verifica se o objeto tem o atributo quantity
        if(!finalObj[index].quantity){

            //se nao tiver e colocado como 0 a quantidade
            finalObj[index].quantity = 0;          
        }
    }
    
    //console.log(brokenDB);
    saveJSON(finalObj);
}

//funcao que cira o arquivo saida.json
const saveJSON = (data) => {

    /*
        Para criar essa funcao utilizei como base a funcao apresentada
         no canal charscript no seguinte video:
         https://youtu.be/T7s3st6xfpA
    */

    const fs = require('fs');

    //funcao chamada em caso de erro na hora de escrever o arquivo
    const finished = (error) => {
        if( error ){
            console.error(error);
            return;
        }
    }

    //transforma o array recebido em tipo json
    const JSONData = JSON.stringify(data, null, 2);

    //escreve no arquivo saida.json
    fs.writeFile('saida.json', JSONData, finished);
}

readJSON();
createObjects();