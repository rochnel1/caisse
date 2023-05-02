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
import { OControleCaisse } from "../_administration_/_init_";

export const ControleCaisse = ({ children }) => {
  const [items, setItem] = useState([
    {
      c1: "CAISSE_PRINCIPALE",
      c2: "25/04/2023",
      c3: "Rochnel",
      c4: "Charline",
      c5: "85000",
      c6: "84000",
      c7: "-1000",
      c8: "oui",
      c9: "PERTE_SUR_CTRL",
      c10: "47xxx",
      c11: "57xxxx",
    },
  ]);

  const [open, setOpen] = useState({ controleCaisse: false });
  const add = (e) => {
    setOpen({ ...open, controleCaisse: true });
  };
  const validate = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Validation");
  };
  const saveAndPrint = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Sauvegarde et Impression");
  };
  const quit = (e) => {
    setOpen({ ...open, controleCaisse: false });
  };
  return (
    <>
      <TFormList
        title="Liste des opérations sur les caisses ouvertes"
        options={
          <TValidationButton
            modify={add}
            validate={validate}
            print={saveAndPrint}
          />
        }
      >
        <TTable
          items={items}
          columns={[
            "c1",
            "c2",
            "c3",
            "c4",
            "c5",
            "c6",
            "c7",
            "c8",
            "c9",
            "c10",
            "c11",
          ]}
          columnsDisplay={[
            "Caisse",
            "Date de contrôl",
            "Contrôle effectué par",
            "Caissier",
            "Montant théorique",
            "Montant physique",
            "Ecart",
            "Regularisation",
            "Nature de regularisation",
            "Compte général associé",
            "Compte caisse",
          ]}
          // columnsWidth={["120px", "auto"]}
        ></TTable>
      </TFormList>
      {open.controleCaisse && (
        <TModal>
          <EControleCaisse addQuiHandler={quit} />
        </TModal>
      )}
    </>
  );
};

export const EControleCaisse = ({ children, addQuiHandler }) => {
  const [item, setItem] = useState(OControleCaisse);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    console.log(item);
  };
  return (
    <TFormulaire
      title="Contrôle de l'opération de caisse"
      valPanel={<TValidationButton save={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr 1fr 1fr">
        <TSelect
          label="Caisse"
          name="caisse"
          items={[{ value: false, label: "CAISSE_PRINCIPALE" }]}
          columnId="value"
          columnDisplay="label"
          value={item.caisse}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="date"
          label="Date de contrôle"
          name="date_controle"
          value={item.date_controle}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Contrôle effectué par"
          name="controlle_effectue_par"
          items={[
            { value: false, label: "NOUDI" },
            { value: true, label: "ROCHNEL" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.controlle_effectue_par}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Caissier"
          name="caissier"
          items={[
            { value: false, label: "Charline" },
            { value: true, label: "Phirmin" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.caissier}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TLayout cols="1fr 1fr 1fr 1fr">
        <TInput
          type="number"
          label="Montant théorique"
          name="montant_theorique"
          value={(item.montant_theorique = "85000")}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="number"
          label="Montant physique"
          name="montant_physique"
          value={(item.montant_physique = "84000")}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Ecart"
          name="ecart"
          value={item.ecart}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Regularisation "
          name="regularisation"
          items={[
            { value: false, label: "Non" },
            { value: true, label: "Oui" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.regularisation}
          addChange={changeHandler}
        />
        <TSelect
          label="Nature de regularisation "
          name="nature_regularisation"
          items={[
            { value: false, label: "PERTE_SUR_CTRL" },
            { value: true, label: "GAIN_SUR_CTRL" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.nature_regularisation}
          addChange={changeHandler}
        />
        <TInput
          label="Compte général associé"
          name="compte_general_associe"
          value={(item.compte_general_associe = "47xxxx")}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Compte caisse"
          name="compte_caisse"
          value={(item.compte_caisse = "57xxxx")}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      {children}
    </TFormulaire>
  );
};
