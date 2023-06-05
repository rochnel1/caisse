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
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import { jsonDateConvert } from "../../utils/utils";
import { GetCookie } from "../../utils/getCookies";

//sens : 0 pour encaissement et 1 pour décaissement
export const OperationCaisse = ({ children, sens = 0 }) => {
  // Récupération de la chaîne JSON depuis le localStorage
  const objString = localStorage.getItem("myData");

  // Conversion de la chaîne JSON en objet JavaScript
  const obj = JSON.parse(objString);

  useEffect(() => {
    console.log("myParameter has changed:", sens);
  }, [sens]);

  const [items, setItems] = useState([
    {
      c6: `${sens === 0 ? "Encaissement" : "Décaissement"}`,
    },
  ]);
  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState({
    frame: false,
    sens: sens,
    Idoperation: 0,
  });

  const add = (e) => {
    setOpen({ ...open, frame: true, sens: sens, Idoperation: 0 });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const modify = (id) => {
    // console.log(id);
    setOpen({ ...open, frame: true, Idoperation: id });
  };

  const quit = (e) => {
    setOpen({ ...open, frame: false });
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.operations)
      .fetch()
      .then((res) => {
        let temp = res.data;
        temp = temp.filter(
          (o) => o.Sens == (sens == 0 ? "Encaissement" : "Décaissment")
        );
        setItems(temp);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems();
  }, [refresh, sens]);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };

  return (
    <>
      <TFormList
        title={`Liste des ${sens == 0 ? "encaissements" : "décaissements"}`}
        options={
          <TValidationButton add={add} print={print} refresh={rafraichir} />
        }
      >
        <TTable
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
              name: "Dateoperation",
              render: (o) => new Date(o.Dateoperation).toLocaleString(),
            },
            { name: "Description" },
            { name: "Montant" },
            { name: "Sens" },
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
                setBabalScript(o.IdnatureoperationNavigation?.Codenature),
            },
            { name: "Etat" },
          ]}
          columnsDisplay={[
            "Caisse ",
            "Caissier",
            "Date de l'opération",
            "Description de l'opération",
            "Montant de l'opération",
            "Sens",
            "Exercice",
            "Période",
            "Nature d'opération",
            "Etat",
          ]}
          lineClick={(o) => {
            modify(o.Idoperation);
          }}
        ></TTable>
      </TFormList>

      {open.frame && (
        <TModal>
          <EOperationCaisse
            sens={open.sens}
            addQuiHandler={quit}
            itemId={open.Idoperation}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const EOperationCaisse = ({
  children,
  sens = 0,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
}) => {
  const [item, setItem] = useState(OOperation);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    console.log(itemId);
    console.log(item.Idoperation);

    // Récupération de la chaîne JSON depuis le localStorage
    const objString = localStorage.getItem("myData");
    //const objString = GetCookie("caisseData");

    // Conversion de la chaîne JSON en objet JavaScript
    const obj = JSON.parse(objString);
    item.Idcaisse = obj.caisse;
    item.Idexercice = obj.exercice;
    item.Idperiode = obj.periode;
    item.Idpersonnel = obj.personel;

    sens === 0 ? (item.Sens = "Encaissement") : (item.Sens = "Décaissment");
    item.Etat = "OP";

    if (item.Idoperation === 0) {
      //nouvel enregistrement
      item.Dateoperation = new Date();
      delete item.Idoperation;
      await api(ENDPOINTS.operations).post(item);
    } else {
      //modification
      await api(ENDPOINTS.operations).put(item.Idoperation, item);
    }
    setItem({ ...OOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.Idoperation === 0) return;
    const res = await api(ENDPOINTS.operations).delete(item.Idoperation, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
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
    setItem({ ...OOperation });
    if (itemId !== 0) {
      api(ENDPOINTS.operations)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
    loadItemsNature();
  }, []);

  return (
    <>
      <TFormulaire
        title={`Enregistrer un ${sens === 0 ? "encaissement" : "décaissement"}`}
        valPanel={
          <TValidationButton
            save={save}
            remove={(e) => (item.Idoperation !== 0 ? remove() : undefined)}
            cancel={addQuiHandler}
          />
        }
      >
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
          addChange={changeHandler}
        />

        {children}
      </TFormulaire>
      {children}
    </>
  );
};
