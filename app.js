const baseURL = 'https://viacep.com.br/'

const button = document.querySelector('#search')
button.addEventListener('click', searchCEP)

function searchCEP() {
    const search = document.querySelector('#search-input')
    const value = search.value.replace(/[^\d]/g, '')
    if(value.length === 8) {
        fetch(`${baseURL}/ws/${search.value}/json`).then(response => {
            return response.json()
        }).then(data => {
            const district = document.querySelector('#district-input')
            const street = document.querySelector('#street-input')
            if(data.erro) {
                alert('Logradouro inexistente')
                district.value = ''
                street.value = ''
                search.value = ''
                return
            }
            district.value = data.bairro
            street.value = data.logradouro
            search.value = ''
        })
    }
}

const search = document.querySelector('#search-input')
search.addEventListener('keyup', handleCEP)
search.addEventListener('keypress', handleCEP)

function handleCEP() {
    const search = document.querySelector('#search-input')
    let value = search.value.replace(/[^\d]/g, '')
    if(value.length > 8) {
        value = search.value.substring(0, search.value.length - 1)
        search.value = value
        return
    } 
    if(value.length === 8) {
        value = search.value.replace(/^(\d{5})(\d{3})/, '$1-$2')
        value = value.replace(/[^\d-]/g, '')
    }
    search.value = value
}