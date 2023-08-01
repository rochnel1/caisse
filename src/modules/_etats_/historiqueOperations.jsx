import React, { useEffect, useState } from "react";
import { TFormulaire, TLayout, TSelect } from "../../utils/__";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";
import { OOperation } from "../_administration_/_init_";
import DataTable from "react-data-table-component";

export const HistoriqueOperations = ({
  children,
  idExo,
  idPer,
  idNat,
  sens,
}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(OOperation);

  const changeHandler = (e) => {
    let temp = item;
    temp[e.target.name] = e.target.value;
    setItem({ ...item, [e.target.name]: e.target.value });
    validate(temp);
  };

  const changeHandlerExercie = (e) => {
    let temp = cPeriode;
    temp = temp.filter(
      (o) => o.IdexerciceNavigation.Idexercice == e.target.value
    );
    let Obj = item;
    Obj[e.target.name] = e.target.value;
    Obj["Idperiode"] = "";
    validate(Obj);
    setItem({ ...item, [e.target.name]: e.target.value, Idperiode: "" });
    setPeriode(temp);
  };

  const loadItemsFilter = (idExo, idPer, idNat, sens) => {
    api(ENDPOINTS.operations)
      .fetchByIdsOp(idExo, idPer, idNat, sens)
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  const validate = async (e) => {
    idExo = e.Idexercice == "" ? 0 : e.Idexercice;
    idPer = e.Idperiode == "" ? 0 : e.Idperiode;
    idNat = e.Idnatureoperation == "" ? 0 : e.Idnatureoperation;
    sens = e.Sens == "" ? 2 : e.Sens;
    loadItemsFilter(idExo, idPer, idNat, sens);
  };

  const print = (e) => {};

  const [exercice, setExercice] = useState([]);
  const [nature, setNature] = useState([]);
  const [periode, setPeriode] = useState([]);

  const [cPeriode, setCPeriode] = useState([]);

  const loadItemsExercice = () => {
    api(ENDPOINTS.exercices)
      .fetch()
      .then((res) => setExercice(res.data))
      .catch((err) => alert(err));
  };

  const loadItemsPeriode = () => {
    api(ENDPOINTS.periodes)
      .fetch()
      .then((res) => {
        setCPeriode([...res.data]);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  };

  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => setNature(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // loadItems();
    loadItemsNature();
    loadItemsExercice();
    loadItemsPeriode();
  }, []);

  // useEffect(() => {
  //   validate();
  // }, [item.Idexercice, item.Idperiode, item.Sens, item.Idnatureoperation]);

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
              addChange={changeHandlerExercie}
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
