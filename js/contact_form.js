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
const dark_mode = document.getElementById('Dark');
dark_mode.addEventListener('click', function(event){
    document.body.classList.toggle('dark-mode');
});


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

const ceva = document.querySelectorAll('main h2');
ceva.forEach(function(h2){h2.addEventListener('click', function(event){
    const smh = h2.nextElementSibling;
    if(smh){
        smh.classList.toggle('hidden');
    }
})});


Array.from(document.querySelectorAll('ol')).forEach(ol => {
    var educationList = Array.from(ol.children).map(li => li.textContent).filter(text => text.trim() !== '\n');;
    console.log(educationList);

    for (let i = 0; i < educationList.length; i++) {
        let text = educationList[i];
        if (text.includes("ceva")) {
            console.log(text);
        }
        if (text.includes("2024")) {
            console.log(text);
        }
        const primeleCuvinte = text.match(/\S+/)[0];
        console.log(primeleCuvinte);
        var aniiStudiu = text.match(/\d{4}/g);
        if (aniiStudiu) {
            console.log(aniiStudiu);
        }
        var durataStudii=0, durataAuxiliara;
        if (aniiStudiu[0]>aniiStudiu[1]) {
            durataAuxiliara = aniiStudiu[0] - aniiStudiu[1];
        }
        else {
            durataAuxiliara = aniiStudiu[1] - aniiStudiu[0];
        }
        if (durataAuxiliara > durataStudii) {
            durataStudii = durataAuxiliara;
        }
        console.log("Total ani de studiu: " + durataStudii);
    }
});