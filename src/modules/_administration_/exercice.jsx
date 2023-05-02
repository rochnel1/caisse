import { useState } from "react";
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

export const Exercices = ({ children }) => {
  const [itemsExo, setItemsExo] = useState([
    { c1: 2013, c2: "01/01/2013", c3: "31/12/2013", c4: "En cours", c5: "Oui" },
    { c1: 2013, c2: "01/01/2013", c3: "31/12/2013", c4: "En cours", c5: "Oui" },
    { c1: 2013, c2: "01/01/2013", c3: "31/12/2013", c4: "En cours", c5: "Oui" },
    { c1: 2013, c2: "01/01/2013", c3: "31/12/2013", c4: "En cours", c5: "Oui" },
  ]);
  //
  const [open, setOpen] = useState({ exercice: false });

  const add = (e) => {
    setOpen({ ...open, exercice: true });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const remove = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Suppression");
  };

  const quit = (e) => {
    setOpen({ ...open, exercice: false });
  };

  return (
    <>
      <TFormList
        title="Liste des exercices"
        options={<TValidationButton add={add} remove={remove} print={print} />}
      >
        <TTable
          items={itemsExo}
          columns={["c1", "c2", "c3", "c4", "c5"]}
          columnsDisplay={[
            "Code",
            "Date de Début",
            "Date de Fin",
            "Statut",
            "Cloturé",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.exercice && (
        <TModal>
          <EExercices addQuiHandler={quit} />
        </TModal>
      )}
      <Periodes />
    </>
  );
};

export const Periodes = ({ children }) => {
  const [items, setItems] = useState([
    { c1: 2013, c2: "Avril", c3: "01/01/2013", c4: "31/12/2013" },
  ]);
  const [open, setOpen] = useState({ periode: false });

  const add = (e) => {
    setOpen({ ...open, periode: true });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const remove = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Suppression");
  };

  const quit = (e) => {
    setOpen({ ...open, periode: false });
  };

  return (
    <>
      <TFormList
        title="Liste des périodes"
        options={<TValidationButton add={add} remove={remove} print={print} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4"]}
          columnsDisplay={[
            "Exercice",
            "Code période",
            "Date de Début",
            "Date de Fin",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.periode && (
        <TModal>
          <EPeriodes addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EExercices = ({ children, addQuiHandler }) => {
  const [itemExo, setItemExo] = useState(OExercice);
  const changeHandler = (e) => {
    setItemExo({ ...itemExo, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(itemExo);
  };
  return (
    <TFormulaire
      title="Nouvel Exercice"
      valPanel={<TValidationButton add={save} cancel={addQuiHandler} />}
    >
      <TInput
        label="Code"
        name="code"
        value={itemExo.code}
        maxlength={60}
        addChange={changeHandler}
      />
      <TLayout cols="1fr 1fr">
        <TInput
          type="date"
          label="Date de début"
          name="date_debut"
          value={itemExo.date_debut}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de fin"
          name="date_fin"
          value={itemExo.date_fin}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TInput
        label="En cours"
        type="checkbox"
        name="statut"
        value={(itemExo.statut = "En cours")}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Cloturé"
        name="cloture"
        items={[
          { value: false, label: "Non" },
          { value: true, label: "Oui" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={itemExo.cloture}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};

export const EPeriodes = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OPeriode);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire
      title="Nouvelle période"
      valPanel={<TValidationButton add={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr">
        <TSelect
          label="Exercice"
          name="exercice"
          items={[
            { value: false, label: "2022" },
            { value: true, label: "2023" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.exercice}
          addChange={changeHandler}
        />
        <TInput
          label="Code période"
          name="code_periode"
          value={item.code_periode}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TLayout cols="1fr 1fr">
        <TInput
          type="date"
          label="Date de début"
          name="date_debut"
          value={item.date_debut}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de fin"
          name="date_fin"
          value={item.date_fin}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>
      {children}
    </TFormulaire>
  );
};
