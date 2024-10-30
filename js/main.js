var bookNameInput = document.getElementById("basic-username")
var websiteUrlInput = document.getElementById("basic-url")
var tablebody= document.getElementById("tableBody") 
var searchinput= document.getElementById("search")
var submitbtn=document.getElementById("submit")
var updatebtn=document.getElementById("update")
var booksList=[]
if(localStorage.getItem("book")){
    booksList=JSON.parse(localStorage.getItem("book"))
    displaybook()
}
function addbook(){
    if(validName() && validUrl()){
        var book={
            name:bookNameInput.value,
            url:websiteUrlInput.value
        }
        booksList.push(book)
localStorage.setItem("book",JSON.stringify(booksList))
displaybook()
resetbook()
    }else{
        Swal.fire({
            html: `<div class="text-start mb-3">
            <i class="fa-solid fa-circle text-danger"></i>
              <i class="fa-solid fa-circle text-warning"></i>
              <i class="fa-solid fa-circle text-success"></i>
            </div>
               <b class="d-block text-start fs-6">Site Name or Url is not valid, Please follow the rules below :</b>
               <div class="d-flex justfiy-content-center align-items-center mt-3">
               <i class="fa-regular fa-circle-right text-danger pe-3 pb-3"></i>
               <p>Site name must contain at least 3 characters</p>
               </div>
               <div class="d-flex justfiy-content-center align-items-center">
               <i class="fa-regular fa-circle-right text-danger pe-3 pb-3"></i>
               <p>Site URL must be a valid one</p>
               </div>
             
            `,
            showConfirmButton: false,
            showCloseButton: true,
          });
    }
}
function resetbook(){
    bookNameInput.value=""
    websiteUrlInput.value=""
    websiteUrlInput.classList.remove("is-valid")
    bookNameInput.classList.remove("is-valid")
}
function replaceWithExample(link) {
    window.open('https://'+ link,'_blank');
}
function displaybook(){
    var test= ``
    for(var i=0;i<booksList.length;i++){
         test+=`<tr>
                        <td>${i+1}</td>
                        <td>${booksList[i].name}</td>
                        <td class="d-flex justify-content-center ">
                         <a href="" onclick="replaceWithExample('${booksList[i].url}');return false"><button 
                          type="button" class="btn btn-visit"><i class="fa-solid fa-eye"></i>
                                Visit</button></a>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" onclick="deletebook(${i})"><i class="fa-solid fa-trash-can"></i>
                                Delete</button>
                            <button type="button" class="btn btn-warning" onclick="setupdatevalue(${i})"><i class="fa-solid fa-pen-to-square"></i>
                                update</button>
                        </td>
                      </tr>`
    }
tablebody.innerHTML=test;
}

function deletebook(index){
booksList.splice(index,1)
localStorage.setItem("book",JSON.stringify(booksList))
displaybook()
}

function validName(){
    var regex=/^(\w{3,} ?\w+)+$/
    var mystring= bookNameInput.value
    if(regex.test(mystring)){
        bookNameInput.classList.add("is-valid")
        bookNameInput.classList.remove("is-invalid")
        return true
    }else{
        bookNameInput.classList.add("is-invalid")
        bookNameInput.classList.remove("is-valid")
        return false
        
        
    }
    
 }
 function validUrl(){
    var regex=/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/
    var mystring= websiteUrlInput.value
    if(regex.test(mystring)){
        websiteUrlInput.classList.add("is-valid")
        websiteUrlInput.classList.remove("is-invalid")
        return true
    }else{
        websiteUrlInput.classList.add("is-invalid")
        websiteUrlInput.classList.remove("is-valid")
        return false
    }
    
 }
 
function search(){
var term= searchinput.value
    var test= ``
    for(var i=0;i<booksList.length;i++){
        if(booksList[i].name.includes(term)){
            test+=`<tr>
            <td>${i+1}</td>
            <td>${booksList[i].name}</td>
            <td class="d-flex justify-content-center ">
             <a href="" onclick="replaceWithExample('${booksList[i].url}');return false"><button 
              type="button" class="btn btn-visit"><i class="fa-solid fa-eye"></i>
                    Visit</button></a>
            </td>
            <td>
                <button type="button" class="btn btn-danger" onclick="deletebook(${i})"><i class="fa-solid fa-trash-can"></i>
                    Delete</button>
            </td>
          </tr>`
        }else{
            if(test==""){
                test=`no books`
            }
        }
      
    }
    tablebody.innerHTML=test;
}
var booksupdateindex;
function setupdatevalue(index){
 booksupdateindex= index;
bookNameInput.value = booksList[index].name
websiteUrlInput.value = booksList[index].url
submitbtn.classList.replace("d-block","d-none")
updatebtn.classList.replace("d-none","d-block")
}
function update(){
booksList[booksupdateindex].name=bookNameInput.value
booksList[booksupdateindex].url=websiteUrlInput.value
localStorage.setItem("book",JSON.stringify(booksList))
displaybook()
resetbook()
updatebtn.classList.replace("d-block","d-none")
submitbtn.classList.replace("d-none","d-block")
}