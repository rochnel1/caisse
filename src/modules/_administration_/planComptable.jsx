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
import { OPlanComptable } from "./_init_";

export const PlanComptable = () => {
  const [items, setItems] = useState([
    {
      c1: "58xxxx",
      c2: "Caisse1",
    },
    {
      c1: "47xxxx",
      c2: "Caisse2",
    },
  ]);

  const [open, setOpen] = useState({ planComptable: false });

  const add = (e) => {
    setOpen({ ...open, planComptable: true });
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
    setOpen({ ...open, planComptable: false });
  };

  return (
    <>
      <TFormList
        title="Liste des comptes généraux"
        options={<TValidationButton add={add} print={print} remove={remove} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2"]}
          columnsDisplay={["N° de Compte", "Intitulé"]}
        ></TTable>
      </TFormList>
      {open.planComptable && (
        <TModal>
          <EPlanComptable addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EPlanComptable = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OPlanComptable);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire
      title="Nouveau compte général"
      valPanel={<TValidationButton add={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr">
        <TInput
          label="N° de compte"
          name="numero_compte"
          value={item.numero_compte}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Intitulé"
          name="intitule"
          value={item.intitule}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>
    </TFormulaire>
  );
};
