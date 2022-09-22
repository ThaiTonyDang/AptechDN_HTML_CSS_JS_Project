function Sum()
{
    var num1 = document.getElementById(`firt-number`).value;
    var num2 = document.getElementById(`second-number`).value;
    var sum = parseInt(num1) + parseInt(num2);
    document.getElementById(`third-number`).value = sum;
}