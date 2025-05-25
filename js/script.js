//Variáveis
const generatorPassword = document.querySelector('#generator')
const range = document.querySelector('#range')
const valueSelect = document.querySelector('#valueSelect')
const minValue = document.querySelector('#min')
const maxValue = document.querySelector('#max')
const selectNumber = document.querySelector('#number')
const selectSymbles = document.querySelector('#symbles')
const checkbox = document.querySelector('#checkbox')

//Função para o Dark Mode
checkbox.addEventListener('click', () => {
    const dark_mode = document.body.classList.toggle('dark')
    localStorage.setItem('darkMode', dark_mode)
})

//Função para salvar a alteração do tema
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

//Função para o seletor
function checkBoxSelect(){
    let pool = []
    const largeLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','T','U','V','W','X','Y','Z']
    const smallLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','t','u','v','w','x','y','z']
    const selectValue = [0,1,2,3,4,5,6,7,8,9]
    const addSymbles = ['!','@','$','#','%','&','*','(',')','|','?','/','°']
    if(minValue.checked){pool = pool.concat(smallLetters)}
    if(maxValue.checked){pool = pool.concat(largeLetters)}
    if(selectNumber.checked){pool = pool.concat(selectValue)}
    if(selectSymbles.checked){pool = pool.concat(addSymbles)}
    return pool
}

//Função para o gerador de senha
function passwordGenerator(){
    const pool = checkBoxSelect()
    if(pool.length === 0){
        message('Por favor, selecione pelo menos uma das opções para gerar a senha.', '#dc2626')
        password = ''
        return
    }
    let password = ''
    for(let i = 0; i < range.value; i++){    
        const randomIndex = Math.floor(Math.random() * pool.length)
        password += pool[randomIndex]
    }
    generatorPassword.value = password
    saveHistory(generatorPassword.value)
} 
  
//Função para as mensagens de alerta
function message(text, background){
    Toastify({
        text: text,
        duration: 2500,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();
}

//Função para salvar a senha
const savePassword = document.querySelector('#save')
savePassword.addEventListener('click', () => {
    navigator.clipboard.writeText(generatorPassword.value)
    if(generatorPassword.value){
        message('Senha copiada com sucesso!', '#00cc00')
    }
    else{
        message('Gere uma senha antes de tentar copiar', '#dc2626')
    }
})

const main = document.querySelector('main')
const main_2 = document.querySelector('.main_2')

//Função para acessar a área de histórico
function enteringHistory(){
    main.style.display = 'none' 
    main_2.style.display = 'flex' 
    saveHistory()
}

//Função para acessar o gerador de senhas
function leavingHistory(){
    main.style.display = 'flex'
    main_2.style.display = 'none'
}

//Botão de acesso ao histórico
const acessHistory = document.querySelector('#history')
acessHistory.addEventListener('click', enteringHistory)

//Botão de acesso ao gerador de senhas
const exitHistory = document.querySelector('#exit')
exitHistory.addEventListener('click', leavingHistory)

//Função para salvar a senha no localStorage
function saveHistory(password){
    const save = JSON.parse(localStorage.getItem('userHistory')) || []
    save.push(password)
    localStorage.setItem('userHistory', JSON.stringify(save))
    
    const storageSelect = document.querySelector('#storage')
    storageSelect.innerHTML = ''
    save.forEach((password, index) => {
        const option = document.createElement('option')
        option.value = password
        option.textContent = password
        const resultHistory = storageSelect.appendChild(option)
        
    })
}

//Função para salvar a senha ao selecionar o option
const saveOption = document.querySelector('#saveOption')
const storageSelect = document.querySelector('#storage')
saveOption.addEventListener('click', () => {
    const savePassword = storageSelect.value
    if(savePassword){
        navigator.clipboard.writeText(savePassword)
        message('Senha copiada com sucesso!', '#00cc00')
    }
    else{
        message('Selecione uma senha antes de tentar copiar', '#dc2626')
    }
})

//Função para remover as senhas do histórico de senhas salvas
function removeHistory(){
    const storageSelect = document.querySelector('#storage')
    const confirmRemoveHistory = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
    })
    confirmRemoveHistory.fire({
        icon: "warning",
        title: 'Tem certeza?',
        text: 'Você tem certeza que deseja remover o histórico?',
        showCancelButton: true,
        confirmButtonText: "Sim, tenho certeza!",
        cancelButtonText: "Não, cancelar!",
        customClass:{
            confirmButton: 'buttonConfirm',
            cancelButton: 'cancelButton'
        }
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.removeItem('userHistory')
            confirmRemoveHistory.fire({
                icon: 'success',
                title: 'Removido',
                text: 'Seu histórico foi removido com sucesso!',
                confirmButtonText: 'ok',
                customClass:{
                    confirmButton: 'buttonOk'
                }
            })
            document.querySelector('#storage').innerHTML = ''
        }
    })
}