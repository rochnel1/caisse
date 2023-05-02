import { useState } from "react";
import { OCaisse } from "./_init_";
import {
  TFormulaire,
  TModal,
  TInput,
  TTable,
  TValidationButton,
  TFormList,
  TSelect,
} from "../../utils/__";

export const Caisses = ({ children }) => {
  const [items, setItems] = useState([
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
  ]);
  //
  const [open, setOpen] = useState({ caisse: false });

  const add = (e) => {
    setOpen({ ...open, caisse: true });
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
    setOpen({ ...open, caisse: false });
  };

  return (
    <>
      <TFormList
        title="Liste des Caisses"
        options={<TValidationButton add={add} print={print} remove={remove} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4"]}
          columnsDisplay={[
            "Code",
            "Description",
            "Compte Général",
            "Journal Comptable",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.caisse && (
        <TModal>
          <ECaisse addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const ECaisse = ({ children, addQuiHandler }) => {
  const [itemCaisse, setItemCaisse] = useState(OCaisse);
  const changeHandler = (e) => {
    setItemCaisse({ ...itemCaisse, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(itemCaisse);
  };

  return (
    <TFormulaire
      title="Nouvelle Caisse"
      valPanel={<TValidationButton add={save} cancel={addQuiHandler} />}
    >
      <TInput
        label="Code"
        name="code"
        value={itemCaisse.code}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Description"
        name="description"
        value={itemCaisse.description}
        maxlength={60}
        addChange={changeHandler}
      />

      <TSelect
        label="Compte Général"
        name="compteGeneral"
        items={[
          { value: false, label: "CAIS" },
          // { value: true, label: "Oui" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={itemCaisse.compteGeneral}
        addChange={changeHandler}
      />
      <TSelect
        label="Journal Comptable"
        name="journalCompta"
        items={[
          { value: false, label: "57xxxx" },
          // { value: true, label: "Oui" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={itemCaisse.journalCompta}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
