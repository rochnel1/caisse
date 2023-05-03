import { useState } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TLayout,
  TValidationButton,
} from "../../utils/__";
import { OGeneralite } from "./_init_";

export const Generalite = ({ children }) => {
  const [items, setItems] = useState([
    {
      c1: "GROUPE SIA",
      c2: "Groupe Système Informatique & application",
      c3: "Elig Essoono",
      c4: "Yaoundé",
      c5: "Center",
      c6: "Cameroun",
      c7: "FCFA",
      c8: "###",
      c9: "MxxxxxxP",
      c10: "RCCM/YAO/",
      c11: "+237 6",
      c12: "contact@groupesia.com",
      c13: "groupesia.com",
    },
  ]);
  //
  const [open, setOpen] = useState({ utilisateur: false });

  return (
    <>
      <EGeneralite />
    </>
  );
};

export const EGeneralite = ({ children }) => {
  const [item, setItem] = useState(OGeneralite);
  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const groupe = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Save ");
  };
  const print = (e) => {
    // setOpen({ ...open, groupe: true });
    console.log("Imprimer ");
  };

  return (
    <div>
      <TFormulaire title="Informations sur l'entreprise">
        <TInput
          label="Nom commercial"
          name="nom_commercial"
          value={
            (item.nom_commercial = "Groupe Système Informatique & application")
          }
          maxlength={60}
          addChange={changeHandler}
        />
        <TLayout cols="1fr 1fr">
          <TInput
            label="Raison sociale"
            name="raison_sociale"
            value={(item.raison_sociale = "GROUPE SIA")}
            maxlength={10}
            addChange={changeHandler}
          />
          <TInput
            label="Adresse"
            name="adresse"
            value={(item.adresse = "Elig Essoono")}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>
        <TLayout cols="1fr 1fr 1fr 1fr">
          <TInput
            label="Ville"
            name="ville"
            value={(item.ville = "Yaoundé")}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Région"
            name="region"
            value={(item.region = "Centre")}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Pays"
            name="pays"
            value={(item.pays = "Cameroun")}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Monnaie"
            name="monnaie"
            value={(item.monnaie = "FCFA")}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>
        <TLayout cols="1fr 1fr 1fr">
          <TInput
            label="Format"
            name="format"
            value={item.format}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="NIU"
            name="niu"
            value={item.niu}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Registre de commerce"
            name="registre_commerce"
            value={(item.registre_commerce = "RCCM/YAO")}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>
        <TLayout cols="1fr 1fr 1fr">
          <TInput
            label="Telephone"
            name="telephone"
            value={item.telephone}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Adresse Mail"
            name="adresse_mail"
            value={(item.adresse_mail = "contact@groupesia.com")}
            maxlength={60}
            addChange={changeHandler}
          />
          <TInput
            label="Site internet"
            name="site_internet"
            value={(item.site_internet = "groupesia.com")}
            maxlength={60}
            addChange={changeHandler}
          />
        </TLayout>
      </TFormulaire>
      <TValidationButton print={print} save={groupe} />
    </div>
  );
};
