const get = document.getElementById.bind(document);
const keyboard = get('keyboard');
const _eventHandler = {};

const input = {
    first_sign: '',
    first_number: '',
    second_sign: '',
    second_number: '',
    next_operation: '',
    operation: '',
    final_result: ''
};

//================================ Keyboard API ===========================
export default { addEventListener };

//=========================== Keyboard event listener ====================

keyboard.addEventListener('click', (e) => {
    e.preventDefault();
    const value = e.target.getAttribute('value');

    if (isNumberOperator(value)) {

        if (value === 'back' && input.first_number != '') {
            if (input.first_number.length == 1) input.first_number = '0';
            else input.first_number = input.first_number.substring(0, input.first_number.length - 1);

            return _eventHandler.display(input);
        }

        if (value === 'clear' || value === 'eclear') return _eventHandler.clear(input);

    }

    if (isNumber(value)) {
        if (value == '0' && (input.first_number == '0' || input.second_number == '0')) return;

        if (input.second_number == '' && input.second_sign == '') {
            if (value === '.' && input.first_number.includes('.')) return;
            if (input.first_number == '0') input.first_number = '';
            input.first_number = input.first_number + value;
            return _eventHandler.display(input);
        }

        else if (input.first_number != '' || input.second_sign != '') {
            if (value === '.' && input.second_number.includes('.')) return;
            if (input.second_number == '0') input.second_number == '';
            input.second_number = input.second_number + value;
            return _eventHandler.display(input);
        }
    }

    if (single_operator(value)) {
        input.operation = value;
        if (input.first_number == '') input.first_number = '0';
        return _eventHandler.single_operator(input);
    }

    if (double_operator(value)) {

        if (input.first_number == '') {
            input.first_number = '0';
            input.second_sign = value;
            _eventHandler.display(input);
        }
        else if (input.second_number == '') {
            input.second_sign = value;
            _eventHandler.display(input);
        }
        else {
            input.next_operation = value;
            _eventHandler.next_operation(input);
        }
        console.log(input)
    }

    if (value === '=') {
        input.operation = '=';
        return _eventHandler.equal(input);
    }


})


//=========================== Define keyboard function ===================

function addEventListener(option, callBack) {
    _eventHandler[option] = callBack;
}

function isNumber(value) {
    return (!isNaN(parseFloat(value)) && isFinite(value)) || value == '.';
}

function isNumberOperator(value) {
    const operator = 'eclear,clear,back';
    return operator.includes(value);
}

function single_operator(value) {
    const operator = '√,power,oneDivision,';
    return operator.includes(value);

}

function double_operator(value) {
    const operator = '+-×÷';
    return operator.includes(value);
}







