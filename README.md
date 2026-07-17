# Cyberpunk Multitool

> Aplicación multifuncional construida con Vue 3 que reúne una calculadora, un conversor de divisas y un módulo del tiempo en una única vista, con estética neón.   

**Código pendiente de refactorización**

## Funcionalidades

### Calculadora

- Operaciones básicas: suma, resta, multiplicación y división.
- Teclas numéricas del 0 al 9, coma decimal (`.`), igual (`=`) y `CE` para resetear.
- Encadenado de operaciones sin necesidad de pulsar `=` entre ellas (`2 + 3 + 4 =` → `9`).
- Control de errores:
  - División entre cero → muestra `Error`.
  - Impide introducir más de un punto decimal en el mismo número.
  - `=` sin operación pendiente no produce ningún efecto.

### Memoria (extras)

- `M+` — guarda en memoria el número que hay en pantalla.
- `MR` — recupera el valor almacenado.
- `MC` — borra la memoria.

El valor en memoria se almacena en un **store de Pinia**, es decir, estado global de la aplicación, a diferencia del estado interno de la calculadora, que es local al composable.

### Conversor de divisas

- Divisas soportadas: Euro (€), Dólar ($) y Yen (¥).
- Las tasas se solicitan **una sola vez** al montar el componente; las conversiones posteriores son cálculo local, sin nuevas llamadas a la API.
- Como la API entrega todas las tasas referidas al dólar, la conversión entre dos divisas cualesquiera se resuelve pasando por USD:

  ```
  resultado = cantidad / tasa(origen) * tasa(destino)
  ```

- Control de errores: cantidad no numérica, fallo de red y botón deshabilitado mientras cargan las tasas.

### El tiempo

- Predicción para las localidades de la provincia de **Asturias**.
- Muestra por cada localidad: nombre, descripción del estado del cielo y temperaturas máxima/mínima.
- **Imagen en función del `stateSky`**: el código de estado del cielo que devuelve AEMET se usa directamente para construir la URL del icono correspondiente.

---

## Stack

| Herramienta | Uso |
|---|---|
| **Vue 3** (`<script setup>`) | Framework principal |
| **Vite** | Build tool y servidor de desarrollo |
| **Pinia** | Estado global (memoria de la calculadora) |
| **Axios** | Llamadas HTTP a las APIs |
| **Vitest** | Tests unitarios |
| **Playwright** | Tests end-to-end |
| CSS propio | Estética neón, sin librería externa |

Diseño **Mobile First**: los estilos base están pensados para pantalla pequeña.

---

## Estructura de carpetas

```
vue-multitool/
├── src/
│   ├── components/
│   │   ├── Calculator.vue          # Teclado y pantalla
│   │   ├── CurrencyConverter.vue   # Formulario de conversión
│   │   └── Weather.vue             # Listado de localidades
│   ├── composables/
│   │   ├── useCalculator.js        # Estado y lógica de la calculadora
│   │   ├── useCurrency.js          # Estado y lógica del conversor
│   │   └── useWeather.js           # Estado y lógica del tiempo
│   ├── services/
│   │   ├── currency.js             # Axios + mapper de currencyfreaks
│   │   └── weather.js              # Axios + mapper de el-tiempo.net
│   ├── stores/
│   │   └── memory.js               # Store de Pinia (M+/MR/MC)
│   ├── utils/
│   │   └── operate.js              # Aritmética pura
│   ├── test/                       # Tests unitarios (Vitest)
│   ├── App.vue                     # Vista única
│   └── main.js                     # Punto de entrada, registro de Pinia
├── test/                           # Tests e2e (Playwright)
├── .env                            # API key (no versionado)
├── playwright.config.js
└── vite.config.js
```
## Variables de entorno

El conversor de divisas requiere una API key gratuita de [currencyfreaks.com](https://currencyfreaks.com).

Crea un archivo `.env` en la raíz del proyecto:

```
VITE_CURRENCY_API_KEY
```
---

## Tests

### Unitarios (Vitest)

Ubicados en `src/test/`. Cubren:

- **`operate.js`** — las cuatro operaciones, la división entre cero y el operador no reconocido.
- **`weather.js`** — el mapper (aplanado del id, conversión de temperaturas, extracción de `stateSky`) y la construcción de la URL del icono. Se usan *fixtures* con respuestas reales de la API, de modo que los tests no dependen de la red.

```bash
npm test
```

### End-to-end (Playwright)

Ubicados en `test/`. Abren un navegador real y operan la interfaz como lo haría una persona, verificando la cadena completa desde el clic hasta el resultado en pantalla.

```bash
npx playwright test
```

Playwright arranca el servidor de desarrollo automáticamente (`webServer` en `playwright.config.js`).

---

## APIs utilizadas

### CurrencyFreaks

```
https://api.currencyfreaks.com/v2.0/rates/latest
```

Requiere API key. Devuelve todas las tasas referidas al dólar como divisa base.

### elTiempo.net (datos de AEMET)

```
https://api.el-tiempo.net/json/v3/provincias/33
```

Sin API key. El código `33` corresponde a Asturias.

> **Nota:** el endpoint `https://www.el-tiempo.net/api/json/v2/...` devuelve `405 Method Not Allowed` en llamadas desde JavaScript. El subdominio `api.` con la versión `v3` es el que funciona y además envía las cabeceras CORS correctas, por lo que no hace falta ningún proxy.

### Iconos de AEMET

```
https://www.aemet.es/imagenes_gcd/_iconos_municipios/{skyId}.png
```

El `skyId` que devuelve la API es directamente el nombre del archivo del icono.

Datos meteorológicos elaborados por la **Agencia Estatal de Meteorología (AEMET)**. © AEMET. Autorizado el uso de la información y su reproducción citando a AEMET como autora de la misma.

---

## Flujo de ramas

```
main   ──●──────────────────────────────────────●──
          \                                     /
dev        ●────●────────●─────────●───────────●
            \  /        /         /
   feat-calculator     /         /
        feat-currency /         /
              feat-weather     /
                        testing
```

- El **andamiaje** (Vite, Pinia, Axios, estructura de carpetas) vive en la base compartida, no en una rama de funcionalidad: las tres ramas feature lo necesitan por igual.
- Cada módulo se desarrolla en su propia rama (`feat-calculator`, `feat-currency`, `feat-weather`, `testing`).
- Cada rama feature nace **de `dev`**, nunca de otra rama feature, para partir de la base compartida sin arrastrar código de otro módulo.
- Al terminar, cada rama se mergea a `dev`.
- `dev` se mergea a `main` **solo** cuando el proyecto está terminado.

---
