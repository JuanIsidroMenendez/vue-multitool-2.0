import { ref } from 'vue'                          // ref: función Vue: crea variables reactivas
import { operate } from '../utils/operate.js'      // función de cálculo puro desde utils/

export function useCalculator() {     //define y exporta el composable (useCalculator)
        const display = ref('Señor, déjeme hacer sus operaciones')      //texto visible en pantalla al arrancar (también vale '0')
        const stored = ref(null)                                        // primer operador, en null, dado que no hay nada guardado NOTA: ¿es necesario?
        const operator = ref(null)                                      //operación pendiente, ninguna      
        const waitingForOperand = ref(false)             // NOTE                                
}

function inputDigit(digit) {       
    if (waitingForOperand.value) {                //se ejecuta al pulsar 0-9, es decir, al llegar un operand
             display.value = digit
             waitingForOperand.value = false  
    }
    else {
        display.value = display.value === '0'
        ? digit                                    //   sí → sustituye ese '0' por el dígito
        : display.value + digit                    //   no → pega el dígito detrás ('7' + '3' = '73')       
    }
  }
  function inputDecimal() {                    
    if (waitingForOperand.value) {              
      display.value = '0.'                        
      waitingForOperand.value = false              
      return                                       
    }
    if (!display.value.includes('.')) {            
      display.value = display.value + '.'          
    }
  }

  function chooseOperator(nextOperator) {          // se ejecuta al pulsar + - * /; recibe el símbolo
    const current = parseFloat(display.value)      // convierte el texto de pantalla a número real

    if (stored.value === null) {                   // si no había nada guardado...
      stored.value = current                       // ...aparca el número actual como primer operando
    } else if (operator.value) {                   // si ya había número Y operador pendiente (encadenas)...
      const result = operate(                      // ...calcula el resultado parcial
        stored.value, current, operator.value
      )
      display.value = String(result)               // muéstralo en pantalla (convertido a texto)
      stored.value = result === 'Error'            // ¿el cálculo dio 'Error'?
        ? null                                     //   sí → resetea el operando
        : result                                   //   no → guárdalo como nuevo operando
    }

    operator.value = nextOperator                  // guarda el operador recién pulsado como pendiente
    waitingForOperand.value = true                 // el siguiente dígito empezará un número nuevo
  }

  function equals() {                              // se ejecuta al pulsar '='
    if (operator.value === null                    // guardián: si no hay operador...
      || stored.value === null) return             // ...o no hay operando guardado, no hace nada
    const current = parseFloat(display.value)      // número actual de pantalla
    const result = operate(                        // hace el cálculo final
      stored.value, current, operator.value
    )
    display.value = String(result)                 // muestra el resultado
    stored.value = null                            // vacía el operando (la cuenta terminó)
    operator.value = null                          // vacía la operación pendiente
    waitingForOperand.value = true                 // el siguiente dígito empezará limpio
  }

  function clear() {                               // se ejecuta al pulsar 'CE' (reset total)
    display.value = '0'                            // pantalla a cero
    stored.value = null                            // sin operando guardado
    operator.value = null                          // sin operación pendiente
    waitingForOperand.value = false                // sin espera
  }

  return {                                         // expone al componente SOLO lo necesario:
    display,                                       //   el valor a pintar
    inputDigit, inputDecimal,                      //   y las funciones para los botones
    chooseOperator, equals, clear                  //   (stored/operator/flag quedan internos = encapsulados)
  }
