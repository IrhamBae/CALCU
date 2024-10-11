let currentInput = '';
let operator = '';
let previousInput = '';
let zeroPressed = false; // Untuk melacak apakah tombol 0 ditekan sebelumnya

function appendNumber(number) {
    currentInput += number;
    document.getElementById('screen').value = currentInput;
}

function setOperator(op) {
    if (currentInput === '') return;
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    zeroPressed = false; // Reset zeroPressed setelah operator dipilih
}

function calculate() {
    if (currentInput === '' || previousInput === '') return;
    let result;
    switch(operator) {
        case '+':
            result = parseFloat(previousInput) + parseFloat(currentInput);
            break;
        case '-':
            result = parseFloat(previousInput) - parseFloat(currentInput);
            break;
        case '*':
            result = parseFloat(previousInput) * parseFloat(currentInput);
            break;
        case '/':
            result = parseFloat(previousInput) / parseFloat(currentInput);
            break;
    }
    document.getElementById('screen').value = result;
    currentInput = result.toString();
    previousInput = '';
    zeroPressed = false; // Reset zeroPressed setelah perhitungan
}

// Fungsi untuk menangani tombol 0 yang berfungsi ganda
function handleZero() {
    if (zeroPressed) {
        calculate(); // Jika ditekan dua kali, hitung hasil
    } else {
        appendNumber('0'); // Jika ditekan sekali, tambahkan angka 0
        zeroPressed = true; // Set zeroPressed menjadi true
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;  
    if (!isNaN(key)) {
        appendNumber(key);
        zeroPressed = key === '0'; // Jika angka 0 ditekan, set zeroPressed
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearScreen(); // Ubah menjadi escape untuk membersihkan layar
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        document.getElementById('screen').value = currentInput;
    }
});
