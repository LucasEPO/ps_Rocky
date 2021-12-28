//funcao para leitura do json
const readJSON = file => require(file);

//Funcao para recuperar o nome verdadeiro
const recoverName = () => {

    brokenDB = readJSON('./broken-database.json');
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
    
    brokenDB = readJSON('./broken-database.json');
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

    brokenDB = readJSON('./broken-database.json');
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

//Funcao que imprime a lista corrigida ordenada por categoria e id
const validateList = () => {

    //le o arquivo gerado
    db = readJSON('./saida.json');

    db.sort(function(a,b) {
        
        //organiza por categoria
        if(a.category < b.category){
            return -1;
        } else if (a.category > b.category){
            return 1;
        }

        //chega apenas quando estiver na mesma categoria
        //organiza crescentemente por id
        if(a.id < b.id){
            return -1;
        } else {
            return 1;
        }
    });
    
    //imprime apenas o nome
    console.log(db.map(obj => obj.name));
}

//Funcao que calcula a quantidade de tudo de uma categoria
const quantityPerCategory = () => {

    //le o arquivo gerado
    db = readJSON('./saida.json');

    //cria set para evitar repeticoes
    const setCategory = new Set;

    //passa por todos os objetos adicionando a categoria no set
    //por ser set nao preciso me preucupar com repeticoes
    db.forEach(obj => {
        setCategory.add(obj.category);
    });
    
    //percorre todas as categorias
    setCategory.forEach(category =>{

        //cria um vetor filtrado por categoria
        filteredDB = db.filter(obj => obj.category === category);

        //aplica a funcao reduce somando as quantidades dos objetos do vetor filtrado
        quantity = filteredDB.map(obj => obj.quantity).reduce(function(total, add){
            return total+add;
        });

        console.log(`Estoque de ${category} = ${quantity}`);
    });
}

/* 
    as funcoes validatelist e quantityPerCategory so podem
     ser chamadas depois do arquivo saida estar pronto
*/
createObjects(validateList(), quantityPerCategory());
