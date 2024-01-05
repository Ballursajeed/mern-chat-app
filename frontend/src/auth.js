
export const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  const token = localStorage.getItem('jwtToken'); // Assuming you store the token in localStorage

  if (token) {

      return true;

  }

  return null;
};
