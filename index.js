
const resp1 = document.getElementById("register").addEventListener('click',async ()=>{
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(username);
    console.log(password);
    const data = await fetch("http://localhost:3000/api/v1/users/register",{
        method: "POST",
        body:JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
        headers:{
            "Content-Type": "application/json",
        }
    })
    console.log(data)
    // if(data.status<400){
    //     window.location.href = './Frontend/pages/afterLogin.html';
    // }
})


const resp2 = document.getElementById("login").addEventListener('click',async ()=>{
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(username);
    console.log(password);
    const data = await fetch("http://localhost:3000/api/v1/users/login",{
        method: "POST",
        body:JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
        headers:{
            "Content-Type": "application/json",
        }
    })

    // if(data.status<400){
    //     window.location.href = './Frontend/pages/afterLogin.html';
    // }
    
})
