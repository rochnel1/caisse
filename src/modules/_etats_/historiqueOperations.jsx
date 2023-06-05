import React, { useEffect, useState } from "react";
import { TFormList, TTable } from "../../utils/__";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";

export const HistoriqueOperations = ({ children }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.operations)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems();
  }, [refresh]);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };

  return (
    <>
      <TFormList
        title="Historique des encaissements et décaissements"
        // options={<TValidationButton close={close} print={print} />}
      >
        <TTable
          items={items}
          columns={[
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
            {
              name: "",
              render: (o) =>
                setBabalScript(o.IdpersonnelNavigation?.Codepersonnel),
            },
            {
              name: "Dateoperation",
              render: (o) => new Date(o.Dateoperation).toLocaleString(),
            },
            { name: "Description" },
            { name: "Montant" },
            { name: "Sens" },
            {
              name: "",
              render: (o) => setBabalScript(o.IdexerciceNavigation?.Code),
            },
            {
              name: "",
              render: (o) => setBabalScript(o.IdperiodeNavigation?.Codeperiode),
            },
            {
              name: "",
              render: (o) =>
                setBabalScript(o.IdnatureoperationNavigation?.Codenature),
            },
            {
              name: "",
              render: (o) =>
                setBabalScript(
                  o.IdcaisseNavigation?.IdcompteNavigation?.Numcompte
                ),
            },
            { name: "Etat" },
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
            "Compte de caisse",
            "Etat",
          ]}
        ></TTable>
      </TFormList>
    </>
  );
};
