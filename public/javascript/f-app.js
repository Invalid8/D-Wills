let value1, value2, value3;

$(document).ready(function () {
    $(`ul.log${1}`).css("display", "none");
    $(`ul.log${2}`).css("display", "none");
    $("#email").bind("input", () => {
        outlineValidated(ValidateEmail($("#email")[0]), $("#email")[0]);
    });
    $("#username").bind("input", () => {
        determineError(1);
        setModaLenght(value1, "username", 1);
        checkForDigit(value2, "username");
        outlineValidated(checkAllTrue(value1, value2), $("#username")[0]);
    });
    $("#password").bind("input", () => {
        determineError(2);
        setModaLenght(value1, "password", 2);
        checkForDigit(value2, "password");
        EqualPassword(value3, "password", "comfirm_password");
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#password")[0]
        );
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#comfirm_password")[0]
        );
    });
    $("#comfirm_password").bind("input", () => {
        determineError(2);
        EqualPassword(value3, "password", "comfirm_password");
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#password")[0]
        );
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#comfirm_password")[0]
        );
    });
});

const determineError = (num) => {
    value1 = $(`ul.log${num} li`)[0];
    value2 = $(`ul.log${num} li`)[1];
    value3 = $(`ul.log${num} li`)[2];
    return value1, value2, value3;
};
const setModaLenght = (value, selector, num) => {
    $(`#${selector}`).val().length > num
        ? $(`ul.log${num}`).css("display", "block")
        : $(`ul.log${num}`).css("display", "none");
    $(`#${selector}`).val().length >= 8 && $(`#${selector}`).val().length <= 15
        ? value.classList.add("correct")
        : value.classList.remove("correct");
};
const checkForDigit = (value, selector) => {
    function containsNumbers(str) {
        return /[0-9]/.test(str);
    }
    let string = $(`#${selector}`)[0].value;

    containsNumbers(string)
        ? value.classList.add("correct")
        : value.classList.remove("correct");
};
const EqualPassword = (value, selector1, selector2) => {
    $(`#${selector1}`)[0].value === $(`#${selector2}`)[0].value
        ? value.classList.add("correct")
        : value.classList.remove("correct");
};
const checkAllTrue = (...value) => {
    let bool = false;
    value.every((type) => {
        console.log(type.classList.contains("correct"));
        return type.classList.contains("correct")
            ? (bool = true)
            : (bool = false);
    });
    return bool;
};

function ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.value.match(mailformat);
}

function outlineValidated(boot, inputType) {
    boot
        ? (inputType.style.outlineColor = "green")
        : (inputType.style.outlineColor = "red");
}
