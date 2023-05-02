import { useState } from "react";
import { OPersonnel } from "./_init_";
import {
  TFormulaire,
  TModal,
  TInput,
  TTable,
  TValidationButton,
  TFormList,
  TSelect,
} from "../../utils/__";

export const Personnel = ({ children }) => {
  const [open, setOpen] = useState({ personnel: false });

  const add = (e) => {
    setOpen({ ...open, personnel: true });
  };

  const quit = (e) => {
    setOpen({ ...open, personnel: false });
  };

  const removeAll = (e) => {
    console.log("remove all");
  };

  const [items, setItems] = useState([{ c1: 1, c2: 2, c3: 3, c4: 4, c5: 5 }]);
  return (
    <>
      <TFormList
        title="Liste du personnel"
        options={<TValidationButton add={add} removeAll={removeAll} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4", "c5"]}
          columnsDisplay={[
            "Code",
            "Nom(s)",
            "Prénom(s)",
            "Profil(s)",
            "caisse associée",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>

      {open.personnel && (
        <TModal>
          <EPersonnel addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EPersonnel = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OPersonnel);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };

  return (
    <TFormulaire
      title="Nouvelle personne"
      valPanel={<TValidationButton add={save} cancel={addQuiHandler} />}
    >
      <TInput
        label="Code"
        name="code"
        value={item.code}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Nom(s)"
        name="noms"
        value={item.noms}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Prénom(s)"
        name="prenoms"
        value={item.prenoms}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Profil(s)"
        name="profils"
        items={[
          { value: false, label: "Caissier" },
          { value: true, label: "Contrôleur" },
          { value: true, label: "Clôtureur" },
          { value: true, label: "Comptabilisateur" },
        ]}
        columnId="value"
        columnDisplay="label"
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Caisse associée"
        name="caisseAssocie"
        items={[{ value: false, label: "CAISSE_PRINCIPALE" }]}
        columnId="value"
        columnDisplay="label"
        maxlength={60}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
