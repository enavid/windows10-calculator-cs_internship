const get = document.getElementById.bind(document);
const keyboard = get('keyboard');
const _eventHandler = {};

//================================ Keyboard API ===========================
export default { addEventListener };

//=========================== Keyboard event listener ====================

keyboard.addEventListener('click', (e) => {
    e.preventDefault();
    const value = e.target.getAttribute('value');

    if (value === 'back' && _eventHandler['back']) { return _eventHandler['back']() };
    if (value === 'clear' && _eventHandler['clear']) { return _eventHandler['clear']() };
    if (value === 'eclear' && _eventHandler['eclear']) { return _eventHandler['eclear']() };
    if (value === 'sqrt' && _eventHandler['sqrt']) { return _eventHandler['sqrt']() };
    if (value === 'power' && _eventHandler['power']) { return _eventHandler['power']() };
    if (value === 'dot' && _eventHandler['dot']) { return _eventHandler['dot']() };
    if (value === 'equal' && _eventHandler['equal']) { return _eventHandler['equal']() };
    if (value === 'multiply' && _eventHandler['multiply']) { return _eventHandler['multiply']() };
    if (value === 'division' && _eventHandler['division']) { return _eventHandler['division']() };
    if (value === 'sum' && _eventHandler['sum']) { return _eventHandler['sum']() };
    if (value === 'minus' && _eventHandler['minus']) { return _eventHandler['minus']() };
    if (value === 'oneDivision' && _eventHandler['oneDivision']) { return _eventHandler['oneDivision']() };
    if (isNumber(value) && ['number']) { return _eventHandler['number'](value) };
})


//=========================== Define keyboard function ===================

function addEventListener(option, callBack) {
    _eventHandler[option] = callBack;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}