function addEquation() {
  let li = document.createElement("li")
  let inp = new MathfieldElement()
  li.appendChild(inp)
  li.classList.add("eq")
  inp.setAttribute("virtual-keyboard-mode", "manual")
  inp.setAttribute("options", "{smartFence:false, fontsDirectory: 'node_modules/mathlive/dist/fonts'}")
  inp.classList.add("inp")

  document.querySelector(".list").appendChild(li)
}
function removeEquation() {
  let li = document.querySelector(".list")
  let ch = li.children
  li.classList.add("eq")
  ch[ch.length-1].remove()
}
function beta(a, b) {
  return a.replaceAll(/[^a-z]/g, "") > b.replaceAll(/[^a-z]/g, "") // [1b, -3a] -> [-3a, 1b]
}
function alpha() {
  let eqlst = [];
  [...(document.querySelector(".list").children)].forEach(x => eqlst.push(x.children[0].value))
  
  let amatrix = eqlst.map(x => x.split("=")[0])
  amatrix = amatrix.map(x => x.replaceAll(/\\frac\{(.*?)\}\{(.*?)\}/g, "$1/$2"))
  let bmatrix = eqlst.map(x => parseFloat(x.split("=")[1]))
  let unkSym = new Set()
  amatrix = amatrix.map(s => {
    return s.replaceAll(/-/g, "+-").split("+").sort(beta).join("+")
  })
  
  amatrix = amatrix.map(s => s.split("+").filter(y => y).map(y => {
    let sym = y.match(/[a-z]+/g)[0]
    let scope = {unk: 1}
    unkSym.add(sym)
    y=y.replaceAll(sym, "unk")
    
    
    return math.evaluate(y, scope)
  }))
  let solved 
  try {solved = math.lusolve(amatrix,bmatrix).flat()} catch(error) {}
  unkSym = Array(...unkSym).sort() // {b, a} -> [b, a] -> [a, b]. Set -> unsorted Array -> sorted array
  solved = solved.map((x, i) => `${unkSym[i]} = ${x}\n`)
  alert(solved.join(""))
}
document.querySelector("#btn1").onclick = addEquation
document.querySelector("#btn2").onclick = removeEquation
document.querySelector("#btn3").onclick = alpha
