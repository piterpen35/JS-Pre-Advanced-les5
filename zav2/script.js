import {mag} from '/mag.js';
let $  = sel => document.querySelector(sel),receiptBlock =$('.container:nth-child(3)'),
modalWindow=$('.modal_window'),
magForm= document.forms.magForm,
assortmentForm= magForm.assortmentForm;

function renderAssortment() {
    for (const quant of assortmentForm.elements) {
        if(quant.name == 'balance') quant.value = mag.assortment.balance + ' грн';
        else quant.value = mag.assortment[quant.name].count + ' шт';
    }    
}
magForm.addProduct.addEventListener('click',function(){
    let productQuant = magForm.productQuant.value,productName = $('[name="productName"]:checked');
    if(productQuant != 0 && productName != null ){
        productName = productName.value
        let addingProduct = mag.addToBin(productName,productQuant);
        if( typeof(addingProduct) == 'string'){
            magForm.productQuant.value = '';
            modalWindow.style.display='block';
            
            $('.modal_text').innerText = `Вибачте , але на складі лишилося  ${addingProduct.split(' ')[0]} ${mag.assortment[addingProduct.split(' ')[0]].count}`;
        }   
        else{
            console.log(mag.currentBin)
            magForm.bin.value= ' ';
            for (const product in mag.currentBin) {
                if(mag.currentBin[product]!=0) magForm.bin.value += mag.assortment[product].ukr +' : ' + mag.currentBin[product] +'\n';
            }
        }
       
    }
})
magForm.buyProduct.addEventListener('click',function () {
    receiptBlock.innerText = '';
    for (const product in mag.currentBin) (mag.currentBin[product]!=0)?(receiptBlock.innerText += `${product}: ${mag.currentBin[product]}\n`):'';
    receiptBlock.innerText += `Всого: ${mag.getSuma()} грн`;
    mag.sellProducts();
    magForm.bin.value = '';
    renderAssortment();
})


function closeModal(){modalWindow.style.display='none';}
$('.modal_close').addEventListener('click',closeModal);
$('.modal_exit').addEventListener('click',closeModal);
window.addEventListener('click',function (event) { if(event.target==modalWindow)closeModal()})
renderAssortment()