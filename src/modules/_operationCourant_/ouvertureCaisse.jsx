import React, { useState } from "react";
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
import { OOuvertureCaisse } from "../_administration_/_init_";

export const OuvertureCaisse = ({ children }) => {
  const [items, setItems] = useState([
    {
      c1: "CAISSE_PRINCIPALE",
      c2: "Charline",
      c3: 2023,
      c4: "MAI",
      c5: "57xxxx",
    },
  ]);

  const [open, setOpen] = useState({
    ouvertureCaisse: false,
  });
  const add = (e) => {
    setOpen({ ...open, ouvertureCaisse: true });
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
    setOpen({ ...open, ouvertureCaisse: false });
  };
  return (
    <>
      <TFormList
        title="Liste des caisses ouvertes"
        options={<TValidationButton add={add} print={print} remove={remove} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4", "c5"]}
          columnsDisplay={[
            "Caisse",
            "Caissier",
            "Exercice",
            "Période",
            "Compte de caisse",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.ouvertureCaisse && (
        <TModal>
          <EOuvertureCaisse addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EOuvertureCaisse = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OOuvertureCaisse);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire
      title="Ouverture d'une caisse"
      valPanel={<TValidationButton save={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr">
        <TSelect
          label="Caisse"
          name="caisse"
          items={[{ value: false, label: "CAISSE_PRINCIPALE" }]}
          columnId="value"
          columnDisplay="label"
          value={item.caisse}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Caissier"
          name="caissier"
          items={[
            { value: false, label: "Charline" },
            { value: true, label: "Phirmin" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.caissier}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

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
          name="periode"
          items={[
            { value: false, label: "Avril" },
            { value: true, label: "Mai" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.periode}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TInput
        label="Compte de la caisse"
        name="compte_caisse"
        value={item.compte_caisse}
        maxlength={60}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
