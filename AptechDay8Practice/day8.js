function Equation()
{
    var a = parseFloat( document.getElementById("numA").value);
    var b = parseFloat(document.getElementById("numB").value);
    var c = parseFloat(document.getElementById("numB").value);
   
    var d = a+b+c;   
    if (d>0)
    {
        var str = `<p>ddd</p>`;
        document.getElementById("result").innerHTML = str;
    }  
    
}


