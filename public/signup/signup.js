// formvalidation will run when the submit button is clicked
formValidation = () => {

    //Acces form data values
    const username = String(document.forms.signup.username.value);
    const password = String(document.forms.signup.password.value);
    const secondPassword = String(document.forms.signup.confirmPassword.value);
    
    // Get string lenght
    const passwordLenght = password.length;
    const usernameLenght = username.length;
    
    // Condition for submit
    if (usernameLenght < 4 || passwordLenght < 8 || password !== secondPassword){
       return false;
    }

    return true
}

const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

username.addEventListener("keyup", () => {
    const usernameValueLenght = username.value.length;
    if (usernameValueLenght < 4){
        $("#username").css("border", "0.1em solid red");
    }
    else {
        $("#username").css("border", "0.1em solid green");
    }
});

password.addEventListener("keyup", () => {
   const passwordValueLenght = password.value.length;
   if (passwordValueLenght < 8){
       $("#password").css("border", "0.1em solid red");
   }
   else {
       $("#password").css("border", "0.1em solid green");
}
});

confirmPassword.addEventListener("keyup", () => {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    if (passwordValue !== confirmPasswordValue){
        $("#confirmPassword").css("border", "0.1em solid red");
    } 
    else {
        $("#confirmPassword").css("border", "0.1em solid green");
    }
});