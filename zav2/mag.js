const mag = (function(){
    let assortment = {
        balance:1000,
        beer:{
            count:100,
            price:30,
            ukr:'Пиво',
        },
        wine:{
            count:50,
            price:80,
            ukr:'Вино'
        },
        pepsi:{
            count:80,
            price:20,
            ukr:'Пепсі'
        },
    },currentBin={},currentBinSum=0;
    function addToBin(productName,productQuant) {
        if(assortment[productName].count>=productQuant){
            currentBin[productName] = productQuant;
            currentBinSum += assortment[productName].price * productQuant;
        }
        else{
            return `${productName} ${productQuant} шт`
        }
    }
    
    function sellProducts(){
        for (const product in currentBin){
            assortment[product].count -= currentBin[product];
        }
        assortment.balance += currentBinSum;
        for (const key  in currentBin) {
            currentBin[key]=0;
        }
        currentBinSum=0;
    }
    function getSuma(){
        return currentBinSum;
    }
    return{
        assortment,
        addToBin,
        sellProducts,
        currentBin,currentBinSum,getSuma
    }

}())


export {mag};
