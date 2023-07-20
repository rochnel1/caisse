import React, { useState } from "react";
import { TFormList, TTable } from "../../utils/__";

export default function EtatsBudgetaire() {
  const [items, setItems] = useState([]);
  return (
    <>
      <TFormList
        title="Suivi des budgets enregistrés"
        // options={<TValidationButton close={close} print={print} />}
      >
        <TTable
          items={items}
          columns={[]}
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
