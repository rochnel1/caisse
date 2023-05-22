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
import { jsonDateConvert } from "../../utils/utils";

export const Exercices = ({ children }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //
  const [open, setOpen] = useState({ exercice: false, idexercice: 0 });

  const add = (e) => {
    setOpen({ ...open, exercice: true, idexercice: 0 });
  };

  const modify = (id) => {
    setOpen({ ...open, exercice: true, idexercice: id });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };

  const quit = (e) => {
    setOpen({ ...open, exercice: false, groupe: false });
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
    // console.log("Code With Rochnel");
    loadItems();
  }, [refresh]);

  return (
    <>
      <TFormList
        title="Liste des exercices"
        options={
          <TValidationButton add={add} print={print} refresh={rafraichir} />
        }
      >
        <TTable
          items={items}
          columns={[
            { name: "code" },
            { name: "datedebut" },
            { name: "datefin" },
            { name: "statut" },
            { name: "cloture" },
          ]}
          columnsDisplay={[
            "Code",
            "Date de Début",
            "Date de Fin",
            "Statut",
            "Cloturé",
          ]}
          lineClick={(o) => {
            modify(o.idexercice);
          }}
        ></TTable>
      </TFormList>
      {open.exercice && (
        <TModal>
          <EExercices
            itemId={open.idexercice}
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
      <Periodes />
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
  console.log(item.idexercice);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    // console.log(itemId);
    console.log(item.idexercice);
    if (item.idexercice === 0) {
      //nouvel enregistrement
      delete item.idexercice;
      await api(ENDPOINTS.exercices).post(item);
    } else {
      //modification
      //await api(ENDPOINTS.exercices).put(item.idexercice, item);
    }
    setItem({ ...OExercice });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.idexercice === 0) return;
    const res = await api(ENDPOINTS.exercices).delete(item.idexercice, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  const loadItems = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setItem(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // console.log("Code With Rochnel");
    setItem({ ...OExercice });
    if (itemId !== 0) {
      api(ENDPOINTS.exercices)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
    loadItems();
  }, []);

  return (
    <TFormulaire
      title="Nouvel Exercice"
      valPanel={
        <TValidationButton
          add={save}
          cancel={addQuiHandler}
          remove={(e) => (item.idUtilisateur !== 0 ? remove() : undefined)}
        />
      }
    >
      <TInput
        label="Code"
        name="code"
        value={item.code}
        maxlength={60}
        addChange={changeHandler}
      />
      <TLayout cols="1fr 1fr">
        <TInput
          type="date"
          label="Date de début"
          name="datedebut"
          value={jsonDateConvert(item.datedebut)}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de fin"
          name="datefin"
          value={jsonDateConvert(item.datefin)}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TInput
        label="En cours"
        type="checkbox"
        name="statut"
        value={(item.statut = "En cours")}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Cloturé"
        name="cloture"
        items={[
          { value: "Non", label: "Non" },
          { value: "oui", label: "Oui" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={item.cloture}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};

export const Periodes = ({ children }) => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState({ periode: false, idperiode: 0 });
  const [refresh, setRefresh] = useState(false);

  const add = (e) => {
    setOpen({ ...open, periode: true, idperiode: 0 });
  };

  const modify = (id) => {
    setOpen({ ...open, periode: true, idperiode: id });
  };

  const quit = (e) => {
    setOpen({ ...open, periode: false, groupe: false });
  };

  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.periodes)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // console.log("Code With Rochnel");
    loadItems();
  }, [refresh]);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };
  return (
    <>
      <TFormList
        title="Liste des périodes"
        options={<TValidationButton add={add} refresh={rafraichir} />}
      >
        <TTable
          items={items}
          columns={[
            {
              name: "",
              render: (o) => setBabalScript(o.idexerciceNavigation?.code),
            },
            { name: "codeperiode" },
            { name: "datedebut" },
            { name: "datefin" },
          ]}
          columnsDisplay={[
            "Exercice",
            "Code période",
            "Date de Début",
            "Date de Fin",
          ]}
          lineClick={(o) => {
            modify(o.idperiode);
          }}
        ></TTable>
      </TFormList>
      {open.periode && (
        <TModal>
          <EPeriodes
            addQuiHandler={quit}
            itemId={open.idperiode}
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
}) => {
  const [item, setItem] = useState(OPeriode);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    if (item.idperiode === 0) {
      //nouvel enregistrement
      delete item.idperiode;
      await api(ENDPOINTS.periodes).post(item);
    } else {
      //modification
      await api(ENDPOINTS.periodes).put(item.idperiode, item);
    }
    setItem({ ...OPeriode });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.idperiode === 0) return;
    const res = await api(ENDPOINTS.periodes).delete(item.idperiode, item);
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
    setItem({ ...OPeriode });
    // alert(itemId);
    if (itemId !== 0) {
      api(ENDPOINTS.periodes)
        .fetchById(itemId)
        .then((res) => {
          console.log(res.data);
          setItem(res.data);
          // alert(JSON.stringify(res.data));
        })
        .catch((err) => alert(err));
    }
    loadItems();
  }, []);

  return (
    <TFormulaire
      title="Nouvelle période"
      valPanel={
        <TValidationButton
          add={save}
          cancel={addQuiHandler}
          remove={(e) => (item.idperiode !== 0 ? remove() : undefined)}
        />
      }
    >
      <TLayout cols="1fr 1fr">
        <TSelect
          label="Exercice"
          name="exercice"
          items={exos}
          columnId="idexercice"
          columnDisplay="code"
          value={item.idexercice}
          addChange={changeHandler}
        />
        <TInput
          label="Code période"
          name="codeperiode"
          value={item.codeperiode}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TLayout cols="1fr 1fr">
        <TInput
          type="date"
          label="Date de début"
          name="datedebut"
          value={jsonDateConvert(item.datedebut)}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de fin"
          name="datefin"
          value={jsonDateConvert(item.datefin)}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>
      {children}
    </TFormulaire>
  );
};
