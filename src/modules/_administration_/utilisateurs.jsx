import { useEffect, useState } from "react";
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
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";

//liste des utilisateurs et des groupes d'utilisateur
export const Utilisateurs = ({ children }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //
  const [open, setOpen] = useState({ utilisateur: false, IdUtilisateur: 0 });

  const add = (e) => {
    setOpen({ ...open, utilisateur: true, IdUtilisateur: 0 });
  };
  const modify = (id) => {
    setOpen({ ...open, utilisateur: true, IdUtilisateur: id });
  };

  const quit = (e) => {
    setOpen({ ...open, utilisateur: false, groupe: false });
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.utilisateurs)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    loadItems();
  }, [refresh]);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };

  return (
    <>
      <TFormList
        title="Liste des utilisateurs"
        options={<TValidationButton add={add} refresh={rafraichir} />}
      >
        <TTable
          items={items}
          columns={[
            { name: "Login" },
            { name: "Nomutilisateur" },
            { name: "Prenomutilisateur" },
            {
              name: "",
              render: (o) =>
                setBabalScript(o.IdgpeutilisateurNavigation?.Nomgroupe),
            },
          ]}
          columnsDisplay={["Login", "Nom", "Prénom", "Groupe utilisateur"]}
          columnsWidth={["auto", "auto", "auto", "120px"]}
          lineClick={(o) => {
            modify(o.IdUtilisateur);
          }}
        ></TTable>
      </TFormList>
      {open.utilisateur && (
        <TModal>
          <EUtilisateur
            itemId={open.IdUtilisateur}
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

/*
les écrans ou formulaire de création d'utilisateur ou groupe d'utilisateur
*/

export const EUtilisateur = ({
  children,
  itemId = 0,
  addQuiHandler,
  addRefreshHandler,
}) => {
  const [item, setItem] = useState(OUtilisateur);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    //console.log(item.Idgpeutilisateur);
    if (item.IdUtilisateur === 0) {
      //nouvel enregistrement
      delete item.IdUtilisateur;
      await api(ENDPOINTS.utilisateurs).post(item);
    } else {
      //modification
      await api(ENDPOINTS.utilisateurs).put(item.IdUtilisateur, item);
    }
    setItem({ ...OUtilisateur });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.IdUtilisateur === 0) return;
    const res = await api(ENDPOINTS.utilisateurs).delete(
      item.IdUtilisateur,
      item
    );
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };
  const [groupes, setGroupes] = useState([]);

  const loadItems = () => {
    api(ENDPOINTS.groupeUtilisateur)
      .fetch()
      .then((res) => setGroupes(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // console.log("Code With Rochnel");
    setItem({ ...OUtilisateur });
    if (itemId !== 0) {
      api(ENDPOINTS.utilisateurs)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
    loadItems();
  }, []);

  const state = {
    options: [],
    defaultValue: "Choisissez une option",
  };

  return (
    <TFormulaire
      title="Nouvel Utilisateur"
      valPanel={
        <TValidationButton
          add={save}
          remove={(e) => (item.IdUtilisateur !== 0 ? remove() : undefined)}
          cancel={addQuiHandler}
        />
      }
    >
      <TInput
        label="Login"
        name="Login"
        value={item.Login}
        maxlength={10}
        addChange={changeHandler}
      />
      <TLayout cols="1fr 1fr">
        <TInput
          label="Nom(s)"
          name="Nomutilisateur"
          value={item.Nomutilisateur}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Prénom(s)"
          name="Prenomutilisateur"
          value={item.Prenomutilisateur}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TSelect
        label="Groupe d'utilisateur"
        name="Idgpeutilisateur"
        items={groupes}
        columnId="Idgpeutilisateur"
        columnDisplay="Nomgroupe"
        value={item.Idgpeutilisateur}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
