import { useEffect, useState } from "react";
import "../../utils/__";
import { OInitBudget } from "../_administration_/_init_";
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
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { Load } from "../../utils/load";
import { ToastContainer, toast } from "react-toastify";

export const InitBudget = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState({ initbudget: false, Idbudget: 0 });

  const add = (e) => {
    setOpen({ ...open, initbudget: true, Idbudget: 0 });
  };

  const modify = (id) => {
    setOpen({ ...open, initbudget: true, Idbudget: id });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };

  const quit = (e) => {
    setOpen({ ...open, initbudget: false });
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.budgets)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 900);
    loadItems();
  }, [refresh]);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };

  return (
    <>
      {loading ? (
        <Load loading={loading} />
      ) : (
        <TFormList
          title="Liste des budgets"
          options={
            <TValidationButton add={add} print={print} refresh={rafraichir} />
          }
        >
          <TTable
            items={items}
            columns={[
              {
                name: "",
                render: (o) => setBabalScript(o.IdexerciceNavigation?.Code),
              },
              {
                name: "",
                render: (o) =>
                  setBabalScript(o.IdperiodeNavigation?.Codeperiode),
              },
              {
                name: "",
                render: (o) =>
                  new Date(o.IdperiodeNavigation?.Datedebut).toLocaleString(),
              },
              {
                name: "",
                render: (o) =>
                  new Date(o.IdperiodeNavigation?.Datefin).toLocaleString(),
              },
              {
                name: "",
                render: (o) =>
                  setBabalScript(o.IdnatureoperationNavigation?.Codenature),
              },
              { name: "Montantbudget" },
              { name: "Sensbudget" },
            ]}
            columnsDisplay={[
              "Exercice",
              "Période",
              "Date de Début",
              "Date de Fin",
              "Nature d'opération",
              "Montant( prévision )",
              "Sens",
            ]}
            lineClick={(o) => {
              modify(o.Idbudget);
            }}
          ></TTable>
        </TFormList>
      )}
      {open.initbudget && (
        <TModal>
          <EInitBudget
            addQuiHandler={quit}
            itemId={open.Idbudget}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const EInitBudget = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
}) => {
  const [item, setItem] = useState(OInitBudget);
  const notify = (msg) => toast.success(msg);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    item.Sensbudget === 0
      ? (item.Sensbudget = "Encaissement")
      : (item.Sensbudget = "Décaissement");

    if (item.Idbudget === 0) {
      //nouvel enregistrement
      delete item.Idbudget;
      await api(ENDPOINTS.budgets).post(item);
    } else {
      //modification
      await api(ENDPOINTS.budgets).put(item.Idbudget, item);
    }
    setItem({ ...OInitBudget });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
    notify("Budget ajoutée avec succès");
  };

  const remove = async (e) => {
    if (item.Idbudget === 0) return;
    const res = await api(ENDPOINTS.budgets).delete(item.Idbudget, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  const [exercice, setExercice] = useState([]);
  const [nature, setNature] = useState([]);
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

  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => setNature(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setItem({ ...OInitBudget });
    if (itemId !== 0) {
      api(ENDPOINTS.budgets)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
    loadItemsNature();
    loadItemsExercice();
    loadItemsPeriode();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <TFormulaire
        title="Nouveau budget"
        valPanel={
          <TValidationButton
            add={save}
            addLabel={itemId == 0 ? "Ajouter" : "Modifier"}
            remove={(e) => (item.Idbudget !== 0 ? remove() : undefined)}
            cancel={addQuiHandler}
          />
        }
      >
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
        <TSelect
          label="Nature d'opération"
          name="Idnatureoperation"
          items={nature}
          columnId="Idnatureoperation"
          columnDisplay="Codenature"
          value={item.Idnatureoperation}
          maxlength={60}
          addChange={changeHandler}
        />
        <TLayout cols="1fr 1fr">
          <TInput
            label="Montant"
            name="Montantbudget"
            value={item.Montantbudget}
            maxlength={60}
            addChange={changeHandler}
          />
          <TSelect
            label="Sens "
            name="Sensbudget"
            items={[
              { value: 0, label: "Encaissement" },
              { value: 1, label: "Décaissement" },
            ]}
            columnId="value"
            columnDisplay="label"
            value={item.Sensbudget}
            addChange={changeHandler}
          />
        </TLayout>

        {children}
      </TFormulaire>
    </>
  );
};
