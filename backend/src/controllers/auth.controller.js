const signup = async (request, response) => {
  response.send("signup");
};

const login = async (request, response) => {
  response.send("login");
};

const logout = async (request, response) => {
  response.send("logout");
};

export { signup, login, logout };
