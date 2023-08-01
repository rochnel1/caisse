import React, { useEffect, useState } from "react";
import { OUtilisateur } from "../_administration_/_init_";
import { styled } from "styled-components";
import {
  TFormulaire,
  TInput,
  TSelect,
  TValidationButton,
} from "../../utils/__";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import { Link } from "react-router-dom";

export const Register = ({}) => {
  const [item, setItem] = useState(OUtilisateur);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const [groupes, setGroupes] = useState([]);

  const loadItemsGroupes = () => {
    api(ENDPOINTS.groupeUtilisateur)
      .fetch()
      .then((res) => setGroupes(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItemsGroupes();
  }, []);

  useEffect(() => {
    // Get the user from the localStorage
    const user = localStorage.getItem("user");

    if (user) {
      setItem(item);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api(ENDPOINTS.utilisateurs)
      .fetch()
      .then((response) => {
        if (response.status === 200) {
          // Set the user to the localStorage
          localStorage.setItem("user", response.data);

          // Redirect the user to the home page
          window.location.href = "/";
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <div>
        <div className="card">
          <div className="card-header">
            <h1>S'inscrire</h1>
          </div>
          <div className="card-body">
            <TInput
              type="text"
              name="Login"
              value={item.Login}
              onChange={handleChange}
              placeholder="Login"
            />
            <TInput
              type="text"
              name="Nomutilisateur"
              value={item.Nomutilisateur}
              onChange={handleChange}
              placeholder="Nom(s)"
            />
            <TInput
              type="text"
              name="Prenomutilisateur"
              value={item.Prenomutilisateur}
              onChange={handleChange}
              placeholder="Prénom(s)"
            />
            <TInput
              type="password"
              name="Password"
              value={item.Password}
              onChange={handleChange}
              placeholder="Mot de passe"
            />
            <TSelect
              label="Groupe d'utilisateur"
              name="Idgpeutilisateur"
              items={groupes}
              columnId="Idgpeutilisateur"
              columnDisplay="Nomgroupe"
              value={item.Idgpeutilisateur}
              addChange={handleChange}
            />
          </div>
          <br />
          <button className="buttonAll" onClick={handleSubmit}>
            Se connecter
          </button>
          <br />
          <Link to="/login" className="centered">
            Vous avez déjà un compte ?{" "}
          </Link>
        </div>
      </div>
    </>
  );
};
