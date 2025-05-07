const generatorPassword = document.querySelector('#generator')
const range = document.querySelector('#range')
const valueSelect = document.querySelector('#ValueSelect')
const minValue = document.querySelector('#min')
const maxValue = document.querySelector('#max')
const selectNumber = document.querySelector('#number')
const selectSymbles = document.querySelector('#symbles')
const checkbox = document.querySelector('#checkbox')

checkbox.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})

function Gerador(){
    minValue = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','T','U','V','W','X','Y','Z']
    maxValue = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','t','u','v','w','x','y','z']
    selectNumber = [0,1,2,3,4,5,6,7,8,9]
    selectSymbles = ['!','@','$','#','%','&','*','(',')','|','?','/','°']

    
}