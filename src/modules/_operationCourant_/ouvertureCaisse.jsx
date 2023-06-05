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
import { OOperation, OOuvertureCaisse } from "../_administration_/_init_";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { RemoveCookie } from "../../utils/removeCookies";
import { SetCookie } from "../../utils/setCookies";

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

  const modify = (id) => {
    setOpen({ ...open, ouvertureCaisse: true, Idoperation: id });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.operations)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems();
    handleSave();
  }, [refresh]);

  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };

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
        options={<TValidationButton add={add} print={print} />}
      >
        {/* <TTable
          items={items}
          columns={[
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
            {
              name: "",
              render: (o) =>
                setBabalScript(o.IdpersonnelNavigation?.Codepersonnel),
            },
            {
              name: "",
              render: (o) => setBabalScript(o.IdexerciceNavigation?.Code),
            },
            {
              name: "",
              render: (o) => setBabalScript(o.IdperiodeNavigation?.Codeperiode),
            },
            {
              name: "",
              render: (o) =>
                setBabalScript(
                  o.IdcaisseNavigation?.IdcompteNavigation?.Numcompte
                ),
            },
          ]}
          columnsDisplay={[
            "Caisse",
            "Caissier",
            "Exercice",
            "Période",
            "Compte de caisse",
          ]}
          lineClick={(o) => {
            modify(o.Idoperation);
          }}
        ></TTable> */}
      </TFormList>
      {open.ouvertureCaisse && (
        <TModal>
          <EOuvertureCaisse
            addQuiHandler={quit}
            itemId={open.Idoperation}
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

  const save = async (e) => {
    if (item.Idoperation === 0) {
      //nouvel enregistrement
      delete item.IdUtilisateur;
      // await api(ENDPOINTS.operations).post(item);

      // Enregistrement de l'objet dans le localStorage
      const obj = {
        caisse: item.Idcaisse,
        personel: item.Idpersonnel,
        exercice: item.Idexercice,
        periode: item.Idperiode,
      };

      localStorage.setItem("myData", JSON.stringify(obj));
      //SetCookie("caisseData", JSON.stringify(obj));
    } else {
      //modification
      await api(ENDPOINTS.operations).put(item.Idoperation, item);
    }
    setItem({ ...OOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
    if (displayMessage) displayMessage();
  };

  const remove = async (e) => {
    if (item.Idoperation === 0) return;
    const res = await api(ENDPOINTS.operations).delete(item.Idoperation, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  const [caisse, setCaisse] = useState([]);
  const [personne, setPersonnel] = useState([]);
  const [exercice, setExercice] = useState([]);
  const [periode, setPeriode] = useState([]);

  const loadItemsExercice = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setExercice(res.data))
      .catch((err) => alert(err));
  };
  const loadItemsPeriode = () => {
    api(ENDPOINTS.periodes)
      .fetch()
      .then((res) => setPeriode(res.data))
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
      .then((res) => setPersonnel(res.data))
      .catch((err) => alert(err));
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
      valPanel={
        <TValidationButton
          save={save}
          remove={(e) => (item.Idoperation !== 0 ? remove() : undefined)}
          cancel={addQuiHandler}
        />
      }
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
          addChange={changeHandler}
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
