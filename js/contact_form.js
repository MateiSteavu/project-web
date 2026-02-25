const Data = new Date();
const my_text = document.querySelector('header p');

if(Data.getHours()>=6 && Data.getHours()<12){
    my_text.textContent = 'Bună dimineața! Bine ai venit pe pagina mea.';
}
else
    if(Data.getHours()>=12 && Data.getHours()<18){
        my_text.textContent = 'Bună ziua! Bine ai venit pe pagina mea.';
    }
    else{
        my_text.textContent = 'Bună seara! Bine ai venit pe pagina mea.';
    }


const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Opreste reload-ul paginii
 // ... codul vostru de validare ...

    const my_text = document.querySelector('footer p');
    const nume = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    {
        let ok = 1;
        if(nume.length<2 || !email.includes('@') || message.length<10)
            ok = 0;
        if(ok){
            my_text.textContent = 'A mers';
            my_text.style.color = 'green';
        }
        else{
            my_text.textContent = 'Nu a mers';
            my_text.style.color = 'red';
        }   
    }
    

    console.log(nume + " " + email + " " +message);

    console.warn("Goodbye World!");
});