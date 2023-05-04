import React, { useState } from "react";
import {
  TFormulaire,
  TLayout,
  TSelect,
  TTable,
  TValidationButton,
} from "../../utils/__";
import { OSuivRealisation } from "../_administration_/_init_";

export const SuiviRealisations = ({ children }) => {
  const [open, setOpen] = useState({ utilisateur: false });

  const quit = (e) => {
    setOpen({ ...open, utilisateur: false, groupe: false });
  };

  return (
    <>
      <ESuiviRealisations addQuiHandler={quit} />
    </>
  );
};

export const ESuiviRealisations = ({ children }) => {
  const [item, setItem] = useState(OSuivRealisation);
  const [itemsSuivi, setItemsSuivi] = useState([
    {
      c1: 2021,
      c2: "Mai",
      c7: 75000,
      c8: 75000,
      c9: 0,
      c10: "100%",
    },
  ]);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const validate = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Rechercher ");
  };
  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Imprimer ");
  };
  return (
    <div>
      <TFormulaire title="Cliquer sur valider pour voir le resultat ">
        <TLayout cols="1fr 1fr 1fr">
          <TSelect
            label="Exercice"
            name="exercice"
            items={[
              { value: false, label: "2020" },
              { value: true, label: "2021" },
              { value: true, label: "2022" },
            ]}
            columnId="value"
            columnDisplay="label"
            value={item.exercice}
            maxlength={60}
            addChange={changeHandler}
          />
          <TSelect
            label="Periode"
            name="periode"
            items={[
              { value: false, label: "Avril" },
              { value: true, label: "Mai" },
              { value: true, label: "Juin" },
              { value: true, label: "Tous" },
            ]}
            columnId="value"
            columnDisplay="label"
            value={item.periode}
            maxlength={60}
            addChange={changeHandler}
          />
          <TSelect
            label="Nature d'opération"
            name="nature_operation"
            items={[
              { value: false, label: "FRAIS_ELECTRICITE" },
              { value: true, label: "FRAIS_TAXI" },
              { value: true, label: "LOYER" },
              { value: true, label: "Tous" },
            ]}
            columnId="value"
            columnDisplay="label"
            value={item.nature_operation}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>
      </TFormulaire>
      <TValidationButton validate={validate} print={print} />

      <TTable
        items={itemsSuivi}
        columns={["c1", "c2", "c7", "c8", "c9", "c10"]}
        columnsDisplay={[
          "Exercice",
          "Période",
          "Montant (prévision)",
          "Réalisations",
          "Ecart",
          "Pourcentage de réalisation",
        ]}
        // columnsWidth={["120px", "auto"]}
      ></TTable>
    </div>
  );
};
