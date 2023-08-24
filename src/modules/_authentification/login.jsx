import React, { useState } from "react";
import { OUtilisateur } from "../_administration_/_init_";
import { TInput } from "../../utils/__";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export const Login = ({ children }) => {
  const [item, setItem] = useState(OUtilisateur);
  const notify = (msg) => toast.success(msg);
  const notifyWarn = (msg) => toast.warn(msg);
  const notifyError = (msg) => toast.error(msg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(item);
    if (item.Login == "" || item.Password == "") {
      notifyWarn("Veuillez remplir tous les champs");
    } else {
      try {
        const response = api(ENDPOINTS.authentification).post(item);

        console.log(await response);
        // Après avoir reçu le jeton d'authentification
        //Enregistrement du token dans le localStorage
        const token = (await response).data.Token;
        // Enregistrement de l'utilisateur dans le localStorage
        const obj = {
          personel: item.IdUtilisateur,
        };
        localStorage.setItem("myData", JSON.stringify(obj));

        //Changement d'état à login
        const objLog = {
          etat: "on",
        };
        localStorage.setItem("connexion", JSON.stringify(objLog));

        //Redirection vers l'accueil
        token === undefined
          ? notify("Login ou Mot de passe incorrect !")
          : (window.location.href = "/");
      } catch (error) {
        // console.error("Erreur lors de la connexion :", error);
        if (error.response && error.response.status === 401) {
          notifyError("Identifiants invalides");
        } else {
          notifyError("Une erreur s'est produite");
        }
      }
    }

    // Pour inclure le jeton dans les en-têtes de requête
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  };
  return (
    <>
      <ToastContainer />;
      <div>
        <div className="page">
          <div className="cover">
            <h2 className="centered"> Login</h2>
            <TInput
              type="text"
              name="Login"
              value={item.Login}
              addChange={handleChange}
              label="Login"
            />
            <TInput
              type="password"
              name="Password"
              value={item.Password}
              addChange={handleChange}
              label="Mot de passe"
            />
            <br />
            <div className="centered">
              <button className="buttonAll" onClick={handleSubmit}>
                Se connecter
              </button>
            </div>
            <br />
            <br />
            <Link to="/signUp" className="centered">
              <p className="text">Créer un compte </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
