import { useEffect, useState } from "react";
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
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";

export const Personnel = ({ children }) => {
  const [open, setOpen] = useState({ personnel: false, Idpersonnel: 0 });
  const [refresh, setRefresh] = useState(false);
  const add = (e) => {
    setOpen({ ...open, personnel: true, Idpersonnel: 0 });
  };

  const modify = (id) => {
    setOpen({ ...open, personnel: true, Idpersonnel: id });
  };

  const quit = (e) => {
    setOpen({ ...open, personnel: false });
  };

  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.personnels)
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
  const [items, setItems] = useState([]);
  return (
    <>
      <TFormList
        title="Liste du personnel"
        options={<TValidationButton add={add} refresh={rafraichir} />}
      >
        <TTable
          items={items}
          columns={[
            { name: "Codepersonnel" },
            { name: "Nom" },
            { name: "Prenom" },
            { name: "Profil" },
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
          ]}
          columnsDisplay={[
            "Code",
            "Nom(s)",
            "Prénom(s)",
            "Profil(s)",
            "caisse associée",
          ]}
          lineClick={(o) => {
            modify(o.Idpersonnel);
          }}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>

      {open.personnel && (
        <TModal>
          <EPersonnel
            addQuiHandler={quit}
            itemId={open.Idpersonnel}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const EPersonnel = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
}) => {
  const [item, setItem] = useState(OPersonnel);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    if (item.Profil === "0") {
      item.Profil = "Caissier";
    } else if (item.Profil === "1") {
      item.Profil = "Contrôleur";
    } else if (item.Profil === "2") {
      item.Profil = "Clôtureur";
    } else if (item.Profil === "3") {
      item.Profil = "Comptabilisateur";
    } else {
      item.Profil = "";
    }
    if (item.Idpersonnel === 0) {
      //nouvel enregistrement
      delete item.IdUtilisateur;
      await api(ENDPOINTS.personnels).post(item);
    } else {
      //modification
      await api(ENDPOINTS.personnels).put(item.IdUtilisateur, item);
    }
    setItem({ ...OPersonnel });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.Idpersonnel === 0) return;
    const res = await api(ENDPOINTS.personnels).delete(item.Idpersonnel, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  //
  const [caisse, setCaisse] = useState([]);

  const loadItems = () => {
    api(ENDPOINTS.caisses)
      .fetch()
      .then((res) => setCaisse(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setItem({ ...OPersonnel });
    if (itemId !== 0) {
      api(ENDPOINTS.personnels)
        .fetchById(itemId)
        .then((res) => {
          setItem(res.data);
        })
        .catch((err) => alert(err));
    }
    loadItems();
  }, []);

  return (
    <TFormulaire
      title="Nouvelle personne"
      valPanel={
        <TValidationButton
          add={save}
          remove={(e) => (item.Idpersonnel !== 0 ? remove() : undefined)}
          cancel={addQuiHandler}
        />
      }
    >
      <TInput
        label="Code"
        name="Codepersonnel"
        value={item.Codepersonnel}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Nom(s)"
        name="Nom"
        value={item.Nom}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Prénom(s)"
        name="Prenom"
        value={item.Prenom}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Profil(s)"
        name="Profil"
        items={[
          { value: 0, label: "Caissier" },
          { value: 1, label: "Contrôleur" },
          { value: 2, label: "Clôtureur" },
          { value: 3, label: "Comptabilisateur" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={item.Profil}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Caisse associée"
        name="Idcaisse"
        items={caisse}
        columnId="Idcaisse"
        columnDisplay="Codecaisse"
        maxlength={60}
        value={item.Idcaisse}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
