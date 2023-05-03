import React, { useEffect, useState } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TLayout,
  TModal,
  TSelect,
  TTable,
  TValidationButton,
} from "../../utils/__";
import { OEnregistrement } from "../_administration_/_init_";
import { useParams } from "react-router-dom";

//sens : 0 pour encaissement et 1 pour décaissement
export const OperationCaisse = ({ children, sens = 0 }) => {
  useEffect(() => {
    console.log("myParameter has changed:", sens);
  }, [sens]);

  const [items, setItems] = useState([
    {
      c1: "CAISSE_PRINCIPALE",
      c2: "Charline",
      c3: "02/05/2023",
      c4: "Régul perte",
      c5: 10000,
      c6: `${sens === 0 ? "Encaissement" : "Décaissement"}`,
      c7: "2023",
      c8: "Mai",
      c9: "PERTE_SUR_CTRL",
      c10: "47xxxx",
      c11: "57xxxx",
      c12: "OP",
    },
  ]);
  const [sensTitle, setSensTitle] = useState({});

  const [open, setOpen] = useState({
    frame: false,
    sens: sens,
  });

  const add = (e) => {
    setOpen({ ...open, frame: true, sens: sens });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const remove = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Suppression");
  };
  const quit = (e) => {
    setOpen({ ...open, frame: false });
  };
  return (
    <>
      <TFormList
        title={`Liste des ${sens == 0 ? "encaissements" : "décaissements"}`}
        options={<TValidationButton add={add} print={print} remove={remove} />}
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
            "Caisse ",
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
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>

      {open.frame && (
        <TModal>
          <EOperationCaisse sens={open.sens} addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EOperationCaisse = ({ children, sens = 0, addQuiHandler }) => {
  const [item, setItem] = useState(OEnregistrement);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <>
      <TFormulaire
        title={`Enregistrer un ${sens === 0 ? "encaissement" : "décaissement"}`}
        valPanel={<TValidationButton save={save} cancel={addQuiHandler} />}
      >
        <TInput
          type="date"
          label="Date de l'opération"
          name="date_operation"
          value={item.date_operation}
          maxlength={60}
          addChange={changeHandler}
        />

        <TLayout cols="1fr 1fr ">
          <TInput
            label="Description de l'opération"
            name="description_operation"
            value={item.description_operation}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Montant de l'opération"
            name="montant_operation"
            value={item.montant_operation}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>

        <TSelect
          label="Nature de l'opération"
          name="nature_operation"
          items={[
            { value: false, label: "LOYER" },
            { value: true, label: "FRAIS_TAXI" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.nature_operation}
          maxlength={60}
          addChange={changeHandler}
        />

        <TLayout cols="1fr 1fr 1fr">
          <TInput
            label="Compte général associé"
            name="compte_general_associe"
            value={item.compte_general_associe}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Compte de la caisse"
            name="compte_caisse"
            value={item.compte_caisse}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Etat"
            name="etat"
            value={(item.etat = "OP")}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>

        {children}
      </TFormulaire>
      {children}
    </>
  );
};
