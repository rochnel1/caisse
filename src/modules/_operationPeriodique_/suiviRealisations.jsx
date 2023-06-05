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

export const SuiviRealisations = ({ children, idExo, idPer, idNat }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [item, setItem] = useState(OInitBudget);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.budgetsRealisation)
      .fetch()
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => alert(err));
  };

  const loadItemsFliter = (idExo, idPer, idNat) => {
    if (idExo == 0 || idPer == 0 || idNat == 0) {
      setItems([]);
      return;
    }
    api(ENDPOINTS.budgetsRealisation)
      .fetchByIds(idExo, idPer, idNat)
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  const validate = async (e) => {
    idExo = item.Idexercice;
    idPer = item.Idperiode;
    idNat = item.Idnatureoperation;
    loadItemsFliter(idExo, idPer, idNat);
  };
  const displayAll = async (e) => {
    loadItems();
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
    // setItem({ ...OInitBudget });
    loadItemsNature();
    loadItemsExercice();
    loadItemsPeriode();
  }, []);

  useEffect(() => {
    loadItems();
  }, []);

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
          </TLayout>
        </TFormulaire>

        <div className="center-TValidationButton">
          <TValidationButton
            print={print}
            validate={validate}
            all={displayAll}
          />
        </div>
      </div>

      <TTable
        items={items}
        columns={[
          { name: "exercice" },
          { name: "periode" },
          { name: "nature" },
          { name: "prevision" },
          { name: "realisation" },
          { name: "ecart" },
        ]}
        columnsDisplay={[
          "Exercice",
          "Période",
          "Nature",
          "Prévision",
          "Réalisations",
          "Ecart",
        ]}
      ></TTable>
    </>
  );
};
