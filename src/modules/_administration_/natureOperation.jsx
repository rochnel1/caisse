import { useEffect, useState } from "react";
import { ONatureOperation, OPersonnel } from "./_init_";
import {
  TFormulaire,
  TModal,
  TInput,
  TTable,
  TValidationButton,
  TFormList,
  TSelect,
} from "../../utils/__";
import { api } from "../../utils/api";
import { ENDPOINTS } from "../../utils/Variables";

export const NatureOperation = ({ children }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState({ natureOp: false, Idnatureoperation: 0 });

  const add = (e) => {
    setOpen({ ...open, natureOp: true, Idnatureoperation: 0 });
  };

  const quit = (e) => {
    setOpen({ ...open, natureOp: false });
  };

  const modify = (id) => {
    setOpen({ ...open, natureOp: true, Idnatureoperation: id });
  };

  //hooks
  const rafraichir = () => {
    setRefresh(!refresh);
  };

  const loadItems = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => setItems(res.data))
      .catch((err) => alert(err));
  };
  useEffect(() => {
    // console.log("Code With Rochnel");
    loadItems();
  }, [refresh]);

  const setBabalScript = (bab) => {
    return <>{bab}</>;
  };
  return (
    <>
      <TFormList
        title="Liste des natures d'opérations"
        options={<TValidationButton add={add} refresh={rafraichir} />}
      >
        <TTable
          items={items}
          columns={[
            { name: "Codenature" },
            { name: "Description" },
            {
              name: "",
              render: (o) => setBabalScript(o.IdcompteNavigation?.Numcompte),
            },
            { name: "Typenature" },
            { name: "Sensnature" },
          ]}
          columnsDisplay={[
            "Code",
            "Description",
            "Compte général associé",
            "Type de nature",
            "Sens",
          ]}
          lineClick={(o) => {
            modify(o.Idnatureoperation);
          }}
        ></TTable>
      </TFormList>

      {open.natureOp && (
        <TModal>
          <ENatureOperation
            addQuiHandler={quit}
            itemId={open.Idnatureoperation}
            addRefreshHandler={rafraichir}
          />
        </TModal>
      )}
    </>
  );
};

export const ENatureOperation = ({
  children,
  itemId = 0,
  addRefreshHandler,
  addQuiHandler,
}) => {
  const [item, setItem] = useState(ONatureOperation);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = async (e) => {
    if (item.Sensnature === 0) {
      item.Sensnature = "Encaissement";
    } else if (item.Sensnature === 1) {
      item.Sensnature = "Décaissement";
    } else {
      item.Sensnature = "Les Deux";
    }

    item.TypeNature === 0
      ? (item.TypeNature = "Opération")
      : (item.TypeNature = "Régularisation");

    console.log(item);

    if (item.Idnatureoperation === 0) {
      delete item.Idnatureoperation;
      await api(ENDPOINTS.natureoperations).post(item);
    } else {
      await api(ENDPOINTS.natureoperations).put(item.Idnatureoperation, item);
    }
    setItem({ ...ONatureOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.Idnatureoperation === 0) return;
    const res = await api(ENDPOINTS.natureoperations).delete(
      item.Idnatureoperation,
      item
    );
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  //
  const [Compta, setPlanCompta] = useState([]);

  const loadItems = () => {
    api(ENDPOINTS.compteGenerals)
      .fetch()
      .then((res) => setPlanCompta(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // console.log("Code With Rochnel");
    setItem({ ...ONatureOperation });
    if (itemId !== 0) {
      api(ENDPOINTS.natureoperations)
        .fetchById(itemId)
        .then((res) => setItem(res.data))
        .catch((err) => alert(err));
    }
    loadItems();
  }, []);
  return (
    <TFormulaire
      title="Nouvelle nature d'opération"
      valPanel={
        <TValidationButton
          add={save}
          remove={(e) => (item.Idnatureoperation !== 0 ? remove() : undefined)}
          cancel={addQuiHandler}
        />
      }
    >
      <TInput
        label="Code"
        name="Codenature"
        value={item.Codenature}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Description"
        name="Description"
        value={item.Description}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Compte général associé"
        name="Idcompte"
        items={Compta}
        columnId="Idcompte"
        columnDisplay="Numcompte"
        value={item.Idcompte}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Type de nature"
        name="TypeNature"
        items={[
          { value: 0, label: "Opération" },
          { value: 1, label: "Regularisation" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={item.TypeNature}
        addChange={changeHandler}
      />
      <TSelect
        label="Sens"
        name="Sensnature"
        items={[
          { value: 0, label: "Encaissement" },
          { value: 1, label: "Décaissement" },
          { value: 2, label: "Les deux" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={item.Sensnature}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
