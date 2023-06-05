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
import { OOperation } from "../_administration_/_init_";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";

export const ControleCaisse = ({ children }) => {
  const [items, setItem] = useState([]);

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

  const loadItems = (etat) => {
    api(ENDPOINTS.operationsEtat)
      .fetchById()
      .then((res) => setItem(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // Récupération de la chaîne JSON depuis le localStorage
    let etat = "OP";
    loadItems(etat);
  }, []);

  //
  const setBabalScript = (bab) => {
    return <>{bab}</>;
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
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
            { name: "Datecontrole" },
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
            {
              name: "",
              render: (o) => setBabalScript(o.IdcaisseNavigation?.Codecaisse),
            },
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
  const [item, setItem] = useState(OOperation);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const save = (e) => {};

  const [nature, setNature] = useState([]);
  const [personnel, setPersonnel] = useState([]);

  const loadItemsNature = () => {
    api(ENDPOINTS.natureoperations)
      .fetch()
      .then((res) => setNature(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // Récupération de la chaîne JSON depuis le localStorage
    const objString = localStorage.getItem("myData");
    const obj = JSON.parse(objString);

    item.Idcaisse = obj.caisse;
    item.Idexercice = obj.exercice;
    item.Idperiode = obj.periode;
    item.Idpersonnel = obj.personel;

    setItem({ ...OOperation });
    loadItemsNature();
  }, []);

  return (
    <TFormulaire
      title="Contrôle de l'opération de caisse"
      valPanel={<TValidationButton save={save} cancel={addQuiHandler} />}
    >
      <TLayout cols="1fr 1fr">
        <TInput
          type="date"
          label="Date de contrôle"
          name="Datecontrole"
          value={item.Datecontrole}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Contrôle effectué par"
          name="controlle_effectue_par"
          items={personnel}
          columnId="Idpersonnel"
          columnDisplay="Codepersonnel"
          value={item.Idpersonnel}
          maxlength={60}
          addChange={changeHandler}
        />
      </TLayout>

      <TLayout cols="1fr 1fr 1fr 1fr">
        <TInput
          type="number"
          label="Montant théorique"
          name="Montant"
          value={item.Montant}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          type="number"
          label="Montant physique"
          name="Montant"
          value={item.Montant}
          maxlength={60}
          addChange={changeHandler}
        />
        <TInput
          label="Ecart"
          name="ecart"
          // value={item.ecart}
          maxlength={60}
          addChange={changeHandler}
        />
        <TSelect
          label="Regularisation "
          name="regularisation"
          items={[
            { value: -1, label: "Non" },
            { value: 1, label: "Oui" },
          ]}
          columnId="value"
          columnDisplay="label"
          value={item.regularisation}
          addChange={changeHandler}
        />
        <TSelect
          label="Nature de regularisation "
          name="nature_regularisation"
          // items={}
          columnId="value"
          columnDisplay="label"
          value={item.nature_regularisation}
          addChange={changeHandler}
        />
      </TLayout>

      {children}
    </TFormulaire>
  );
};
