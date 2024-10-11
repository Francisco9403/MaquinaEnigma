// Configuración de rotores y reflector
const rotores = [
    "JGDQOXUSCAMIFRVTPNEWKBLZYH", // Rotor I
    "NTZPSFBOKMWRCJDIVLAEYUXHGQ", // Rotor II
    "JVIUBHTCDYAKEQZPOSGXNRMWFL"  // Rotor III
];

const reflector = "EJMZALYXVBWFCRQUONTSPIKHGD"; // Reflector

// Función para obtener el índice de una letra en el alfabeto (0-25)
function obtenerIndice(char) {
    return char.charCodeAt(0) - 65; // Convertir el carácter en su índice en el alfabeto (A=0, B=1, ..., Z=25)
}

// Función para obtener la letra desde un índice (0-25)
function obtenerLetra(index) {
    return String.fromCharCode(index + 65); // Convertir un índice en el alfabeto a su correspondiente letra
}

// Función para cifrar un carácter
function cifrarCaracter(char, posicionesRotores) {
    if (!char.match(/[A-Z]/)) return char; // Ignorar caracteres que no sean del alfabeto

    let index = obtenerIndice(char); // Obtener el índice del carácter

    // Pasar por los rotores hacia adelante
    for (let i = 0; i < 3; i++) {
        index = obtenerIndice(rotores[i][(index + posicionesRotores[i]) % 26]); // Ajustar el índice según la posición del rotor y obtener el nuevo índice
    }

    // Pasar por el reflector
    index = obtenerIndice(reflector[index]); // Obtener el índice reflejado

    // Pasar por los rotores hacia atrás
    for (let i = 2; i >= 0; i--) {
        index = (rotores[i].indexOf(obtenerLetra(index)) - posicionesRotores[i] + 26) % 26; // Ajustar el índice hacia atrás a través de los rotores
    }

    return obtenerLetra(index); // Convertir el índice final de nuevo en letra
}

// Función para cifrar un mensaje
function cifrarMensaje(message, posicionesRotores) {
    let encryptedMessage = ""; // Inicializar el mensaje cifrado
    for (let char of message) {
        encryptedMessage += cifrarCaracter(char, posicionesRotores); // Cifrar cada carácter y agregarlo al mensaje cifrado
        // Rotar los rotores después de cada carácter cifrado
        posicionesRotores[0] = (posicionesRotores[0] + 1) % 26; // Rotar el primer rotor
        if (posicionesRotores[0] === 0) {
            posicionesRotores[1] = (posicionesRotores[1] + 1) % 26; // Rotar el segundo rotor si el primero ha completado una vuelta
            if (posicionesRotores[1] === 0) {
                posicionesRotores[2] = (posicionesRotores[2] + 1) % 26; // Rotar el tercer rotor si el segundo ha completado una vuelta
            }
        }
    }
    return encryptedMessage; // Devolver el mensaje cifrado
}

// Agregar un evento de clic al botón de cifrado
document.getElementById('encryptButton').addEventListener('click', () => {
    // Obtener el texto de entrada y las posiciones de los rotores
    const inputText = document.getElementById('inputText').value.toUpperCase(); // Obtener y convertir el texto de entrada a mayúsculas
    const rotor1 = parseInt(document.getElementById('rotor1').value); // Obtener la posición inicial del rotor 1
    const rotor2 = parseInt(document.getElementById('rotor2').value); // Obtener la posición inicial del rotor 2
    const rotor3 = parseInt(document.getElementById('rotor3').value); // Obtener la posición inicial del rotor 3
    const posicionesRotores = [rotor1, rotor2, rotor3]; // Crear un array con las posiciones iniciales de los rotores
    
    // Cifrar el mensaje
    const outputText = cifrarMensaje(inputText, posicionesRotores); // Cifrar el texto de entrada
    
    // Mostrar el mensaje cifrado en el área de salida
    document.getElementById('outputText').value = outputText; // Mostrar el texto cifrado en el campo de salida
});
