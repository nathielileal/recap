export async function signUp(data: { email: string; username: string; password: string }) {
  console.log('Dados de cadastro:', data);
}

export async function signIn(data: { username: string; password: string }) {
  console.log('Dados de login:', data);
}
