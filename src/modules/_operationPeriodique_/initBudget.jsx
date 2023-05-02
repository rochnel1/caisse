import { useState } from "react";
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

export const InitBudget = ({ children }) => {
  const [items, setItems] = useState([
    {
      c1: 2013,
      c2: "Avril",
      c3: "02/01/2013",
      c4: "02/03/2013",
      c5: "FRAIS_TAXI",
      c6: "10000",
      c7: "Décaissement",
    },
    {
      c1: 2013,
      c2: "Mai",
      c3: "02/05/2013",
      c4: "31/03/2013",
      c5: "LOYER",
      c6: "75000",
      c7: "Décaissement",
    },
  ]);
  //
  const [open, setOpen] = useState({ initbudget: false });

  const add = (e) => {
    setOpen({ ...open, initbudget: true });
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
    setOpen({ ...open, initbudget: false });
  };

  return (
    <>
      <TFormList
        title="Liste des budgets"
        options={
          <TValidationButton add={add} print={print} removeAll={remove} />
        }
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4", "c5", "c6", "c7"]}
          columnsDisplay={[
            "Exercice",
            "Période",
            "Date de Début",
            "Date de Fin",
            "Nature d'opération",
            "Montant( prévision )",
            "Sens",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.initbudget && (
        <TModal>
          <EInitBudget addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EInitBudget = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OInitBudget);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire
      title="Nouveau budget"
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
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Période"
          name="code"
          items={[
            { value: false, label: "Mai" },
            { value: true, label: "Juin" },
            { value: true, label: "Juillet" },
            { value: true, label: "Août" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.code}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>
      <TSelect
        label="Nature d'opération"
        name="nature_operation"
        items={[
          { value: false, label: "FRAIS_TAXI" },
          { value: true, label: "LOYER" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={item.nature_operation}
        maxlength={60}
        addChange={changeHandler}
      />
      <TLayout cols="1fr 1fr">
        <TInput
          label="Montant"
          name="montant"
          value={item.montant}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Sens "
          name="sens"
          items={[
            { value: false, label: "Encaissement" },
            { value: true, label: "Décaissement" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.sens}
          addChange={changeHandler}
        />
      </TLayout>

      {children}
    </TFormulaire>
  );
};
