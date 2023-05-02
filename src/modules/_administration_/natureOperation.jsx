import { useState } from "react";
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

export const NatureOperation = ({ children }) => {
  const [open, setOpen] = useState({ natureOp: false });

  const add = (e) => {
    setOpen({ ...open, natureOp: true });
  };

  const quit = (e) => {
    setOpen({ ...open, natureOp: false });
  };

  const removeAll = (e) => {
    console.log("remove all");
  };

  const [items, setItems] = useState([{ c1: 1, c2: 2, c3: 3, c4: 4, c5: 5 }]);
  return (
    <>
      <TFormList
        title="Liste des natures d'opérations"
        options={<TValidationButton add={add} removeAll={removeAll} />}
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4", "c5"]}
          columnsDisplay={[
            "Code",
            "Description",
            "Compte général associé",
            "Type de nature",
            "Sens",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>

      {open.natureOp && (
        <TModal>
          <ENatureOperation addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const ENatureOperation = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(ONatureOperation);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };

  return (
    <TFormulaire
      title="Nouvelle nature d'opération"
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
        label="Description"
        name="description"
        value={item.description}
        maxlength={60}
        addChange={changeHandler}
      />
      <TInput
        label="Compte général associé"
        name="compteGeneralAssocie"
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
