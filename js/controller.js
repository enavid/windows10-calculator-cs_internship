import _display from './display.js';
import _keyBoard from './keyboard.js';
import _history from './history.js';
let history = [];
let memory = [];

//=========================== control event listener ====================
_keyBoard.addEventListener('display', (input) => {
    if ((input.first_sign != '' || input.second_sign != '') && input.second_number == '') _display.render_history(input);
    if (input.first_number != '') _display.render_result(input.first_number);
    if (input.second_number != '') _display.render_result(input.second_number);
})

_keyBoard.addEventListener('clear', (input) => {
    clear(input);
    _display.renderZero();

})

_keyBoard.addEventListener('single_operator', (input) => {
    _display.render_history(input);

    if (input.first_number == '' && input.second_number == '') {
        input.first_number = '0';
        _display.render_result(input.first_number);
    }

    else if (input.second_number == '' && input.operation != '') {
        input.first_number = single_calculator(input.first_number, input.operation);
        input.operation = '';
        _display.render_result(input.first_number);
    }

    else if (input.first_number != '' && input.operation != '') {
        const number = input.second_number == '' ? input.first_number : input.second_number;
        input.second_number = single_calculator(number, input.operation);
        input.operation = '';
        _display.render_result(input.second_number);

    }
})

_keyBoard.addEventListener('next_operation', (input) => {
    input.final_result = double_calculator(input.first_number, input.second_number, input.first_sign, input.second_sign);
    history.push({ ...input });

    const final_result = input.final_result;
    const next_operation = input.next_operation;
    clear(input);
    input.first_number = final_result;
    input.second_sign = next_operation;
    _display.render_history(input);
    _display.render_result(input.first_number);
    _history.render(history)
})

_keyBoard.addEventListener('equal', (input) => {

    if (input.second_number == '' && input.second_sign == '') {

        if (history.length === 0) {
            input.first_number = '0';
        }
        else if (input.second_sign == '') {
            input.first_number = history[history.length - 1].final_result;
            input.second_number = history[history.length - 1].second_number;
            input.second_sign = history[history.length - 1].second_sign;
        }
    }

    input.final_result = double_calculator(input.first_number, input.second_number, input.first_sign, input.second_sign);
    history.push({ ...input });
    const final_result = input.final_result;
    _display.render_history(history[history.length - 1]);
    _display.render_result(input.final_result);
    _history.render(history);
    clear(input);
    input.first_number = final_result;
})

_history.addEventListener('trash', () => {
    history = [];
    _history.render(history);
})

_history.addEventListener('trash', (state) => {

    if (state == 'history') {
        history = [];
        _history.render(history);
    }
    else if (state == 'memory') {
        memory = [];
        _history.render(memory);
    }
})

_history.addEventListener('history', () => {
    _history.render(history);
})

_history.addEventListener('memory', () => {
    _history.render(memory);
})

_history.addEventListener('back', () => {
    _history.render(memory);
})

// ========================== Define control function ==================


function double_calculator(first_number, second_number, sign1, sign2) {

    if (sign1 == '' && sign2 == '') return '0';

    first_number = parseFloat(sign1 + first_number);
    second_number = parseFloat(second_number);
    let result = 0;
    switch (sign2) {
        case '+': {
            result = first_number + second_number;
            break
        }
        case '-': {
            result = first_number - second_number;
            break;
        }
        case '×': {
            result = first_number * second_number;
            break
        }
        case '÷': {
            result = first_number / second_number;
            break;
        }
        default: {
            result = '0';
        }
    }
    return result.toString();

}

function single_calculator(number, operator) {
    let result = 0;
    switch (operator) {
        case '√': {
            result = Math.sqrt(number);
            break;
        }
        case 'power': {
            result = Math.pow(number, 2);
            break;
        }
        case 'oneDivision': {
            result = number = 1 / number;
            break;
        }
    }
    return result.toString();
}

function clear(input) {
    input.first_sign = '';
    input.first_number = '';
    input.second_number = '';
    input.second_sign = '';
    input.next_operation = '';
    input.operation = '';
    input.final_result = '';
};