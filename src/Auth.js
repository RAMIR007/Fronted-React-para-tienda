import React, { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://127.0.0.1:8000/api/auth/jwt/create/"
      : "http://127.0.0.1:8000/api/auth/users/";
    const method = isLogin ? "POST" : "POST";
    const body = isLogin
      ? JSON.stringify({ email, password })
      : JSON.stringify({ email, password, re_password: password });
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          setMessage("Login exitoso");
          localStorage.setItem("token", data.access);
        } else if (data.id) {
          setMessage("Registro exitoso, puedes iniciar sesión");
          setIsLogin(true);
        } else {
          setMessage("Error: " + JSON.stringify(data));
        }
      })
      .catch(() => setMessage("Error en la comunicación"));
  };

  return (
    <div>
      <h2>{isLogin ? "Iniciar Sesión" : "Registrar"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Entrar" : "Registrar"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Crear cuenta" : "Ya tengo cuenta"}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Auth;
