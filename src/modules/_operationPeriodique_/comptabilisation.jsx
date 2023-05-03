import { useState } from "react";
import { OComptabilisation } from "../_administration_/_init_";
import {
  TFormulaire,
  TLayout,
  TModal,
  TInput,
  TTable,
  TValidationButton,
  TFormList,
} from "../../utils/__";

export const Comptabilisation = ({ children }) => {
  const [itemsExo, setItemsExo] = useState([
    {
      c1: "CAIS",
      c2: "1",
      c3: "31/12/2013",
      c4: "58xxxx",
      c5: "Réapprode la caisse",
      c6: "100000",
      c7: "",
    },
    {
      c1: "CAIS",
      c2: "1",
      c3: "31/12/2013",
      c4: "58xxxx",
      c5: "Réapprode la caisse",
      c6: "",
      c7: "100000",
    },
  ]);
  //
  const [open, setOpen] = useState({ exercice: false });

  const add = (e) => {
    setOpen({ ...open, exercice: true });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const validate = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("piece validée");
  };

  const quit = (e) => {
    setOpen({ ...open, exercice: false });
  };

  return (
    <>
      <TFormList
        title="Comptabilisation des opérations de caisse"
        options={
          <TValidationButton add={add} print={print} validate={validate} />
        }
      >
        <TTable
          items={itemsExo}
          columns={["c1", "c2", "c3", "c4", "c5", "c6", "c7"]}
          columnsDisplay={[
            "Journal comptable",
            "N° de pièce",
            "Date de pièce",
            "Compte général",
            "Libellé de l'opération",
            "Montant débit",
            "Montant crédit",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.exercice && (
        <TModal>
          <EComptabilisation addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EComptabilisation = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OComptabilisation);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire
      title="Nouvelle pièce compta"
      valPanel={<TValidationButton add={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr 1fr">
        <TInput
          label="Journal comptable"
          name="journalCompta"
          value={item.journalCompta}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Numéro de pièce"
          name="numPiece"
          value={item.numPiece}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de pièce"
          name="date_piece"
          value={item.date_piece}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TInput
        label="Libellé de l'opération"
        name="libeblleOperation"
        value={item.libeblleOperation}
        maxlength={60}
        addChange={changeHandler}
      />
      <TLayout cols="1fr 1fr">
        <TInput
          label="Montant débit"
          name="montant_debit"
          value={item.montant_debit}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Montant crédit"
          name="montant_credit"
          value={item.montant_credit}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      {children}
    </TFormulaire>
  );
};
