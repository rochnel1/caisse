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

//sens : 0 pour encaissement et 1 pour décaissement
export const OperationCaisse = ({ children, sens = 0 }) => {
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
    IdOperation: 0,
  });

  const add = (e) => {
    setOpen({ ...open, frame: true, sens: sens, IdOperation: 0 });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const modify = (id) => {
    // console.log(id);
    setOpen({ ...open, frame: true, IdOperation: id });
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
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems();
  }, [refresh]);

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
            { name: "Dateoperation" },
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
            {
              name: "",
              render: (o) =>
                setBabalScript(o.IdnatureoperationNavigation?.Numcompte),
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
            "Compte général associé",
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
            itemId={open.IdOperation}
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

  console.log("Id de l'item :" + itemId);
  const save = async (e) => {
    sens === 0 ? (item.Sens = "Encaissement") : (item.Sens = "Décaissment");

    if (item.IdOperation === 0) {
      //nouvel enregistrement
      delete item.IdOperation;
      await api(ENDPOINTS.operations).post(item);
    } else {
      //modification
      await api(ENDPOINTS.operations).put(item.IdOperation, item);
    }
    setItem({ ...OOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();

    // console.log(item);
  };

  const remove = async (e) => {
    if (item.IdOperation === 0) return;
    const res = await api(ENDPOINTS.operations).delete(item.IdOperation, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  const [nature, setNature] = useState([]);
  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => setNature(res.data))
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
            remove={(e) => (item.IdOperation !== 0 ? remove() : undefined)}
            cancel={addQuiHandler}
          />
        }
      >
        <TLayout cols="1fr 1fr ">
          <TInput
            label="Description de l'opération"
            name="Description"
            value={item.Description}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Montant de l'opération"
            name="Montant"
            value={item.Montant}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>

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

        <TLayout cols="1fr 1fr 1fr">
          <TInput
            label="Compte général associé à la nature"
            name="IdcompteNavigation"
            value={item.Idnatureoperation}
            maxlength={60}
            // addChange={changeHandler}
          />
          <TInput
            label="Compte de la caisse"
            name="compte_caisse"
            value={item.compte_caisse}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Etat"
            name="etat"
            value={(item.Etat = "OP")}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>

        {children}
      </TFormulaire>
      {children}
    </>
  );
};
