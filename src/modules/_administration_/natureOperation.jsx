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

  const [open, setOpen] = useState({ natureOp: false, idnatureoperation: 0 });

  const add = (e) => {
    setOpen({ ...open, natureOp: true, idnatureoperation: 0 });
  };

  const quit = (e) => {
    setOpen({ ...open, natureOp: false });
  };

  const modify = (id) => {
    setOpen({ ...open, natureOp: true, idnatureoperation: id });
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
            { name: "codenature" },
            { name: "description" },
            {
              name: "",
              render: (o) => setBabalScript(o.idcompteNavigation?.numcompte),
            },
            { name: "typenature" },
            { name: "sensnature" },
          ]}
          columnsDisplay={[
            "Code",
            "Description",
            "Compte général associé",
            "Type de nature",
            "Sens",
          ]}
          lineClick={(o) => {
            modify(o.idnatureoperation);
          }}
        ></TTable>
      </TFormList>

      {open.natureOp && (
        <TModal>
          <ENatureOperation
            addQuiHandler={quit}
            itemId={open.idnatureoperation}
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
  console.log(item);
  const save = async (e) => {
    // console.log(item);
    if (item.idnatureoperation === 0) {
      delete item.idnatureoperation;
      await api(ENDPOINTS.natureoperations).post(item);
    } else {
      await api(ENDPOINTS.natureoperations).put(item.idnatureoperation, item);
    }
    setItem({ ...ONatureOperation });
    if (addRefreshHandler) addRefreshHandler();
    if (addQuiHandler) addQuiHandler();
  };

  const remove = async (e) => {
    if (item.idnatureoperation === 0) return;
    const res = await api(ENDPOINTS.natureoperations).delete(
      item.idnatureoperation,
      item
    );
    if (addRefreshHandler) addRefreshHandler(res);
    if (addQuiHandler) addQuiHandler();
  };

  //
  const [natureGroupes, setNatureGroupes] = useState([]);

  const loadItems = () => {
    api(ENDPOINTS.compteGenerals)
      .fetch()
      .then((res) => setNatureGroupes(res.data))
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
          remove={(e) => (item.idnatureoperation !== 0 ? remove() : undefined)}
          cancel={addQuiHandler}
        />
      }
    >
      <TInput
        label="Code"
        name="code"
        value={item.code}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Description"
        name="description"
        value={item.description}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Compte général associé"
        name="compteGeneralAssocie"
        items={natureGroupes}
        columnId="idcompteNavigation"
        columnDisplay="numcompte"
        value={item.compteGeneralAssocie}
        maxlength={60}
        addChange={changeHandler}
      />
      <TSelect
        label="Type de nature"
        name="typeNature"
        items={[
          { value: false, label: "Opération" },
          { value: true, label: "Regularisation" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={item.typeNature}
        addChange={changeHandler}
      />
      <TSelect
        label="Sens"
        name="sens"
        items={[
          { value: 0, label: "Encaissement" },
          { value: 1, label: "Décaissement" },
          { value: 2, label: "Les deux" },
        ]}
        columnId="value"
        columnDisplay="label"
        value={item.sens}
        addChange={changeHandler}
      />
      {children}
    </TFormulaire>
  );
};
