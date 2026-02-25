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



function submitForm() {
    const nume = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log(nume + " " + email + " " +message);

    console.warn("Goodbye World!");
} 