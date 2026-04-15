document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const cardExpiry = document.getElementById("card-expiry").value.trim();
    const cardCvc = document.getElementById("card-cvc").value.trim();
    const address = document.getElementById("address").value.trim();

    let isValid = true;
    let errorMessage = "";

    if (!cardName) {
        errorMessage += "El nombre de la persona es obligatorio.\n";
        isValid = false;
    }

    if (!cardNumber) {
        errorMessage += "El número de tarjeta es obligatorio.\n";
        isValid = false;
    } else if (cardNumber.replace(/\s/g, "").length < 16) {
        errorMessage += "El número de tarjeta debe tener al menos 16 dígitos.\n";
        isValid = false;
    }

    if (!cardExpiry) {
        errorMessage += "La fecha de caducidad es obligatoria.\n";
        isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        errorMessage += "La fecha de caducidad debe tener el formato MM/AA.\n";
        isValid = false;
    }

    if (!cardCvc) {
        errorMessage += "El CVC es obligatorio.\n";
        isValid = false;
    } else if (cardCvc.length < 3) {
        errorMessage += "El CVC debe tener al menos 3 dígitos.\n";
        isValid = false;
    }

    if (!address) {
        errorMessage += "La dirección de entrega es obligatoria.\n";
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    alert("Compra exitosa");
    window.location.href = "../../index.html";
});

document.getElementById("card-number").addEventListener("input", function(event) {
    let value = event.target.value.replace(/\s/g, "");
    let formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    event.target.value = formattedValue;
});

document.getElementById("card-expiry").addEventListener("input", function(event) {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    event.target.value = value;
});

document.getElementById("card-cvc").addEventListener("input", function(event) {
    event.target.value = event.target.value.replace(/\D/g, "");
});
