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
      name: "N° de pièce",
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
      <TFormList title="Comptabilisation des opérations de caisse">
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

export const EComptabilisation = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OComptabilisation);

  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire title="Comptabilser les pièces compta">
      <div className="centered">
        <TValidationButton validate={save} cancel={addQuiHandler} />
      </div>

      {children}
    </TFormulaire>
  );
};
