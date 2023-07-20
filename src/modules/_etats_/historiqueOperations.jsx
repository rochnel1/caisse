import React, { useEffect, useState } from "react";
import {
  TFormList,
  TFormulaire,
  TLayout,
  TSelect,
  TTable,
  TValidationButton,
} from "../../utils/__";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { OOperation } from "../_administration_/_init_";
import DataTable from "react-data-table-component";

export const HistoriqueOperations = ({
  children,
  idExo,
  idPer,
  idNat,
  idCaiss,
  sens,
}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(OOperation);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const loadItemsFilter = (idExo, idPer, idNat, sens) => {
    if (idExo == 0 || idPer == 0 || idNat == 0 || sens == 0) {
      setItems([]);
      return;
    }
    api(ENDPOINTS.operations)
      .fetchByIdsOp(idExo, idPer, idNat, sens)
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  const loadItems = async () => {
    api(ENDPOINTS.operations)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  const validate = async (e) => {
    idExo = item.Idexercice;
    idPer = item.Idperiode;
    idNat = item.Idnatureoperation;
    sens = item.Sens;
    loadItemsFilter(idExo, idPer, idNat, sens);
  };

  const print = (e) => {
    idExo = item.Idexercice;
    idPer = item.Idperiode;
    idNat = item.Idnatureoperation;
    idCaiss = item.Idcaisse;
    sens = item.Sens;
    console.log(idExo + " + " + idPer + " + " + idNat + " + " + sens);
  };

  const [exercice, setExercice] = useState([]);
  const [nature, setNature] = useState([]);
  const [periode, setPeriode] = useState([]);

  const loadItemsExercice = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setExercice(res.data))
      .catch((err) => alert(err));
  };

  const loadItemsPeriode = () => {
    api(ENDPOINTS.periodes)
      .fetch()
      .then((res) => setPeriode(res.data))
      .catch((err) => alert(err));
  };

  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => setNature(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems();
    loadItemsNature();
    loadItemsExercice();
    loadItemsPeriode();
  }, []);

  useEffect(() => {
    validate();
  }, [item.Idexercice, item.Idperiode, item.Sens, item.Idnatureoperation]);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };
  const columns = [
    {
      name: "Caisse",
      selector: (row) => row.caisse,
    },
    {
      name: "Caissier",
      selector: (row) => row.caissier,
    },
    {
      name: "Date de l'opération",
      selector: (row) => row.date,
    },
    {
      name: "Description de l'opération",
      selector: (row) => row.information,
    },
    {
      name: "Montant de l'opération",
      selector: (row) => row.montant,
    },
    {
      name: "Exercice",
      selector: (row) => row.exercice,
    },
    {
      name: "Periode",
      selector: (row) => row.periode,
    },
    {
      name: "Nature d'opération",
      selector: (row) => row.nature,
    },
    {
      name: "Sens",
      selector: (row) => row.sens,
    },
    {
      name: "Etat",
      selector: (row) => row.etat,
    },
  ];
  return (
    <>
      <div>
        <TFormulaire title="Historique des Opérations ">
          <TLayout cols="1fr 1fr 1fr 1fr">
            <TSelect
              label="Exercice"
              name="Idexercice"
              items={exercice}
              columnId="Idexercice"
              columnDisplay="Code"
              value={item.Idexercice}
              addChange={changeHandler}
            />
            <TSelect
              label="Periode"
              name="Idperiode"
              items={periode}
              columnId="Idperiode"
              columnDisplay="Codeperiode"
              value={item.Idperiode}
              addChange={changeHandler}
            />

            <TSelect
              label="Nature d'opération"
              name="Idnatureoperation"
              items={nature}
              columnId="Idnatureoperation"
              columnDisplay="Codenature"
              value={item.Idnatureoperation}
              addChange={changeHandler}
            />
            <TSelect
              label="Sens "
              name="Sens"
              items={[
                { value: 0, label: "Encaissement" },
                { value: 1, label: "Décaissement" },
              ]}
              columnId="value"
              columnDisplay="label"
              value={item.Sens}
              addChange={changeHandler}
            />
          </TLayout>
        </TFormulaire>
      </div>
      <DataTable
        columns={columns}
        data={items}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        actions={
          <button className="buttonAll" onClick={print}>
            Imprimer
          </button>
        }
        highlightOnHover
        pointerOnHover
      />
    </>
  );
};
