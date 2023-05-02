import { useState } from "react";
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
import { OUtilisateur } from "./_init_";

//liste des utilisateurs et des groupes d'utilisateur
export const Utilisateurs = ({ children }) => {
  const [items, setItems] = useState([
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
    { c1: 1, c2: 2, c3: 3, c4: 4 },
  ]);
  //
  const [open, setOpen] = useState({ utilisateur: false });

  const add = (e) => {
    setOpen({ ...open, utilisateur: true });
  };

  const groupe = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Delete All");
  };

  const quit = (e) => {
    setOpen({ ...open, utilisateur: false, groupe: false });
  };

  return (
    <>
      <TFormList
        title="Liste des utilisateurs"
        options={<TValidationButton add={add} removeAll={groupe} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4"]}
          columnsDisplay={["Login", "Nom", "Prénom", "Groupe utilisateur"]}
          columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.utilisateur && (
        <TModal>
          <EUtilisateur addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

/*
les écrans ou formulaire de création d'utilisateur ou groupe d'utilisateur
*/

export const EUtilisateur = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OUtilisateur);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  const print = (e) => {
    console.log("imprimer : ", item);
  };

  return (
    <TFormulaire
      title="Nouvel Utilisateur"
      valPanel={
        <TValidationButton add={save} print={print} cancel={addQuiHandler} />
      }
    >
      <TInput
        label="Login"
        name="login"
        value={item.login}
        maxlength={10}
        addChange={changeHandler}
      />
      <TLayout cols="1fr 2fr">
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
      </TLayout>

      <TSelect
        label="groupe d'utilisateur"
        name="idGroupe"
        value={item.idGroupe}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
