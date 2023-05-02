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
import { OClotureCaisse } from "../_administration_/_init_";

export const ClotureCaisse = ({ children }) => {
  const [items, setItems] = useState([
    {
      c1: "CAISSE_PRINCIPALE",
      c2: "FEUWO",
      c3: "Charline",
      c4: 84000,
      c5: "25/04/2023",
    },
  ]);
  //
  const [open, setOpen] = useState({ clotureCaisse: false });

  const add = (e) => {
    setOpen({ ...open, clotureCaisse: true });
  };

  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Impression");
  };
  const validate = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Validation de la cloture");
  };

  const quit = (e) => {
    setOpen({ ...open, clotureCaisse: false });
  };

  return (
    <>
      <TFormList
        title="Liste des opérations de caisse contrôlées"
        options={
          <TValidationButton validate={validate} modify={add} print={print} />
        }
      >
        <TTable
          items={items}
          columns={["c1", "c2", "c3", "c4", "c5"]}
          columnsDisplay={[
            "Caisse",
            "Caissier",
            "Montant à la clôture",
            "Clôturé par",
            "Date de clôture",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.clotureCaisse && (
        <TModal>
          <EClotureCaisse addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EClotureCaisse = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OClotureCaisse);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire
      title="Opération de caisse contrôlée"
      valPanel={<TValidationButton save={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr 1fr">
        <TInput
          label="Caisse"
          name="caisse"
          value={(item.caisse = "CAISSE_PRINCIPALE")}
          maxlength={60}
          addChange={changeHandler}
        />

        <TInput
          label="Caissier"
          name="caissier"
          value={(item.caissier = "Charline")}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Montant à la clôture"
          name="montant_a_la_cloture"
          value={(item.montant_a_la_cloture = "84000")}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TLayout cols="1fr 1fr">
        <TSelect
          label="Clôturé par"
          name="cloture_par"
          items={[
            { value: false, label: "FEUWO" },
            { value: true, label: "NOUDI" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.cloture_par}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de clôture"
          name="date_cloture"
          value={item.date_cloture}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      {children}
    </TFormulaire>
  );
};
