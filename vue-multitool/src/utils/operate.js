// Función de js puro. 
//switch cambia la rama según el operador que entre.
export function operate(a, b, operator) {
 switch (operator) {
    case '+':
        return a + b;
    case '-':
        return a - b;
    case '*':
        return a * b;
    case '/':
        return b === 0 ? 'Error' : a / b;
    default: 
        return b
 }
}

//Diferencia entre operator y operation?