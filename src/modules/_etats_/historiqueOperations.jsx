import React, { useState } from "react";
import { TFormList, TTable } from "../../utils/__";

export const HistoriqueOperations = ({ children }) => {
  const [items, setItems] = useState([
    {
      c1: "CAISSE_PRINCIPALE",
      c2: "Charline",
      c3: "01/04/2023",
      c4: "Paiement Frais de taxi",
      c5: 5000,
      c6: "Décaissement",
      c7: 2023,
      c8: "Avril",
      c9: "FRAIS_TAXI",
      c10: "6310xxxx",
      c11: "57xxxx",
      c12: "CPTA",
    },
  ]);
  return (
    <>
      <TFormList
        title="Historique des encaissements et décaissements"
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
            "c11",
            "c12",
          ]}
          columnsDisplay={[
            "Caisse",
            "Caissier",
            "Date de l'opération",
            "Description de l'opération",
            "Montant de l'opération",
            "Sens",
            "Exercice",
            "Période",
            "Nature d'opération",
            "Compte général associé",
            "Compte de caisse",
            "Etat",
          ]}
        ></TTable>
      </TFormList>
    </>
  );
};
