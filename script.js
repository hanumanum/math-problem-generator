let eq = document.getElementById("eq")
eq.innerHTML = newEq()
MathJax.Hub.Typeset()


let levels = document.getElementById("levels")
levels.addEventListener("change",function(){
    eq.innerHTML = newEq()
    MathJax.Hub.Typeset()
})


function newEq(){
    let n1 =  randomInt(5,30);
    let n2 =  randomInt(4,30);
    let n3 =  randomInt(2,30);
    let p =  randomInt(4,8);

    return "$$x = \\frac{"+n1+"a^"+p+"+"+n2+"b+c} {"+n3+"}$$"
}


function randomInt(min, max){
    return parseInt(Math.random() * (max - min) + min);
}