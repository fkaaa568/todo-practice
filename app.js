var list = document.getElementById('list');


firebase.database().ref('my-database-todos').on('child_added',function(data){


    var li = document.createElement('li');
    var text = document.createTextNode(data.val().value);
    
    // delete feature
    var delbtn = document.createElement('button');
    var btntxt = document.createTextNode('DELETE');
    delbtn.appendChild(btntxt);
    delbtn.setAttribute('class','btn');
    delbtn.setAttribute('id',data.val().key);
    delbtn.setAttribute('onclick','delitems(this)');

    var editbtn = document.createElement('button');
    var edittxt = document.createTextNode('EDIT');
    editbtn.setAttribute('id',data.val().key);
    editbtn.appendChild(edittxt);
    editbtn.setAttribute('onclick','edititem(this)');


    li.appendChild(text);
    list.appendChild(li);
    li.appendChild(delbtn);
    li.appendChild(editbtn);
})

function addtodo(){
    
    //FIREBASE DATABASE
    var todo = document.getElementById('todo-item');
    var database = firebase.database().ref('my-database-todos');
    var key = database.push().key;
    var todos = {
        value : todo.value,
        key : key
    }
    console.log(todos)

    database.child(key).set(todos);
    
    todo.value = "";
}



function delitems(e){
    firebase.database().ref('my-database-todos').child(e.id).remove()
e.parentNode.remove();
}

function deleteall(e){
    firebase.database().ref('my-database-todos').remove();
    list.innerHTML = "";
}

function edititem(edi){
    var editValue = prompt("Enter edit value",edi.parentNode.firstChild.nodeValue);
    var editTodo = {
        val : editValue,
        key : edi.id
    }
    firebase.database().ref('my-database-todos').child(edi.id).set(editTodo);
     edi.parentNode.firstChild.nodeValue = editValue;
}

