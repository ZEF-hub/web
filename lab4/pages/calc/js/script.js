"use strict";
// Функция priority позволяет получить 
// значение приоритета для оператора.
// Возможные операторы: +, -, *, /.
// ----------------------------------------------------------------------------
// The "priority" function allows you to 
// get the priority of an operator. 
// Possible operators: +, -, *, /.
function priority(operation) {
    if (operation == '+' || operation == '-') {
        return 1;
    }
    else {
        return 2;
    }
}
// Проверка, является ли строка str числом.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains a number.
function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}
// Проверка, является ли строка str цифрой.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains a digit.
function isDigit(str) {
    return /^\d{1}$/.test(str);
}
// Проверка, является ли строка str оператором.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains an operator.
function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}
// Функция tokenize принимает один аргумент -- строку
// с арифметическим выражением и делит его на токены 
// (числа, операторы, скобки). Возвращаемое значение --
// массив токенов.
// ----------------------------------------------------------------------------
// The "tokenize" function takes one argument, a string 
// with an arithmetic expression, and divides it into 
// tokens (numbers, operators, brackets).The return value 
// is an array of tokens.
function tokenize(str) {
    let tokens = [];
    let lastNumber = '';
    for (let char of str) {
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        }
        else {
            if (lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        }
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        }
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    return tokens;
}
// Функция compile принимает один аргумент -- строку
// с арифметическим выражением, записанным в инфиксной 
// нотации, и преобразует это выражение в обратную 
// польскую нотацию (ОПН). Возвращаемое значение -- 
// результат преобразования в виде строки, в которой 
// операторы и операнды отделены друг от друга пробелами. 
// Выражение может включать действительные числа, операторы 
// +, -, *, /, а также скобки. Все операторы бинарны и левоассоциативны.
// Функция реализует алгоритм сортировочной станции 
// (https://ru.wikipedia.org/wiki/Алгоритм_сортировочной_станции).
// ----------------------------------------------------------------------------
// The compile function takes one argument, a string with an arithmetic 
// expression written in infix notation, and converts this expression to 
// reverse Polish notation(RPN).The return value is the result of the 
// conversion as a string with operators and operands separated by 
// spaces.The expression can include real numbers, +, -, *, / operators, 
// and brackets. All operators are binary and left associative. 
// The function implements the Shunting yard algorithm
// (https://en.wikipedia.org/wiki/Shunting_yard_algorithm).
function compile(str) {
    let out = [];
    let stack = [];
    for (let token of tokenize(str)) {
        if (isNumeric(token)) {
            out.push(token);
        }
        else if (isOperation(token)) {
            while (stack.length > 0 &&
                isOperation(stack[stack.length - 1]) &&
                priority(stack[stack.length - 1]) >= priority(token)) {
                out.push(stack.pop());
            }
            stack.push(token);
        }
        else if (token == '(') {
            stack.push(token);
        }
        else if (token == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length > 0)
        out.push(stack.pop());
    return out.join(' ');
}
// Функция evaluate принимает один аргумент -- строку 
// с арифметическим выражением, записанным в обратной 
// польской нотации. Возвращаемое значение -- результат 
// вычисления выражения. Выражение может включать 
// действительные числа и операторы +, -, *, /.
// Вам нужно реализовать эту функцию
// (https://ru.wikipedia.org/wiki/Обратная_польская_запись#Вычисления_на_стеке).
// ----------------------------------------------------------------------------
// The evaluate function takes one argument, a string 
// containing an arithmetic expression written in reverse 
// Polish notation.The return value is the result of 
// evaluating the expression.The expression can include 
// real numbers and the operators +, -, *, /. 
// You need to implement this function
// (https://en.wikipedia.org/wiki/Reverse_Polish_notation).
function evaluate(str) {
    const stack = [];
    const tokens = str.split(' '); // Операнды и операторы
    for (let token of tokens) {
        if (isNumeric(token)) {
            stack.push(parseFloat(token)); // Добавление float числа в stack
        }
        else if (isOperation(token)) {
            const operand2 = stack.pop(); // Правое число
            const operand1 = stack.pop(); // Левое число
            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    if (operand2 !== 0) {
                        stack.push(operand1 / operand2);
                    }
                    else {
                        return 'Error: Division by zero';
                    }
                    break;
                default:
                    return 'Error: Unknown operator';
            }
        }
    }
    if (stack.length === 1) {
        return stack[0];
    }
    else {
        return 'Error: Invalid expression';
    }
}
// Функция clickHandler предназначена для обработки 
// событий клика по кнопкам калькулятора. 
// По нажатию на кнопки с классами digit, operation и bracket
// на экране (элемент с классом screen) должны появляться 
// соответствующие нажатой кнопке символы.
// По нажатию на кнопку с классом clear содержимое экрана 
// должно очищаться.
// По нажатию на кнопку с классом result на экране 
// должен появиться результат вычисления введённого выражения 
// с точностью до двух знаков после десятичного разделителя (точки).
// Реализуйте эту функцию. Воспользуйтесь механизмом делегирования 
// событий (https://learn.javascript.ru/event-delegation), чтобы 
// не назначать обработчик для каждой кнопки в отдельности.
// ----------------------------------------------------------------------------
// The clickHandler function is designed to handle click events 
// on calculator buttons. When buttons with classes "digit", 
// "operation" and "bracket" are pressed, the symbols corresponding 
// to the pressed button should appear on the screen 
// (element with the class "screen"). On clicking the button with 
// the "clear" class, the contents of the screen should be cleared.
// By clicking on the button with the "result" class, the result of 
// the calculation of the entered expression should appear on the screen 
// with an accuracy of two decimal places after the decimal separator (point). 
// Implement this function. Use the event delegation mechanism 
// (https://javascript.info/event-delegation) so as not to set a 
// handler for each button separately.
window.onload = function () {
    var _a;
    (_a = document.querySelector('.buttons')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
        const screen = document.querySelector('.screen');
        const clickedElement = event.target;
        if (clickedElement.classList.contains('digit') ||
            clickedElement.classList.contains('operation') ||
            clickedElement.classList.contains('bracket')) { // Если нажата кнопка digit, operation или bracket
            const buttonText = clickedElement.textContent;
            if (buttonText) {
                screen.textContent += buttonText; // Добавление символа в поле
            }
        }
        else if (clickedElement.classList.contains('clear')) { // Если нажата кнопка clear
            screen.textContent = ''; // Замена текста в поле на пустую строку => очистка
        }
        else if (clickedElement.classList.contains('result')) { // Если нажата кнопка result
            try {
                const expression = screen.textContent || ''; // Expression только строковый
                const result = evaluate(compile(expression)); // Вычисление выражения
                if (typeof result === 'number') {
                    screen.textContent = result.toFixed(2); // Если ответ числовой
                }
                else {
                    screen.textContent = result; // Если ответ текстовый (ошибка)
                }
            }
            catch (error) {
                screen.textContent = 'Error';
            }
        }
    });
    document.addEventListener('keydown', function (event) {
        const screen = document.querySelector('.screen');
        if (event.key >= '0' && event.key <= '9') { // Если нажата цифровая клавиша или точка
            screen.textContent += event.key; // Добавление цифры в поле
        }
        else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' ||
            event.key === '.' || event.key === '(' || event.key === ')') { // Если нажата клавиша оператора
            screen.textContent += event.key; // Добавление символа в поле
        }
        else if (event.key === 'Enter') { // Если нажата клавиша Enter, выполнить вычисление
            try {
                let expression = screen.textContent || ''; // Expression только строковый
                const result = evaluate(compile(expression));
                if (typeof result === 'number') {
                    screen.textContent = result.toFixed(2); // Если ответ числовой
                }
                else {
                    screen.textContent = result; // Если ответ текстовый (ошибка)
                }
            }
            catch (error) {
                screen.textContent = 'Error';
            }
        }
        else if (event.key === 'Backspace') { // Если нажата клавиша Backspace, удалить последний символ
            if (screen.textContent)
                screen.textContent = screen.textContent.slice(0, -1);
        }
    });
};
