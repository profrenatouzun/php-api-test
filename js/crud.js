var dataRecords = new Array()

fRefreshData()


// Cadastra ou atualiza um item na base de dados
async function fUpsert(){
    const data = mountItemData()

    if(isNaN(parseInt(data.id)))
    {
        // Define um index auto-increment no insert
        data.id = dataRecords.length
    }

    // Inibe cadastro e atualização de registro vazios 
    if(!!data.name.trim() && !!data.age.trim())
    {
        // Add Data
        await fetch('insert-update.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

        clearFormData()
        fRefreshData()
    }
}

// Exclui um item na base de dados
async function fDelete(id){
    console.log(`Id ${id} removido!`)
    await fetch(`delete.php?id=${id}`)
    fRefreshData()
}

// Seta o item no formulário para atualização
function fSetItem(id){
    document.getElementById("id").value = id
    document.getElementById("name").value = dataRecords[id].name
    document.getElementById("age").value = dataRecords[id].age
}

// Registra na base de dados os dados atualizados
function fRefreshData(){
    fetch("list.php")
        .then(response => response.json())
        .then(records => {
            dataRecords = records
            createDataTable(dataRecords)
        });
}

// Retorna um array com todos os itens da base de dados
function fGetAllItems() {
    return JSON.parse(localStorage.getItem(db_name))
}

// Prepara objeto para armazena-lo na base de dados
function mountItemData(){
    const id = document.getElementById("id").value
    const name = document.getElementById("name").value
    const age = document.getElementById("age").value

    return {id, name, age}
}

// Limpa campos após ação de cadastro e edição
function clearFormData(){
    document.getElementById("id").value = ''
    document.getElementById("name").value = ''
    document.getElementById("age").value = ''
}

// Monta a tabela com itens armazenados na base de dados
function createDataTable(records)
{
    // Cria cada linha <tr> com registros da base de dados
    const linhas = records.map((item, id) => {

        const tdId = document.createElement('td')
        tdId.innerHTML = id

        const tdName = document.createElement('td')
        tdName.innerHTML = item.name

        const tdAge = document.createElement('td')
        tdAge.innerHTML = item.age

        const tdAct = document.createElement('td')
        tdAct.innerHTML = `
            <button id="edit_${id}" act="${id}" class="btn btn-sm btn-outline-primary" onclick="fSetItem(this.attributes.act.value)">Edit</button>
            <button id="delete_${id}" act="${id}" class="btn btn-sm btn-outline-danger" onclick="fDelete(this.attributes.act.value)" >Delete</button>
        `

        const tr = document.createElement('tr')
        tr.appendChild(tdId)
        tr.appendChild(tdName)
        tr.appendChild(tdAge)
        tr.appendChild(tdAct)
        
        return tr

    })

    const tbody = document.getElementById("items");
    tbody.innerHTML = "";

    const tabela = document.getElementById('items')
    linhas.forEach(item => tabela.appendChild(item))
}

