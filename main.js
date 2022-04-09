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

}

function desenharPonto(){
  //Ponto A
  conversorOrigem(pontoA)
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
  ctx.translate(3, -3)
  ctx.fillText(texto, ponto[0], ponto[1])
}

function limparTela(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

botao.addEventListener('click', () => {
  pontoA = [xA.value, yA.value]
  pontoB = [xB.value, yB.value]
  
  ctx.save()
  limparTela()
  desenharMalha()
  desenharPonto()
  desenharReta()
  
  escreverCoordenadas(pontoA)
  escreverCoordenadas(pontoB)
  ctx.restore()
})



function escreverNum(){
  let posicao = []
  for(i = 10 ; i < canvas.width/2; i += 10){
    posicao.push(i)
  }
  
  posicao.reverse()
  //Posição x negativo
  for(c=0; c < canvas.width/10; c++){
    ctx.font = '7px Arial'
    console.log(posicao[c])
    ctx.fillText(-c-1 , posicao[c], canvas.height/2 + 10)
  }
  //Posicao x positivo
  for(i= canvas.width/2 + 10; i < canvas.width; i+= 10){
    ctx.font = '7px Arial'
    ctx.fillText(i, i, canvas.height/2 + 10)
  }
  
  console.log(posicao)
  
}
escreverNum()