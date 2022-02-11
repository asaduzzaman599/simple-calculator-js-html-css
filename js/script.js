const input = document.getElementById('input-text');
const numberButtons = document.getElementsByClassName('number-button');
const oparetorButton = document.getElementsByClassName('oparetor-button');
const resultButton = document.getElementById('result-button');
const deleteButton = document.getElementById('delete-button');
const clearButton = document.getElementById('clear-button');
const pointButton = document.getElementById('point-button');
const negativeButton = document.getElementById('negative-button');
let isPointused = false;
let isResult = false

for (const btn of numberButtons) {
    btn.addEventListener('click', function (event) {
        if(isResult){
            isResult = false;
            input.value = '';
        }
        input.value = input.value + btn.innerText;
    })
}

for (const btn of oparetorButton) {

    btn.addEventListener('click', function (event) {

        if (input.value != '') {
            const inputValue = input.value[input.value.length -1];
            if(inputValue !="+" && inputValue!="-" && inputValue!="x" && inputValue!="/" && inputValue!="%"){
                isResult = false;
                isPointused = false;
                input.value = input.value + btn.innerText; 

            }
        }
    })
}

resultButton.addEventListener('click',function(e){
    const inputValue = input.value;
    if(inputValue != ''){
        if(inputValue.includes('+') ||inputValue.includes('-') ||inputValue.includes('x') ||inputValue.includes('/') ||inputValue.includes('/') ||inputValue.includes('%') ){
            let oparetorIndex = findoparetorIndex(inputValue);
            let firstNumber ='';
            let seondNumber ='';
            for(let i=0; i <oparetorIndex;i++){
                firstNumber = firstNumber + inputValue[i]
            }
            // console.log(firstNumber);
            for(let i=oparetorIndex+1; i <inputValue.length;i++){
                seondNumber = seondNumber + inputValue[i]
            }
            const result = calculation(firstNumber,seondNumber,inputValue[oparetorIndex]);
            displayResult(result)
           /*  input.value = result.toFixed(8);*/
            isResult = true; 
            // console.log(result);
        }
    }
});

deleteButton.addEventListener('click',function(){
    if(input.value != ''){
        input.value = input.value.substring(0, input.value.length - 1);
    }
});

clearButton.addEventListener('click', function(){
    input.value = '';
    isResult = false;
    isPointused = false;
})

pointButton.addEventListener('click', function(){
    if(!isPointused){
        input.value = input.value + '.';
        isPointused = true;
    }
});

negativeButton.addEventListener('click',function(){
    console.log('button click')
    const inputValue = input.value;
    if(!(inputValue.includes('+') || inputValue.includes('-') || inputValue.includes('x') ||inputValue.includes('/') || inputValue.includes('/') ||inputValue.includes('%') || inputValue == "") ){
        
    // console.log('button click')
        
        displayResult(calculation(inputValue,"-1","x"))
        
    }
});


function  findoparetorIndex(inputValue){
    if(inputValue.includes('+')){
        return inputValue.indexOf('+');
    }else if(inputValue.includes('-')){
        if(inputValue[0] == '-'){
            // console.log(" "+inputValue.substring(1,inputValue.length))

            return findoparetorIndex(" "+inputValue.substring(1,inputValue.length));
        }
        return inputValue.indexOf('-');
    }else if(inputValue.includes('x')){
        return inputValue.indexOf('x');
    }else if(inputValue.includes('/')){
        return inputValue.indexOf('/');
    }else if(inputValue.includes('%')){
        return inputValue.indexOf('%');
    }
}

function calculation(firstNumber,seondNumber,oparetor){
seondNumber
    if(oparetor == '+'){
        return Number(firstNumber) + Number(seondNumber);
    }else if(oparetor == '-'){
        return Number(firstNumber) - Number(seondNumber);
    }else if(oparetor == 'x'){
        return Number(firstNumber) *  Number(seondNumber);
    }else if(oparetor == '/'){
        return Number(firstNumber) / Number(seondNumber);
    }else if(oparetor == '%'){
        return Number(firstNumber) /100 * Number(seondNumber);
    }

}

function displayResult(result){
    input.value = result;
}