import React, { useState } from "react";
import { TFormList, TTable } from "../../utils/__";

export default function EtatsBudgetaire() {
  const [items, setItems] = useState([
    {
      c1: 2023,
      c2: "Avril",
      c3: "01/04/2023",
      c4: "30/04/2023",
      c5: "LOYER",
      c6: "Décaissement",
      c7: 75000,
      c8: 75000,
      c9: 0,
      c10: "100%",
    },
  ]);
  return (
    <>
      <TFormList
        title="Suivi des budgets enregistrés"
        // options={<TValidationButton close={close} print={print} />}
      >
        <TTable
          items={items}
          columns={[
            "c1",
            "c2",
            "c3",
            "c4",
            "c5",
            "c6",
            "c7",
            "c8",
            "c9",
            "c10",
          ]}
          columnsDisplay={[
            "Exercice",
            "Période",
            "Date de début",
            "Date de fin",
            "Nature de l'opération",
            "Sens",
            "Montant (prévision)",
            "Réalisations",
            "Ecart",
            "Pourcentage de réalisation",
          ]}
        ></TTable>
      </TFormList>
    </>
  );
}
