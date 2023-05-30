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

export const OuvertureCaisse = ({ children }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState({
    ouvertureCaisse: false,
    IdOperation: 0,
  });
  const add = (e) => {
    setOpen({ ...open, ouvertureCaisse: true, IdOperation: 0 });
  };

  const modify = (id) => {
    setOpen({ ...open, ouvertureCaisse: true, IdOperation: id });
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
  }, [refresh]);

  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };
  const quit = (e) => {
    setOpen({ ...open, ouvertureCaisse: false });
  };
  return (
    <>
      <TFormList
        title="Liste des caisses ouvertes"
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
            modify(o.IdOperation);
          }}
        ></TTable>
      </TFormList>
      {open.ouvertureCaisse && (
        <TModal>
          <EOuvertureCaisse
            addQuiHandler={quit}
            itemId={open.IdOperation}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const EOuvertureCaisse = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
}) => {
  const [item, setItem] = useState(OOperation);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    console.log(item);
    if (item.IdOperation === 0) {
      //nouvel enregistrement
      delete item.IdUtilisateur;
      await api(ENDPOINTS.operations).post(item);
    } else {
      //modification
      await api(ENDPOINTS.operations).put(item.IdOperation, item);
    }
    setItem({ ...OOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.IdOperation === 0) return;
    const res = await api(ENDPOINTS.operations).delete(item.IdOperation, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  const [caisse, setCaisse] = useState([]);
  const [personne, setPersonne] = useState([]);
  const [exercice, setExercice] = useState([]);
  const [periode, setPeriode] = useState([]);

  useEffect(() => {
    setItem({ ...OOperation });
    if (itemId !== 0) {
      api(ENDPOINTS.operations)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
  }, []);

  return (
    <TFormulaire
      title="Ouverture d'une caisse"
      valPanel={
        <TValidationButton
          save={save}
          remove={(e) => (item.IdOperation !== 0 ? remove() : undefined)}
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
