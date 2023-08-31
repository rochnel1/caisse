import React, { useEffect, useState } from "react";
import { OUtilisateur } from "../_administration_/_init_";
import { styled } from "styled-components";
import { TInput, TLayout, TSelect } from "../../utils/__";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = ({ children }) => {
  const [item, setItem] = useState(OUtilisateur);
  const notify = (msg) => toast.success(msg);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    delete item.IdUtilisateur;
    api(ENDPOINTS.utilisateurs).post(item);
    notify("Enregistrement éffectué avec succès !");
    setItem(...OUtilisateur);
  };
  return (
    <>
      <ToastContainer />;
      <div>
        <div className="page">
          <div className="cover">
            <h2 className="centered"> Nouvel utlisateur</h2>
            <TInput
              name="Login"
              value={item.Login}
              addChange={handleChange}
              label="Login"
            />
            <br />
            <TInput
              name="Nomutilisateur"
              value={item.Nomutilisateur}
              addChange={handleChange}
              label="Nom(s)"
            />
            <br />
            <TInput
              name="Prenomutilisateur"
              value={item.Prenomutilisateur}
              addChange={handleChange}
              label="Prénom(s)"
            />
            <br />
            <TInput
              type="password"
              name="Password"
              value={item.Password}
              addChange={handleChange}
              label="Mot de passe"
            />
            <br />
            <TSelect
              label="Groupe d'utilisateur"
              name="Idgpeutilisateur"
              items={groupes}
              columnId="Idgpeutilisateur"
              columnDisplay="Nomgroupe"
              value={item.Idgpeutilisateur}
              addChange={handleChange}
            />
            <br />
            <div className="centered">
              <button className="buttonAll" onClick={handleSubmit}>
                Enregistrer
              </button>
            </div>
            <br />
            <br />
            <Link to="/login" className="centered">
              <p className="text">Vous avez déjà un compte ? </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
