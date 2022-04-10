const canvas = document.querySelector('#canvas')
const botao = document.querySelector('#botao')
const xA = document.querySelector('#xA')
const yA = document.querySelector('#yA')
const xB = document.querySelector('#xB')
const yB = document.querySelector('#yB')

const ctx = canvas.getContext('2d')

var espacamento = 10
var pontoA = []
var pontoB = []

document.onload = desenharMalha()
document.onload = escreverNum()

function desenharMalha() {
  //Linhas verticais
  for(i = 1; i <= canvas.width / espacamento; i++){
    let linhaY = i
    linhaY *= 10
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(0, 0, 0, .4)'
    ctx.moveTo(linhaY,0)
    ctx.lineTo(linhaY, canvas.height)
    ctx.stroke()
    ctx.closePath()
  }

  //Linhas horizontais
  for(i = 1; i <= canvas.width / espacamento; i++){
    let linhaX = i
    linhaX *= 10
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(0, 0, 0, .4)'
    ctx.moveTo(0, linhaX)
    ctx.lineTo(canvas.width, linhaX)
    ctx.stroke()
    ctx.closePath()
  }

  //Desenha a reta origem horizontal
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
  ctx.moveTo(0, canvas.height / 2)
  ctx.lineTo(canvas.width, canvas.height / 2)
  ctx.stroke()
  ctx.closePath()

  //Desenha a reta origem horizontal
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
  ctx.moveTo(canvas.width / 2, 0)
  ctx.lineTo(canvas.width / 2, canvas.height)
  ctx.stroke()
  ctx.closePath()
}

function conversorOrigem(ponto) {
//Ponto x negativo
  if(ponto[0] < 0){
    ponto[0] = (canvas.width / 2) + (ponto[0] * 10)
  }
  else if(ponto[0] > 0){
    ponto[0] = (canvas.width / 2) + (ponto[0] * 10)
  } //Ponto x positivo

//Ponto y negativo
  if(ponto[1] < 0){
    ponto[1] = (canvas.height / 2) - (ponto[1] * 10)
  }
  else if(ponto[1] > 0){
    ponto[1] = (canvas.height / 2) - (ponto[1] * 10)
  } //Ponto y positivo


  if(ponto[0] == 0){
      ponto[0] = canvas.width / 2
  }

  if(ponto[1] == 0){
    ponto[1] = canvas.height / 2
  }

}

function desenharPonto(){
  //Ponto A
  conversorOrigem(pontoA)
  ctx.fillStyle = 'black'
  ctx.arc(pontoA[0], pontoA[1], 5, 0, 360, false)
  ctx.fill()
  ctx.closePath()

  //Ponto B
  conversorOrigem(pontoB)
  ctx.arc(pontoB[0], pontoB[1], 5, 0, 360, false)
  ctx.fill()
  ctx.closePath()
}

function desenharReta(){
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.moveTo(pontoB[0], pontoB[1])
  ctx.lineTo(pontoA[0], pontoA[1])
  ctx.stroke()
}

function escreverCoordenadas(ponto){

  const posX = (ponto[0] - canvas.width/2) / 10
  const posY = (ponto[1] - canvas.height/2) / 10

  const texto = `(${posX}, ${-posY})`
  ctx.fillStyle = 'black'
  ctx.translate(3, -3)
  ctx.fillText(texto, ponto[0], ponto[1])
}

function limparTela(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function escreverNum(){
  const tamanhoCanvas = (canvas.width / 2) //Como o canvas é quadrado a sua altura e largura são iguais
  const coordenadas = tamanhoCanvas / 10
  ctx.font = '7px arial'

  //eixo x negativo
  let cteste = tamanhoCanvas
  for(i = 1; i < coordenadas ; i++){
    cteste -= 10
    ctx.fillStyle = 'red'
   ctx.fillText(`-${i}`, cteste, canvas.height / 2 + 10)
  }

  //eixo x positivo
  cteste = tamanhoCanvas
  for(i = 1; i < coordenadas ; i++){
    cteste += 10
   ctx.fillText(i, cteste, canvas.height / 2 + 10)
  }

  //eixo y negativo
  cteste = tamanhoCanvas
  for(i = 1; i < coordenadas ; i++){
    cteste += 10
   ctx.fillText(i, canvas.width / 2 + 3, cteste + 10)
  }

  //eixo y positivo
  cteste = tamanhoCanvas
  for(i = 1; i < coordenadas ; i++){
    cteste -= 10
   ctx.fillText(i, canvas.width / 2 + 3, cteste)
  }
}

botao.addEventListener('click', () => {
  pontoA = [xA.value, yA.value]
  pontoB = [xB.value, yB.value]

  ctx.save()
  limparTela()
  desenharMalha()
  desenharPonto()
  desenharReta()
  escreverNum()
  escreverCoordenadas(pontoA)
  escreverCoordenadas(pontoB)
  ctx.restore()
})
