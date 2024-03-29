import { useEffect, useState } from "react";
import { OExercice, OPeriode } from "./_init_";
import {
  TFormulaire,
  TLayout,
  TModal,
  TInput,
  TSelect,
  TTable,
  TValidationButton,
  TFormList,
} from "../../utils/__";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { jsonDateConvert, notifyError, notifySuccess } from "../../utils/utils";
import { Load } from "../../utils/load";
import { ToastContainer, toast } from "react-toastify";

export const Exercices = ({ children }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  //
  const [open, setOpen] = useState({
    exercice: false,
    Idexercice: 0,
    codeExercie: "",
  });

  const add = (e) => {
    setOpen({ ...open, exercice: true, Idexercice: 0 });
  };

  const modify = (id, code) => {
    setOpen({ ...open, exercice: true, Idexercice: id, codeExercie: code });
    //<Periodes id={id} />;
  };

  const print = (e) => {
    console.log("Impression");
  };

  const quit = (e) => {
    setOpen({ ...open, exercice: false });
  };

  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    loadItems();
  }, [refresh]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <TFormList
        title="Liste des exercices"
        options={
          <TValidationButton add={add} print={print} refresh={rafraichir} />
        }
      >
        <TTable
          items={items}
          columns={[
            { name: "Code" },
            {
              name: "Datedebut",
              render: (o) => new Date(o.Datedebut).toLocaleString(),
            },
            {
              name: "Datefin",
              render: (o) => new Date(o.Datefin).toLocaleString(),
            },
            { name: "Statut", render: (o) => (o.Statut ? "En cours" : "") },
            { name: "Cloture", render: (o) => (o.Cloture ? "Oui" : "Non") },
          ]}
          columnsDisplay={[
            "Code",
            "Date de Début",
            "Date de Fin",
            "Statut",
            "Cloturé",
          ]}
          lineClick={(o) => {
            modify(o.Idexercice, o.Code);
          }}
        ></TTable>
      </TFormList>
      {open.exercice && (
        <TModal>
          <EExercices
            itemId={open.Idexercice}
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
      <Periodes id={open.Idexercice} titre={open.codeExercie} />
    </>
  );
};

