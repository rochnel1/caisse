import React, { useState } from "react";
import { TFormList, TTable, TValidationButton } from "../../utils/__";

export const FermetureCaisse = ({ children }) => {
  const [items, setItems] = useState([
    {
      c1: "CAISSE_PRINCIPALE",
      c2: "Charline",
      c3: 2023,
      c4: "MAI",
      c5: "57xxxx",
    },
  ]);
  //

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const close = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Fermeture de la caisse");
  };

  return (
    <>
      <TFormList
        title="Liste des caisses ouvertes"
        options={<TValidationButton close={close} print={print} />}
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
    </>
  );
};
