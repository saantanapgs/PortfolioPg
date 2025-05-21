// SOFT SKILLS
// const btnSoftSkills = document.querySelector('.btnSoftSkills')
// const softSkills = document.querySelectorAll('.descricaoSoftSkills')

// softSkills.forEach(el => el.classList.add('hideSoftHardSkills'))

// btnSoftSkills.addEventListener('click', () => {
//   const isHidden = softSkills[0].classList.contains('hideSoftHardSkills')

//   softSkills.forEach(el => el.classList.toggle('hideSoftHardSkills'))

//   btnSoftSkills.textContent = isHidden ? 'Ver menos' : 'Ver Soft Skills'
// });


// HARD SKILLS
// const btnHardSkills = document.querySelector('.btnHardSkills')
// const hardSkills = document.querySelectorAll('.descricaoHardSkills')

// hardSkills.forEach(el => el.classList.add('hideSoftHardSkills'))

// btnHardSkills.addEventListener('click', () => {
//   const isHidden = hardSkills[0].classList.contains('hideSoftHardSkills')

//   hardSkills.forEach(el => el.classList.toggle('hideSoftHardSkills'))

//   btnHardSkills.textContent = isHidden ? 'Ver menos' : 'Ver Hard Skills'
// })

// MENU
const btnMenu = document.querySelector('#btnMenu')
const menuLateral = document.querySelector('#menuLateral')

const overlay = document.createElement('div')
overlay.id = 'overlay'
document.body.appendChild(overlay);

btnMenu.addEventListener('click', () => {
    menuLateral.classList.toggle('aberto')
    overlay.classList.toggle('ativo')
});

overlay.addEventListener('click', () => {
    menuLateral.classList.remove('aberto')
    overlay.classList.remove('ativo')
})


function btnClaroEscuro() {
  const modoEscuro = document.querySelector('.modoEscuro');
  const modoClaro = document.querySelector('.modoClaro');
  const btnMenu = document.querySelector('.abrirMenu')

  modoEscuro.addEventListener('click', () => {
    modoEscuro.classList.add('hideEscuro');
    modoClaro.classList.remove('hideClaro');
    document.body.classList.add('modo-claro');
        btnMenu.classList.add('invertBtn');
  });

  modoClaro.addEventListener('click', () => {
    modoEscuro.classList.remove('hideEscuro');
    modoClaro.classList.add('hideClaro');
    modoClaro.classList.add('invertBtn');
    btnMenu.classList.remove('invertBtn');
    document.body.classList.remove('modo-claro');
    body.style.transition = '0.5s'
  });
}
btnClaroEscuro();


const limp1 = document.querySelector('#introducao').innerHTML = ''
const limp2 = document.querySelector('#introducaoRoxa').innerHTML = ''
const limp3 = document.querySelector('#paragrafoFormacao').innerHTML = ''
const limp5 = document.querySelector('#paragrafoEspecialidades').innerHTML = ''
const limp6 = document.querySelector('#paragrafoEspecialidadesRoxo').innerHTML = ''
const limp7 = document.querySelector('#tituloMenu').innerHTML = ''
function digitarFraseIntroducao(frase, elemId, time = 65, callback = null) {
  let i = 0
  const elem = document.getElementById(elemId)

  elem.innerHTML = ''

  function escreverFrase() {
    if(i < frase.length) {
      elem.innerHTML += frase.charAt(i)
      i++
      setTimeout(escreverFrase, time)
    } else if (callback){
      callback()
    }
  }

  escreverFrase()
}
  digitarFraseIntroducao('Portfólio | Pedro Santana', 'tituloMenu', 45)
  digitarFraseIntroducao('Olá, meu nome é', 'introducao', 65, function(){
  digitarFraseIntroducao('Pedro Santana', 'introducaoRoxa', 65, function(){
  digitarFraseIntroducao('Técnico em Desenvolvimento de Sistemas pelo SENAI', 'paragrafoFormacao', 50, function(){ 
  digitarFraseIntroducao('Desenvolvedor', 'paragrafoEspecialidades', 60, function(){
  digitarFraseIntroducao('Full-Stack', 'paragrafoEspecialidadesRoxo', 60)
})
})
})
})


function aplicarObserverVisibilidade(seletor) {
  const elementos = document.querySelectorAll(seletor)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel')
        entry.target.classList.remove('invisivel')
      } else {
        entry.target.classList.remove('visivel')
        entry.target.classList.add('invisivel')
      }
    })
  }, {
    threshold: 0.01
  })

  elementos.forEach(el => observer.observe(el))
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarObserverVisibilidade('#divSobreMim')
  aplicarObserverVisibilidade('#divHabilidades')
  aplicarObserverVisibilidade('#divImgDireita')
  aplicarObserverVisibilidade('#divMeio2Projetos')
})

