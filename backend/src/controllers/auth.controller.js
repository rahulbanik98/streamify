const signup = async (request, response) => {
  const {email, password, fullName} = request.body;
};

const login = async (request, response) => {
  response.send("login");
};

const logout = async (request, response) => {
  response.send("logout");
};

export { signup, login, logout };
