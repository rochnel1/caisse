import React, { useEffect, useState } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TLayout,
  TModal,
  TSelect,
  TTable,
  TValidationButton,
} from "../../utils/__";
import { OOperation } from "../_administration_/_init_";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";

export const OuvertureCaisse = ({ children }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState({
    ouvertureCaisse: false,
    Idoperation: 0,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const add = (e) => {
    setOpen({ ...open, ouvertureCaisse: true, Idoperation: 0 });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    // loadItems();
    handleSave();
  }, [refresh]);

  const quit = (e) => {
    setOpen({ ...open, ouvertureCaisse: false });
  };

  const handleSave = () => {
    const objString = localStorage.getItem("myData");
    const obj = JSON.parse(objString);
    obj !== null ? setShowSuccessMessage(true) : setShowSuccessMessage(false);
  };

  return (
    <>
      <TFormList
        title="Ouverture de Caisses"
        options={<TValidationButton ouvrir={add} print={print} />}
      ></TFormList>
      {open.ouvertureCaisse && (
        <TModal>
          <EOuvertureCaisse
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
            displayMessage={handleSave}
          />
        </TModal>
      )}
      <br />

      {showSuccessMessage && (
        <div className="success-message">Caisse Ouverte !</div>
      )}
      {!showSuccessMessage && (
        <div className="none-message">Aucune Caisse n'est ouverte !</div>
      )}
    </>
  );
};

export const EOuvertureCaisse = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
  displayMessage,
}) => {
  const [item, setItem] = useState(OOperation);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const changeHandlerExercie = (e) => {
    let temp = cPeriode;
    temp = temp.filter(
      (o) => o.IdexerciceNavigation.Idexercice == e.target.value
    );
    let Obj = item;
    Obj[e.target.name] = e.target.value;
    Obj["Idperiode"] = "";
    setItem({ ...item, [e.target.name]: e.target.value, Idperiode: "" });
    setPeriode(temp);
  };

  const save = async (e) => {
    // Enregistrement de l'objet dans le localStorage
    const obj = {
      caisse: item.Idcaisse,
      personel: item.Idpersonnel,
      exercice: item.Idexercice,
      periode: item.Idperiode,
    };

    localStorage.setItem("myData", JSON.stringify(obj));
    setItem({ ...OOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
    if (displayMessage) displayMessage();
  };

  const [caisse, setCaisse] = useState([]);
  const [personne, setPersonnel] = useState([]);
  const [exercice, setExercice] = useState([]);
  const [periode, setPeriode] = useState([]);
  const [cPeriode, setCPeriode] = useState([]);

  const loadItemsExercice = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setExercice(res.data))
      .catch((err) => alert(err));
  };
  const loadItemsPeriode = () => {
    api(ENDPOINTS.periodes)
      .fetch()
      .then((res) => {
        setCPeriode([...res.data]);
        // console.log(res.data);
      })
      .catch((err) => alert(err));
  };
  const loadItemsCaisse = () => {
    api(ENDPOINTS.caisses)
      .fetch()
      .then((res) => setCaisse(res.data))
      .catch((err) => alert(err));
  };
  const loadItemsPersonnel = () => {
    api(ENDPOINTS.personnels)
      .fetch()
      .then((res) => {
        let temp = res.data;
        temp = temp.filter((o) => o.Profil == "Caissier");
        setPersonnel(temp);
      });
  };

  useEffect(() => {
    setItem({ ...OOperation });
    if (itemId !== 0) {
      api(ENDPOINTS.operations)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
    loadItemsExercice();
    loadItemsPeriode();
    loadItemsCaisse();
    loadItemsPersonnel();
  }, []);

  return (
    <TFormulaire
      title="Ouverture d'une caisse"
      valPanel={<TValidationButton save={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr">
        <TSelect
          label="Caisse"
          name="Idcaisse"
          items={caisse}
          columnId="Idcaisse"
          columnDisplay="Codecaisse"
          value={item.Idcaisse}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Caissier"
          name="Idpersonnel"
          items={personne}
          columnId="Idpersonnel"
          columnDisplay="Codepersonnel"
          value={item.Idpersonnel}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TLayout cols="1fr 1fr">
        <TSelect
          label="Exercice"
          name="Idexercice"
          items={exercice}
          columnId="Idexercice"
          columnDisplay="Code"
          value={item.Idexercice}
          maxlength={60}
          addChange={changeHandlerExercie}
        />
        <TSelect
          label="Période"
          name="Idperiode"
          items={periode}
          columnId="Idperiode"
          columnDisplay="Codeperiode"
          value={item.Idperiode}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      {children}
    </TFormulaire>
  );
};
