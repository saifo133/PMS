let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create'; 
let tmp;

//get total

function getTotal()
{
    if(price.value != ''){ //ensure the input have a value
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value; // store in data type string becase that we add (+) before each variable to transform it to number

        total.innerHTML = result; 
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create product
let dataPro;
if(localStorage.product != null) 
{
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro = [];
}
//let dataPro = [];  we must use array to save each object because if we didn't that when we want add new product he will update the current product so every time we want add new product will save it in array and create new object
//[object1,object2,object3,...]

// note : every product have a attribute for him so we should use object to save each attribut for his product

submit.onclick = function()
{
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML, // total not input so we get it from innerHTML
        count:count.value,
        category:category.value
    }
    
    if(mood === 'create')
    {
        if(newPro.count > 1)
            {
                for(let i=0; i<newPro.count; i++)
                {
                    dataPro.push(newPro);
                }
            }
            else{
                dataPro.push(newPro);
            }
    }
    else{
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML='CREATE';
        count.style.display = 'block';
    }
    dataPro.push(newPro);
    //save localStorge
    localStorage.setItem('product', JSON.stringify(dataPro));

    clearData(); //when user click on create button the function (clearData) will work
    ShowData(); //when user click on create button the function (ShowData) will work
}

//clear inputs
function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read data

function ShowData(){
    getTotal();
    let table = '';
    for(let i=0; i<dataPro.length; i++)
    {
        table += `
        <tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
          <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0)
    {
        btnDelete.innerHTML = `
        <td><button onclick="deleteAll()">DELETE ALL(${dataPro.length})</button></td>
        `
    }
    else{
        btnDelete.innerHTML = '';
    }
}
ShowData();

//Delete Product

function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro); /*it will delete the porduct but you should refresh the page to see changes becase that we need to establish the table again
    the function responsible for that is function (ShowData) he create the table after delete the product*/
    ShowData();
}

// Delete All

function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    ShowData();
}


//update product

function updateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'UPDATE';
    mood = 'update';
    tmp = i;
    scroll(
        {
            top:0,
            behavior:"smooth"
        }
    )
}

//search

let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMood = 'title';
    }
    else
    {
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+searchMood;
    search.focus();
    search.value = '';
    ShowData();
}

function searcheData(value)
{
    let table;
    for(let i=0; i<dataPro.length; i++)
    {
        if(searchMood = 'title')
            {
                if(dataPro[i].title.toLowerCase().includes(value.toLowerCase()))
                {
                    table += `
                    <tr>
                      <td>${i}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
                    </tr>
                    `;
                }
                
            }
            else{
                    
                if(dataPro[i].category.toLowerCase().includes(value.toLowerCase()))
                {
                    table += `
                    <tr>
                      <td>${i}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
                    </tr>
                    `;
                }
            }
    }

    document.getElementById('tbody').innerHTML = table;
}