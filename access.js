const passwordDigest = '04a383834af9bf92a50020b8dc7f3e44e9c16f3b94e369b9a2a4b43edec4fcd5';
const sessionKey = 'sociocomunitaria-access-v1';
const form = document.getElementById('access-form');
const password = document.getElementById('access-password');
const error = document.getElementById('access-error');
const submit = document.getElementById('access-submit');

async function openApplication() {
  try {
    await import('./app.js?v=8');
    document.getElementById('access-screen').hidden = true;
    document.getElementById('application').hidden = false;
  } catch (cause) {
    console.error('No se ha podido cargar la aplicación:', cause);
    error.textContent = 'No se ha podido cargar la aplicación. Comprueba la conexión y recarga la página.';
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  submit.disabled = true;
  error.textContent = '';
  try {
    if (!globalThis.crypto?.subtle) throw new Error('El navegador no permite verificar la clave en esta conexión.');
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password.value));
    const digest = Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
    password.value = '';
    if (digest !== passwordDigest) {
      error.textContent = 'Clave incorrecta. Inténtalo de nuevo.';
      password.focus();
      return;
    }
    sessionStorage.setItem(sessionKey, 'open');
    await openApplication();
  } catch (cause) {
    console.error('No se ha podido abrir la sesión:', cause);
    error.textContent = 'No se ha podido abrir la sesión. Comprueba que el almacenamiento del navegador esté disponible y utiliza una conexión segura.';
  } finally {
    submit.disabled = false;
  }
});

try {
  if (sessionStorage.getItem(sessionKey) === 'open') openApplication();
} catch (cause) {
  console.error('No se ha podido consultar la sesión:', cause);
  error.textContent = 'No se ha podido consultar la sesión. Comprueba que el almacenamiento del navegador esté disponible.';
}
