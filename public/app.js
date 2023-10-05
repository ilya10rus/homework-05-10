document.addEventListener('click', event => {
    if( event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        
        remove(id).then(()=>{
            event.target.closest('li').remove()
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: "DELETE"})
}

document.addEventListener('click', event => {
    if( event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        
        const editingText = prompt('Введите новое название')
       
        if (editingText === null) {
            return
        } else {
            edit(id,editingText).then(()=>{
                event.target.closest('li').edit()
            })
        };
    }
})

async function edit(id,text) {
    await fetch('/', { method: "PUT", headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body:{
        title: text,
        id: id
    }})
}