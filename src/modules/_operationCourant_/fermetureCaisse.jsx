import React, { useEffect, useState } from "react";
import { TFormList, TTable, TValidationButton } from "../../utils/__";
import { GetCookie, GetCookies } from "../../utils/getCookies";
import { RemoveCookie } from "../../utils/removeCookies";

export const FermetureCaisse = ({ children }) => {
  const objString = localStorage.getItem("myData");
  const obj = JSON.parse(objString);

  const [showCloseMessage, setShowCloseMessage] = useState(false);
  const [items, setItems] = useState([]);
  //
  useEffect(() => {
    handleClose();
  }, []);

  const handleClose = () => {
    obj !== null ? setShowCloseMessage(false) : setShowCloseMessage(true);
  };

  const close = (e) => {
    // Récupération de la chaîne JSON depuis le localStorage
    localStorage.removeItem("myData");
    //RemoveCookie("caisseData");
    setShowCloseMessage(true);
  };

  return (
    <>
      <TFormList
        title="Fermeture de la caisse"
        options={<TValidationButton close={close} />}
      ></TFormList>
      <br />
      {showCloseMessage && <div className="close-message">Caisse Fermée !</div>}
      {!showCloseMessage && (
        <div className="success-message">Caisse Ouverte !</div>
      )}
    </>
  );
};