export const EExercices = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
}) => {
  const [item, setItem] = useState(OExercice);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const changeCheckboxHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.checked });
  };

  const save = async (e) => {
    try {
      if (item.Idexercice === 0) {
        //nouvel enregistrement
        delete item.Idexercice;
        await api(ENDPOINTS.exercices)
          .post(item)
          .then(() => notifySuccess("Exercice ajouté avec succès !"));
      } else {
        //modification
        await api(ENDPOINTS.exercices)
          .put(item.Idexercice, item)
          .then(() => notifySuccess("Exercice Modifié avec succès !"));
      }
    } catch (error) {
      // alert();
      notifyError(error.message);
    } finally {
      setItem(OExercice);
      if (addRefreshHandler) addRefreshHandler();
      if (addQuiHandler) addQuiHandler();
    }
  };

  const remove = async (e) => {
    if (item.Idexercice === 0) return;
    const res = await api(ENDPOINTS.exercices)
      .delete(item.Idexercice, item)
      .then(notifySuccess("Exercice supprimé avec succès !"));
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  useEffect(() => {
    setItem({ ...OExercice });
    if (itemId !== 0) {
      api(ENDPOINTS.exercices)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
  }, []);

  return (
    <>
      <TFormulaire
        title={itemId == 0 ? "Nouvel Exercice" : "Information sur l'exercice"}
        valPanel={
          <TValidationButton
            add={save}
            addLabel={itemId == 0 ? "Ajouter" : "Modifier"}
            cancel={addQuiHandler}
            remove={(e) => (item.Idexercice !== 0 ? remove() : undefined)}
          />
        }
      >
        <TInput
          label="Code"
          name="Code"
          value={item.Code}
          maxlength={60}
          addChange={changeHandler}
        />
        <TLayout cols="1fr 1fr">
          <TInput
            type="date"
            label="Date de début"
            name="Datedebut"
            value={jsonDateConvert(item.Datedebut)}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            type="date"
            label="Date de fin"
            name="Datefin"
            value={jsonDateConvert(item.Datefin)}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>

        <TInput
          label="En cours"
          type="checkbox"
          name="Statut"
          value={item.Statut}
          maxlength={60}
          addChange={changeCheckboxHandler}
        />
        <TInput
          label="Clôturer l'exercice"
          type="checkbox"
          name="Cloture"
          value={item.Cloture}
          maxlength={60}
          addChange={changeCheckboxHandler}
        />
        {children}
      </TFormulaire>
    </>
  );
};

export const Periodes = ({ children, id, titre }) => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState({ periode: false, Idperiode: 0 });
  const [refresh, setRefresh] = useState(false);

  const add = (e) => {
    setOpen({ ...open, periode: true, Idperiode: 0 });
  };

  const modify = (id) => {
    setOpen({ ...open, periode: true, Idperiode: id });
  };

  const quit = (e) => {
    setOpen({ ...open, periode: false, groupe: false });
  };

  const rafraichir = () => {
    loadItems(0);
    setRefresh(!refresh);
  };

  const loadItems = (i) => {
    if (i == 0) {
      setItems([]);
      return;
    }
    api(ENDPOINTS.periodesExercice)
      .fetchById(i)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems(id);
  }, [refresh, id]);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <TFormList
        title={"Liste des périodes : " + titre}
        options={<TValidationButton add={add} refresh={rafraichir} />}
      >
        <TTable
          items={items}
          columns={[
            {
              name: "",
              render: (o) => setBabalScript(o.IdexerciceNavigation?.Code),
            },
            { name: "Codeperiode" },
            {
              name: "Datedebut",
              render: (o) => new Date(o.Datedebut).toLocaleString(),
            },
            {
              name: "Datefin",
              render: (o) => new Date(o.Datefin).toLocaleString(),
            },
          ]}
          columnsDisplay={[
            "Exercice",
            "Code période",
            "Date de Début",
            "Date de Fin",
          ]}
          lineClick={(o) => {
            modify(o.Idperiode);
          }}
        ></TTable>
      </TFormList>
      {open.periode && (
        <TModal>
          <EPeriodes
            exerciceId={id}
            addQuiHandler={quit}
            itemId={open.Idperiode}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const EPeriodes = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
  exerciceId = 0,
}) => {
  const [item, setItem] = useState(OPeriode);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    if (item.Idperiode === 0) {
      //nouvel enregistrement
      delete item.Idperiode;
      await api(ENDPOINTS.periodes)
        .post(item)
        .then(() => notifySuccess("Période ajouté correctement !"));
    } else {
      //modification
      await api(ENDPOINTS.periodes)
        .put(item.Idperiode, item)
        .then(() => notifySuccess("Période modifié correctement !"));
    }
    setItem({ ...OPeriode });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.Idperiode === 0) return;
    const res = await api(ENDPOINTS.periodes)
      .delete(item.Idperiode, item)
      .then(notifySuccess("Période supprimé avec succès !"));
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  const [exos, setExos] = useState([]);

  const loadItems = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setExos(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // console.log("Code With Rochnel");
    setItem({ ...OPeriode, Idexercice: exerciceId });
    // alert(itemId);
    if (itemId !== 0) {
      api(ENDPOINTS.periodes)
        .fetchById(itemId)
        .then((res) => {
          console.log(itemId);
          setItem(res.data);
          // alert(JSON.stringify(res.data));
        })
        .catch((err) => alert(err));
    }
    loadItems();
  }, []);

  return (
    <TFormulaire
      title={itemId == 0 ? "Nouvelle période" : "Information sur la période"}
      valPanel={
        <TValidationButton
          add={save}
          addLabel={itemId == 0 ? "Ajouter" : "Modifier"}
          cancel={addQuiHandler}
          remove={(e) => (item.Idperiode !== 0 ? remove() : undefined)}
        />
      }
    >
      <TLayout cols="1fr 1fr">
        <TSelect
          label="Exercice"
          name="Idexercice"
          items={exos}
          columnId="Idexercice"
          columnDisplay="Code"
          value={item.Idexercice}
          addChange={changeHandler}
          disable={true}
        />
        <TInput
          label="Code période"
          name="Codeperiode"
          value={item.Codeperiode}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TLayout cols="1fr 1fr">
        <TInput
          type="date"
          label="Date de début"
          name="Datedebut"
          value={jsonDateConvert(item.Datedebut)}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de fin"
          name="Datefin"
          value={jsonDateConvert(item.Datefin)}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>
      {children}
    </TFormulaire>
  );
};
