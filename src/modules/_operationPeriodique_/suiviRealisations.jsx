import React, { useEffect, useState } from "react";
import {
  TFormulaire,
  TLayout,
  TSelect,
  TTable,
  TValidationButton,
} from "../../utils/__";
import { OInitBudget } from "../_administration_/_init_";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";
import DataTable from "react-data-table-component";
import {
  imprimer,
  telechargerExcelFile,
  telechargerSage,
} from "../../utils/utils";

export const SuiviRealisations = ({ children, idExo, idPer, idNat }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(OInitBudget);

  const changeHandler = (e) => {
    let temp = item;
    temp[e.target.name] = e.target.value;
    setItem({ ...item, [e.target.name]: e.target.value });
    validate(temp);
  };

  const loadItems = () => {
    api(ENDPOINTS.budgetsRealisation)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  const loadItemsFliter = (idExo, idPer, idNat) => {
    api(ENDPOINTS.budgetsRealisation)
      .fetchByIds(idExo, idPer, idNat)
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  const validate = async (e) => {
    // idExo = item.Idexercice;
    // idPer = item.Idperiode;
    // idNat = item.Idnatureoperation;
    idExo = e.Idexercice == "" ? 0 : e.Idexercice;
    idPer = e.Idperiode == "" ? 0 : e.Idperiode;
    idNat = e.Idnatureoperation == "" ? 0 : e.Idnatureoperation;

    loadItemsFliter(idExo, idPer, idNat);
  };

  const print = (e) => {
    idExo = item.Idexercice;
    idPer = item.Idperiode;
    idNat = item.Idnatureoperation;
    console.log(idExo + " + " + idPer + " + " + idNat);
  };

  const [exercice, setExercice] = useState([]);
  const [nature, setNature] = useState([]);
  const [periode, setPeriode] = useState([]);

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
      .then((res) => setCPeriode(res.data))
      .catch((err) => alert(err));
  };

  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => setNature(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItemsNature();
    loadItemsExercice();
    loadItemsPeriode();
  }, []);

  useEffect(() => {
    validate();
  }, [item.Idexercice, item.Idperiode, item.Idnatureoperation]);

  const columns = [
    {
      name: "Exercice",
      selector: (row) => row.exercice,
      sortable: true,
    },
    {
      name: "Période",
      selector: (row) => row.periode,
      sortable: true,
    },
    {
      name: "Nature",
      selector: (row) => row.nature,
    },
    {
      name: "Prévision",
      selector: (row) => (row.prevision == undefined ? "N.d" : row.prevision),
    },
    {
      name: "Réalisations",
      selector: (row) => row.realisation,
    },
    {
      name: "Ecart",
      selector: (row) => (row.ecart == undefined ? "X" : row.ecart),
    },
  ];

  return (
    <>
      <div>
        <TFormulaire title="Suivi des réalisations ">
          <TLayout cols="1fr 1fr 1fr">
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
          </TLayout>
        </TFormulaire>
        <div>
          <DataTable
            columns={columns}
            data={items}
            pagination
            fixedHeader
            highlightOnHover
            actions={
              <>
                <button
                  className="buttonAll"
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={(e) =>
                    imprimer *
                    (items, columns, "Liste des réalisation des prévisions")
                  }
                >
                  Imprimer
                </button>
                <button
                  className="buttonAll"
                  onClick={(e) => telechargerExcelFile(items, columns)}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Export Excel
                </button>
              </>
            }
          />
        </div>
      </div>
    </>
  );
};
