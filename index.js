const url = `http://localhost:3000/monsters/`



const createMonsterForm = () => {
    const monsterCreator = document.querySelector("#create-monster")
    const newForm = document.createElement("form")
        newForm.id = "monster-form"
    const newNameInput = document.createElement("input")
        newNameInput.id = "name"
        newNameInput.placeholder = "name..."
    const newAgeInput = document.createElement("input")
        newAgeInput.id = "age"
        newAgeInput.placeholder = "age..."
    const newDescInput = document.createElement("input")
        newDescInput.id = "description"
        newDescInput.placeholder = "description..."
    const newButton = document.createElement("button")
        newButton.innerText = "Create"
    
    newForm.append(newNameInput, newAgeInput, newDescInput, newButton)
    monsterCreator.append(newForm)
}

const getFormData = () => {
    let a = document.querySelector('#name'),
        b=document.querySelector('#age'),
        c=document.querySelector('#description');
        return{name:a.value, age:parseFloat(b.value) ,description:c.value}
}

const createMonsterCard = a => {
    let b=document.createElement('div'),
        c=document.createElement('h2'),
        d=document.createElement('h4'),
        e=document.createElement('p')
    
    b.dataset.id = a.id
    c.innerHTML = `${a.name}`,
    d.innerHTML=`Age: ${a.age}`,
    e.innerHTML=`Bio: ${a.description}`,
    b.append(c, d, e),
    document.querySelector('#monster-container').appendChild(b)
}

const limitedUrl = `http://localhost:3000/monsters/?_limit=50&_page=`
    let page = 1


const renderMonsters = () => {
    fetch(`${limitedUrl}${page}`)
    .then(res=>res.json())
    .then(monsters=>{
        document.querySelector('#monster-container').innerHTML=''
        for(let i=0; i < monsters.length; i++)
            createMonsterCard(monsters[i])
        })
}


const addNavListeners = () => {
    let a=document.querySelector('#back'),
        b=document.querySelector('#forward');
    
    a.addEventListener('click',() => {
        pageDown()
    })
    b.addEventListener('click',() => {
        pageUp()
    })
}

const pageUp = () => {
    page++,
    renderMonsters()
}

// const pageDown = () => {
//     1<page? (page--, renderMonsters()) : alert("Ain't no monsters here.")
// }
const pageDown = () => {
    if (page > 1) {
        page--, renderMonsters()
    } else {
    alert("Ain't no monsters here.")
    }
}

const postNewMonster = () => {
    document.querySelector("#monster-form").addEventListener("submit", (e) => {
        e.preventDefault()

        fetch(`${url}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(getFormData())
        })
        .then(response=>response.json())
        .then(newMonsterObj => {
            createMonsterCard(newMonsterObj)
        })
        e.target.reset()
    })
}

document.addEventListener("DOMContentLoaded", () => {
    renderMonsters()
    createMonsterForm()
    postNewMonster()
    addNavListeners()
})