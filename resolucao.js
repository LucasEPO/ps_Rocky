//funcao para leitura do json
function readJSON(file) {

    //tenta pegar o arquivo se nao conseguir retorna null
    try{
       return require(file);  
    }catch(e) {
        console.error(e);
    }

    return null;
} 

//Funcao para recuperar o nome verdadeiro
function recoverName(brokenDB) {

    //cria um array apenas com os nomes
    const names = brokenDB.map(obj => obj.name);
    
    //array de retorno com nomes formatados
    const nameFormated = [];

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

    return nameFormated;
}

//Funcao que recupera os precos transformando as string em numbers
function recoverPrice(brokenDB){
    
    //cria um array so com os precos
    const prices = brokenDB.map(obj => obj.price);

    //array de retorno com todos os valores sendo numeros
    const priceFormated = [];

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
    
    return priceFormated;
}

//Funcao que cria os objetos que serao salvos na saida
function createObjects() {

    const brokenDB = readJSON('./broken-database.json');

    //verfica se achou o arquivo
    if(!brokenDB){
        return;
    }

    //chama as funcoes que corrige o nome e preco
    names = recoverName(brokenDB);
    prices = recoverPrice(brokenDB);

    //copia para alterar no vetor final apenas
    const finalObj = brokenDB;

    //percorre todos os objetos
    for (const index in finalObj) {

        //altera o nome para o corrigido ja que eles sempre estao no mesmo index
        finalObj[index].name = names[index];

        //altera o preco para o corrigido
        finalObj[index].price = prices[index];

        //verifica se o objeto tem o atributo quantity
        if(!finalObj[index].quantity){

            //se nao tiver e colocado como 0 a quantidade
            finalObj[index].quantity = 0;          
        }
    }

    saveJSON(finalObj);
}

//funcao que cira o arquivo saida.json
function saveJSON(data) {

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
    fs.writeFileSync('saida.json', JSONData, finished);

    //somente apos terminar de escrever o arquivo chama essas duas funcoes
    validateList();
    quantityPerCategory();

}

//Funcao que imprime a lista corrigida ordenada por categoria e id
function validateList() {

    //le o arquivo gerado
    db = readJSON('./saida.json');

    //verfica se achou o arquivo
    if(!db){
        return;
    }

    db.sort((a,b) => {
        
        //organiza por categoria
        if( a.category < b.category ){
            return -1;
        } else if ( a.category > b.category ){
            return 1;
        }

        //chega apenas quando estiver na mesma categoria
        //organiza crescentemente por id
        return a.id < b.id ? -1 : 1; 
    });
    
    //imprime apenas o nome
    console.log(db.map(obj => obj.name));
}

//Funcao que calcula a quantidade de tudo de uma categoria
function quantityPerCategory() {

    //le o arquivo gerado
    db = readJSON('./saida.json');

    //verfica se achou o arquivo
    if(!db){
        return;
    }

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
        const filteredDB = db.filter(obj => obj.category === category);

        //aplica a funcao reduce somando as quantidades dos objetos do vetor filtrado
        const quantity = filteredDB.map(obj => obj.quantity).reduce((total, add) => {
            return total+add;
        });

        console.log(`Estoque de ${category} = ${quantity}`);
    });
}

createObjects();
