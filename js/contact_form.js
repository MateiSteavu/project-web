function submitForm() {
    const nume = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log(nume + " " + email + " " +message);

    console.warn("Goodbye World!");
} 