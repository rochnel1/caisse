import React, { useState } from "react";
import { OUtilisateur } from "../_administration_/_init_";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { TFormulaire, TInput, TValidationButton } from "../../utils/__";

export const Login = ({}) => {
  const [item, setItem] = useState(OUtilisateur);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    // setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", item);
  };
  return (
    <>
      <div>
        <TFormulaire title="Connexion">
          <TInput
            type="text"
            name="Login"
            value={item.Login}
            onChange={handleChange}
            placeholder="Login"
          />
          <TInput
            type="password"
            name="Password"
            value={item.Password}
            onChange={handleChange}
            placeholder="Mot de passe"
          />
          <br />
          <button className="buttonAll" onClick={handleSubmit}>
            Se connecter
          </button>
        </TFormulaire>
        <br />
        <Link to="/signUp">S'inscrire</Link>
      </div>
    </>
  );
};
