import { useEffect, useState } from "react";
import { OCaisse } from "./_init_";
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
import { Load } from "../../utils/load";

export const Caisses = ({ children }) => {
  const [items, setItems] = useState([]);
  //
  const [open, setOpen] = useState({ caisse: false, Idcaisse: 0 });
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const add = (e) => {
    setOpen({ ...open, caisse: true, Idcaisse: 0 });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const modify = (id) => {
    setOpen({ ...open, caisse: true, Idcaisse: id });
  };

  const quit = (e) => {
    setOpen({ ...open, caisse: false });
  };

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.caisses)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    loadItems();
  }, [refresh]);

  return (
    <>
      {loading ? (
        <Load loading={loading} />
      ) : (
        <TFormList
          title="Liste des Caisses"
          options={
            <TValidationButton add={add} print={print} refresh={rafraichir} />
          }
        >
          <TTable
            items={items}
            columns={[
              { name: "Codecaisse" },
              { name: "Descriptioncaisse" },
              {
                name: "",
                render: (o) => setBabalScript(o.IdcompteNavigation?.Numcompte),
              },
              { name: "JournalComptable" },
            ]}
            columnsDisplay={[
              "Code",
              "Description",
              "Compte Général",
              "Journal Comptable",
            ]}
            lineClick={(o) => {
              modify(o.Idcaisse);
            }}
          ></TTable>
        </TFormList>
      )}
      {open.caisse && (
        <TModal>
          <ECaisse
            itemId={open.Idcaisse}
            addQuiHandler={quit}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const ECaisse = ({
  children,
  addQuiHandler,
  itemId = 0,
  addRefreshHandler,
}) => {
  const [item, setItem] = useState(OCaisse);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = async (e) => {
    console.log(item);

    if (item.Idcaisse === 0) {
      //nouvel enregistrement
      delete item.Idcaisse;
      await api(ENDPOINTS.caisses).post(item);
    } else {
      //modification
      await api(ENDPOINTS.caisses).put(item.Idcaisse, item);
    }
    setItem({ ...OCaisse });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.Idcaisse === 0) return;
    const res = await api(ENDPOINTS.caisses).delete(item.Idcaisse, item);
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  const [compte, setCompte] = useState([]);

  const loadItems = () => {
    api(ENDPOINTS.compteGenerals)
      .fetch()
      .then((res) => setCompte(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setItem({ ...OCaisse });
    if (itemId !== 0) {
      api(ENDPOINTS.caisses)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
    loadItems();
  }, []);

  return (
    <TFormulaire
      title="Nouvelle Caisse"
      valPanel={
        <TValidationButton
          add={save}
          addLabel={itemId == 0 ? "Ajouter" : "Modifier"}
          remove={(e) => (item.Idcaisse !== 0 ? remove() : undefined)}
          cancel={addQuiHandler}
        />
      }
    >
      <TInput
        label="Code"
        name="Codecaisse"
        value={item.Codecaisse}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Description"
        name="Descriptioncaisse"
        value={item.Descriptioncaisse}
        maxlength={60}
        addChange={changeHandler}
      />

      <TSelect
        label="Compte Général"
        name="Idcompte"
        items={compte}
        columnId="Idcompte"
        columnDisplay="Numcompte"
        value={item.IdcompteNavigation}
        addChange={changeHandler}
      />
      <TInput
        label="Journal Comptable"
        name="JournalComptable"
        items={item.JournalComptable}
        value={item.JournalComptable}
        maxlength={5}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
