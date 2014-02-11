var error;
$(document).ready(function() {
    $("#submitButton").on("click", function (event){
        event.preventDefault();
        blankOutputs();
        var numBits = parseInt($("#numBits option:selected").val(), 10);
        var inputBinaryNumber = $("#binaryNumber").val().trim();
        var signed = $("#signed option:selected").val();
        while (inputBinaryNumber.length < numBits) {
            inputBinaryNumber = "0" + inputBinaryNumber;
        }
        if (isValid(numBits, inputBinaryNumber)) {

            if (signed == "false" || inputBinaryNumber.charAt(0) == "0") {
                $("#decimalNumber").val(parseInt(inputBinaryNumber, 2));
            } else {
                var inputNumber = inputBinaryNumber;
                var output = getTwosComplement(inputNumber);
                $("#decimalNumber").val(output);
            }
            error = "";
        } else {
            printError();
        }
    });
});

function getTwosComplement (inputNumber) {
    var output = "";
    var startFlipping = true;
    for (var i = inputNumber.length-1; i >= 0; i--) {
        if (startFlipping) {
            if (inputNumber.charAt(i) == "0") {
                output = "1" + output;
            } else {
                output = "0" + output;
            }
        }
    }

    output = - (parseInt(output, 2) + parseInt(1, 2));

    return output.toString(10);
}

function isValid (numBits, inputBinaryNumber) {
    if (inputBinaryNumber.length > numBits || inputBinaryNumber.length < 1) {
        error = "Invalid number of digits";
        return false;
    }
    if (parseInt(inputBinaryNumber, 2) === NaN) {
        error = "Conversion will fail, input is wrong";
        return false;
    }
    if (containsIllegalDigits(inputBinaryNumber)) {
        error ="Input has invalid digits";
        return false;
    }
    return true;
}

function containsIllegalDigits (inputBinaryNumber) {
    for (var i = 0; i < inputBinaryNumber.length; i++) {
        var ch = inputBinaryNumber.charAt(i);
        if (ch != '0' && ch != '1') {
            return true;
        }
    }
    return false;
}

function blankOutputs() {
    $("#decimalNumber").val("");
//    console.log(error);
    $("#errorPane").text("");
}

function printError() {
    $("#errorPane").text(error);
}