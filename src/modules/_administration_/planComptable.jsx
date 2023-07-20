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
import { OPlanComptable } from "./_init_";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import { Load } from "../../utils/load";

export const PlanComptable = () => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState({
    planComptable: false,
    Idcompte: 0,
  });
  const [loading, setLoading] = useState(false);

  const add = (e) => {
    setOpen({ ...open, planComptable: true, Idcompte: 0 });
  };
  const modify = (id) => {
    setOpen({ ...open, planComptable: true, Idcompte: id });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };

  const quit = (e) => {
    setOpen({ ...open, planComptable: false });
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.compteGenerals)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    loadItems();
  }, [refresh]);
  return (
    <>
      {loading ? (
        <Load loading={loading} />
      ) : (
        <TFormList
          title="Liste des comptes généraux"
          options={
            <TValidationButton add={add} print={print} refresh={rafraichir} />
          }
        >
          <TTable
            items={items}
            columns={[{ name: "Numcompte" }, { name: "Intitule" }]}
            columnsDisplay={["N° de Compte", "Intitulé"]}
            lineClick={(o) => {
              modify(o.Idcompte);
            }}
          ></TTable>
        </TFormList>
      )}
      {open.planComptable && (
        <TModal>
          <EPlanComptable
            itemId={open.Idcompte}
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const EPlanComptable = ({
  children,
  itemId = 0,
  addRefreshHandler,
  addQuiHandler,
}) => {
  const [item, setItem] = useState(OPlanComptable);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  console.log(item.Idcompte);

  const save = async (e) => {
    if (item.Idcompte === 0) {
      //nouvel enregistrement
      delete item.Idcompte;
      //console.log(item)
      await api(ENDPOINTS.compteGenerals).post(item);
    } else {
      //modification
      await api(ENDPOINTS.compteGenerals).put(item.Idcompte, item);
    }
    setItem({ ...OPlanComptable });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.Idcompte === 0) return;
    const res = await api(ENDPOINTS.compteGenerals).delete(item.Idcompte, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  useEffect(() => {
    // console.log("Code With Rochnel");
    setItem({ ...OPlanComptable });
    if (itemId !== 0) {
      api(ENDPOINTS.compteGenerals)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
  }, []);

  return (
    <TFormulaire
      title="Nouveau compte général"
      valPanel={
        <TValidationButton
          add={save}
          addLabel={itemId == 0 ? "Ajouter" : "Modifier"}
          remove={(e) => (item.Idcompte !== 0 ? remove() : undefined)}
          cancel={addQuiHandler}
        />
      }
    >
      <TLayout cols="1fr 1fr">
        <TInput
          label="N° de compte"
          name="Numcompte"
          value={item.Numcompte}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Intitulé"
          name="Intitule"
          value={item.Intitule}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>
      {children}
    </TFormulaire>
  );
};
