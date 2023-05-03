import { useState } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TModal,
  TTable,
  TValidationButton,
} from "../../utils/__";
import { OGroupeUtilisateur } from "./_init_";

export const GroupesUtilisateurs = ({ children }) => {
  const [items, setItems] = useState([
    { c1: 1, c2: 2, c3: 3 },
    { c1: 1, c2: 2, c3: 3 },
  ]);

  const [open, setOpen] = useState({ groupeUtilisateur: false });

  const add = (e) => {
    setOpen({ ...open, groupeUtilisateur: true });
  };

  const groupe = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("");
  };

  const quit = (e) => {
    setOpen({ ...open, groupeUtilisateur: false });
  };

  return (
    <>
      <TFormList
        title="Liste des groupes utilisateurs"
        options={<TValidationButton add={add} removeAll={groupe} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2"]}
          columnsDisplay={["Id Groupe", "Nom du Groupe"]}
        ></TTable>
      </TFormList>

      {open.groupeUtilisateur && (
        <TModal>
          <EGroupeUtilisateur addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EGroupeUtilisateur = ({ children, addQuiHandler }) => {
  const [itemGrp, setItemGrp] = useState(OGroupeUtilisateur);
  const changeHandler = (e) => {
    setItemGrp({ ...itemGrp, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(itemGrp);
  };

  return (
    <TFormulaire
      title="Nouveau Groupe d'utlisateur"
      valPanel={<TValidationButton add={save} cancel={addQuiHandler} />}
    >
      <TInput
        label="Id du groupe"
        name="idGroupe"
        value={itemGrp.idGroupe}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Nom du groupe"
        name="nomGroupe"
        value={itemGrp.nomGroupe}
        maxlength={60}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
