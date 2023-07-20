import { useState } from "react";
import { OComptabilisation, OOperation } from "../_administration_/_init_";
import {
  TFormulaire,
  TLayout,
  TModal,
  TInput,
  TTable,
  TValidationButton,
  TFormList,
} from "../../utils/__";
import DataTable from "react-data-table-component";

export const Comptabilisation = ({ children }) => {
  const [itemsExo, setItemsExo] = useState([]);
  const [item, setItem] = useState(OOperation);
  const [items, setItems] = useState([]);
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

  const columns = [
    {
      name: "Journal comptable",
      selector: (row) => row.caisse,
    },
    {
      name: "N° de pièce",
      selector: (row) => row.caissier,
    },
    {
      name: "Date de pièce",
      selector: (row) => new Date(row.date).toLocaleString(),
    },
    {
      name: "Compte général",
      selector: (row) => row.montant,
    },
    {
      name: "Libellé de l'opération",
      selector: (row) => row.nature,
      sortable: true,
    },
    {
      name: "Montant débit",
      selector: (row) => row.sens,
    },
    {
      name: "Montant crédit",
      selector: (row) => row.etat,
    },
  ];
  return (
    <>
      <TFormList
        title="Comptabilisation des opérations de caisse"
        options={<TValidationButton add={add} print={print} />}
      >
        <DataTable
          columns={columns}
          data={items}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          highlightOnHover
          actions={
            <button className="buttonAll" onClick={validate}>
              Comptabiliser
            </button>
          }
        />
      </TFormList>
      {open.exercice && (
        <TModal>
          <EComptabilisation addQuiHandler={quit} itemId={open.Idbudget} />
        </TModal>
      )}
    </>
  );
};

export const EComptabilisation = ({ children, addQuiHandler, itemId = 0 }) => {
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
      valPanel={
        <TValidationButton
          add={save}
          addLabel={itemId == 0 ? "Ajouter" : "Modifier"}
          cancel={addQuiHandler}
        />
      }
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
