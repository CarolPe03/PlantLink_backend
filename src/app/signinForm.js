import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)

    // Close the login modal
    const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
    modal.hide();

    // reset the form
    signInForm.reset();

    // show welcome message
    showMessage("Bienvenido a PlantLink: " + userCredentials.user.email);

    Swal.fire({
      title: '¡Bienvenido a PlantLink!+ userCredentials.user.email',
      imageUrl: 'public/index_estilos/img/core-img/plantlink_logo33.png',
      imageHeight: 200
  });
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      showMessage("Wrong password", "error")
    } else if (error.code === 'auth/user-not-found') {
      showMessage("User not found", "error")
    } else {
      showMessage("Something went wrong", "error")
    }
  }
});