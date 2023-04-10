import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)

    // Close the signup modal
    const signupModal = document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // reset the form
    signUpForm.reset();

    // show welcome message
    // showMessage("Bienvenido a PlantLink " + userCredentials.user.email);
    Swal.fire({
      title: '¡Bienvenido a PlantLink!+ userCredentials.user.email',
      imageUrl: 'public/index_estilos/img/core-img/plantlink_logo33.png',
      imageHeight: 200
  });

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Este correo ya esta registrado", "error")
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Correo incorrecto", "error")
    } else if (error.code === 'auth/weak-password') {
      showMessage("Contraseña incorrecta", "error")
    } else if (error.code) {
      showMessage("Algo salio mal", "error")
    }
  }

});