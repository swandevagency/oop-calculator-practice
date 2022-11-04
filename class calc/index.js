let previous = document.getElementById("previousInput");
let operatorInput = document.getElementById("operatorInput");
let current = document.getElementById("currentInput");
let numberButtons = document.querySelectorAll(".numberButton");
let operatorButtons = document.querySelectorAll(".operatorButton");
let allClearButton = document.querySelector(".allClearButton");
let deleteButton = document.querySelector(".deleteButton");
let equalButton = document.querySelector(".equalButton");

class Calculator {
    constructor(previous, operatorInput, current) {
        this.previous = previous;
        this.operatorInput = operatorInput;
        this.current = current;
        this.decimal = true;
        this.isPrevious = true
        this.isOperator = false
    }
    addBtn(number) {
        if (this.isPrevious) {
            if (number === '.') {
                if(this.decimal) {
                    this.previous.innerHTML += number
                    this.decimal = false
                }
            }
            else if(number === 0 && this.previous.innerHTML.length < 2 && this.previous.innerHTML.endsWith(0)) {
                this.previous.innerHTML = number
            }
            else {
                this.previous.innerHTML += number
            }
        }
        else {
            if (number === '.') {
                if(this.decimal) {
                    this.current.innerHTML += number
                    this.decimal = false
                }
            }
            else if(number === 0 && this.current.innerHTML.length < 2 && this.current.innerHTML.endsWith(0)) {
                this.current.innerHTML = number
            }
            else {
                this.current.innerHTML += number
            }
        }
        this.isOperator = false 
    }
    addOperator(operator) { 
        this.isOperator = true
        this.isPrevious = false
        this.decimal = true
        if (this.previous.innerHTML && this.operatorInput.innerHTML && this.current.innerHTML) {
            this.equal()
            this.operatorInput.innerHTML = operator
            this.isPrevious = false
        }else {
            this.operatorInput.innerHTML = operator
        }
    }
    remove() {
        this.previous.innerHTML = '';
        this.current.innerHTML = '';
        this.operatorInput.innerHTML = '';
        this.isPrevious = true
        this.decimal = true
    }
    equal() {
        let result;
        if(this.operatorInput.innerHTML === '+') {
           result = +this.previous.innerHTML + +this.current.innerHTML
        }
        else if (this.operatorInput.innerHTML === '-') {
            result = +this.previous.innerHTML - +this.current.innerHTML
        }
        else if (this.operatorInput.innerHTML === '*') {
            result = +this.previous.innerHTML * +this.current.innerHTML
        }
        else {
            result = +this.previous.innerHTML / +this.current.innerHTML
        }
        this.previous.innerHTML = result
        this.current.innerHTML = '';
        this.operatorInput.innerHTML = '';
        this.isPrevious = true
        this.decimal = true
    }
    del() {
        if (this.isPrevious) {
            this.previous.innerHTML = this.previous.innerHTML.slice(0, this.previous.innerHTML.length - 1)
        }
        else if (this.isOperator) {
            this.operatorInput.innerHTML = this.operatorInput.innerHTML.slice(0, this.operatorInput.innerHTML.length - 1)
            this.isPrevious  = true
        }
        else {
            this.current.innerHTML = this.current.innerHTML.slice(0, this.current.innerHTML.length - 1)
            if(!this.current.innerHTML) {
                this.isOperator = true
            }
        }
    }
}
const calculator = new Calculator(previous, operatorInput, current)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addBtn(button.innerText)
    })
})
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperator(button.innerText)
    })
})
allClearButton.addEventListener('click', button => {
    calculator.remove()
})
equalButton.addEventListener('click', button => {
    calculator.equal()
})
deleteButton.addEventListener('click', button => {
    calculator.del()
})