//Variaveis
const generatorPassword = document.querySelector('#generator')
const range = document.querySelector('#range')
const valueSelect = document.querySelector('#valueSelect')
const minValue = document.querySelector('#min')
const maxValue = document.querySelector('#max')
const selectNumber = document.querySelector('#number')
const selectSymbles = document.querySelector('#symbles')
const checkbox = document.querySelector('#checkbox')

//Funções para o Dark Mode
checkbox.addEventListener('click', () => {
    const dark_mode = document.body.classList.toggle('dark')
    localStorage.setItem('darkMode',dark_mode)
})

window.addEventListener('DOMContentLoaded', () => {
    const saveMode = localStorage.getItem('darkMode') === 'true'
    if(saveMode){
        document.body.classList.add('dark')
        checkbox.checked = true
    }
})

//Função para o range 
function atualizarValorDoRange(){
    valueSelect.textContent = range.value
}
range.addEventListener('input', atualizarValorDoRange)

//Função para o gerador de senha
function Gerador(){
    const largeLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','T','U','V','W','X','Y','Z']
    const smallLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','t','u','v','w','x','y','z']
    const selectValue = [0,1,2,3,4,5,6,7,8,9]
    const addSymbles = ['!','@','$','#','%','&','*','(',')','|','?','/','°']
    atualizarValorDoRange()
    
}