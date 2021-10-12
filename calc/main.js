document.querySelector(".linear.button._1").onclick = addLinearEquation;
document.querySelector(".linear.button._2").onclick = solveLinearEquation;
document.querySelector(".linear.button._3").onclick = removeLinearEquation;

const domData = {
  linear: { //Linear Equation Solver
    input: function() {
      let el = new MathfieldElement();
      setAttributes(el, {"virtual-keyboard-mode": "manual"});
      el.classList.add("linear", "input");
      return el;
    },
    listItem: function() {
      let el = document.createElement("li");
      el.classList.add("linear", "list-item");
      el.appendChild(domData.linear.input());
      return el;
    },
    listQuery: ".linear.list",
    mainContainerQuery: ".linear.main-container",
  },
  quadratic: {
    input: function() {
      let el = new MathfieldElement();
      setAttributes(el, {"virtual-keyboard-mode": "manual"});
      el.classList.add("quadratic", "input");
      return el;
    },
    variable: function(power) {
      let el = document.createElement("span")
      setAttributes(el, {})
      el.classList.add("quadratic", "variable")
      el.innerHTML = `x<sup>${power}</sup>`
      return el
    },
    monomial: function(power) {
      let el = document.createElement("div");
      setAttributes(el, {});
      el.classList.add("quadratic", "monomial")
      el.appendChild(domData.quadratic.input())
      el.appendChild(domData.quadratic.variable(power))
      return el
    }
  }
}
function setAttributes(el, data) {
  if(!el || Object.keys(data).length === 0) {return el}
  for(let k in data) {
    el.setAttribute(k, data[k]);
  }
  return el;
}
function addLinearEquation() {
  document.querySelector(`${domData.linear.listQuery}`).appendChild(domData.linear.listItem())
}
function removeLinearEquation() {
  document.querySelector(`${domData.linear.listQuery}`).lastElementChild.remove()
}
function termSort(a, b) {
  return a.replaceAll(/[^a-z]/g, "") > b.replaceAll(/[^a-z]/g, "") // [1b, -3a] -> [-3a, 1b]
}
function solveLinearEquation() {
  let eqlst = [];
  [...(document.querySelector(`${domData.linear.listQuery}`).children)].forEach(x => eqlst.push(x.children[0].value))
  
  let amatrix = eqlst.map(x => x.split("=")[0])
  amatrix = amatrix.map(x => x.replaceAll(/\\frac\{(.*?)\}\{(.*?)\}/g, "$1/$2"))
  let bmatrix = eqlst.map(x => parseFloat(x.split("=")[1]))
  let unkSym = new Set()
  amatrix = amatrix.map(s => {
    return s.replaceAll(/-/g, "+-").split("+").sort(termSort).join("+")
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

