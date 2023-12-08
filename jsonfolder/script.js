const button = document.querySelector("#todoSubmit");
const todoInput = document.querySelector("#todoInput");

window.onload = () => {
    button.onclick = callRestApi; 

}

function callRestApi(){
    const idInput = todoInput.value; 
    fetch(`https://jsonplaceholder.typicode.com/todos/${idInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("displayTodo").innerText = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}