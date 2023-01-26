const form = document.querySelector('#form')
const mochila = JSON.parse(localStorage.getItem('itens')) || []
const lista = document.querySelector('#lista')

mochila.forEach((item) => {
    adicionaItem(item)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const novoItem = {
        'id': mochila.length,
        'nome': form.nome.value,
        'quantidade': form.quantidade.value
    }

    const itemExiste = mochila.find(item => item.nome === form.nome.value)

    if(itemExiste){
        novoItem.id = itemExiste.id

        atualizaQuantidade(novoItem)

        console.log(mochila[novoItem.id] = novoItem)
    }
    else{
        adicionaItem(novoItem)

        mochila.push(novoItem)
    }

    localStorage.setItem('itens', JSON.stringify(mochila))
})

function adicionaItem(item){
    const li = document.createElement('li')
    li.classList.add('item')

    const strong = document.createElement('strong')
    strong.innerHTML = item.quantidade
    strong.dataset.id = item.id

    li.appendChild(strong)
    li.innerHTML += item.nome
    
    li.appendChild(botaoDeleta(item.id))

    lista.appendChild(li)
}

function atualizaQuantidade(item){
    document.querySelector(`[data-id='${item.id}']`).innerHTML = item.quantidade
}

function botaoDeleta(id){
    const botao = document.createElement('button')
    botao.innerText = 'X'

    botao.addEventListener('click', function(){
        deletaItem(this.parentNode, id)
    })

    return botao
}

function deletaItem(item, id){
    item.remove()

    mochila.splice(mochila.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem('itens', JSON.stringify(mochila))
}