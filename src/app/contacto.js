firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const contactoRef = db.collection('contacto');
const miFormulario = document.querySelector('#miFormulario');

miFormulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtén los valores de los campos del formulario
  const name = miFormulario.querySelector('#name').value;
  const email = miFormulario.querySelector('#email').value;
  const phone = miFormulario.querySelector('#phone').value;
  const message = miFormulario.querySelector('#message').value;

  // Guarda los datos en Firebase
  contactoRef.add({
    name: name,
    email: email,
    phone: phone,
    message: message
  })
  .then(() => {
    console.log('Datos guardados correctamente en Firebase');
    miFormulario.reset();
  })
  .catch((error) => {
    console.error('Error al guardar los datos en Firebase:', error);
  });
});