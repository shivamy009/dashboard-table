export const login = (email, password) => {
    return 'mock-jwt-token';
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };