import React, { useEffect, useState } from "react";
import {
  TFormulaire,
  TInput,
  TLayout,
  TSelect,
  TValidationButton,
} from "../../utils/__";
import { OOperation } from "../_administration_/_init_";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import { ToastContainer, toast } from "react-toastify";

export const OperationCaisse = ({ children, sens = 0 }) => {
  const objString = localStorage.getItem("myData");
  const obj = JSON.parse(objString);

  let etatCaisse = 0;
  obj == null ? (etatCaisse = 0) : (etatCaisse = 1);
  const notify = (msg) => toast.warning(msg);
  const notifySuccess = (msg) => toast.success(msg);

  if (typeof etatCaisse === "number" && etatCaisse === 0) {
    notify("Veuillez ouvrir une caisse");
  }

  useEffect(() => {
    console.log("myParameter has changed:", sens);
  }, [sens]);

  const [items, setItems] = useState([
    {
      c6: `${sens === 0 ? "Encaissement" : "Décaissement"}`,
    },
  ]);

  const [item, setItem] = useState(OOperation);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    // Récupération de la chaîne JSON depuis le localStorage
    const objString = localStorage.getItem("myData");
    const obj = JSON.parse(objString);
    item.Idcaisse = obj.caisse;
    item.Idexercice = obj.exercice;
    item.Idperiode = obj.periode;
    item.Idpersonnel = obj.personel;

    sens === 0 ? (item.Sens = "Encaissement") : (item.Sens = "Décaissment");
    item.Etat = "OP";
    delete item.Idoperation;
    delete item.Regularise;
    delete item.Controlerpar;
    try {
      await api(ENDPOINTS.operations)
        .post(item)
        .then((result) => notifySuccess(result.data));
    } catch (error) {}
    setItem({ ...OOperation });
    notifySuccess("Opération enregistrées avec succès");
  };

  const [nature, setNature] = useState([]);

  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => {
        let temp = res.data;
        temp = temp.filter(
          (o) =>
            (o.Sensnature == sens || o.Sensnature == 2) && o.Typenature == 0
        );
        setNature(temp);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItemsNature();
  }, [sens]);

  return (
    <>
      <TFormulaire
        title={`Enregistrer un ${sens === 0 ? "encaissement" : "décaissement"}`}
        valPanel={<TValidationButton save={save} />}
      >
        <TLayout cols="1fr 1fr 1fr 1fr">
          <TSelect
            label="Nature de l'opération"
            name="Idnatureoperation"
            items={nature}
            columnId="Idnatureoperation"
            columnDisplay="Codenature"
            value={item.Idnatureoperation}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            type="textarea"
            label="Description de l'opération"
            name="Description"
            value={item.Description}
            addChange={changeHandler}
          />
          <TInput
            label="Montant de l'opération"
            name="Montant"
            value={item.Montant}
            maxlength={60}
            type="number"
            addChange={changeHandler}
          />
          <TInput
            label="Date de création"
            name="Dateoperation"
            value={item.Dateoperation}
            type="date"
            addChange={changeHandler}
          />
        </TLayout>
        {children}
      </TFormulaire>

      <ToastContainer
        autoClose={1800}
        position="top-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
