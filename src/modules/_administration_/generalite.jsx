import { useEffect, useState } from "react";
import {
  TFormList,
  TFormulaire,
  TInput,
  TLayout,
  TValidationButton,
} from "../../utils/__";
import { OGeneralite } from "./_init_";
import { ENDPOINTS } from "../../utils/Variables";
import { api } from "../../utils/api";

export const Generalite = ({ children }) => {
  const [item, setItem] = useState(OGeneralite);

  const changeHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    delete item.nom_commercial;
    await api(ENDPOINTS.generalites).post(item);
  };

  const print = (e) => {
    console.log("Imprimer = " + item);
  };

  return (
    <>
      <div>
        <TFormulaire title="Informations sur l'entreprise">
          <TInput
            label="Nom commercial"
            name="nom_commercial"
            value={item.nom_commercial}
            maxlength={60}
            addChange={changeHandler}
          />
          <TLayout cols="1fr 1fr">
            <TInput
              label="Raison sociale"
              name="Raisonsocial"
              value={item.Raisonsocial}
              maxlength={10}
              addChange={changeHandler}
            />
            <TInput
              label="Adresse"
              name="Adresse"
              value={item.Adresse}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
          <TLayout cols="1fr 1fr 1fr 1fr">
            <TInput
              label="Ville"
              name="Ville"
              value={item.Ville}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Région"
              name="Region"
              value={item.Region}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Pays"
              name="Pays"
              value={item.Pays}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Monnaie"
              name="Monnaie"
              value={item.Monnaie}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
          <TLayout cols="1fr 1fr 1fr">
            <TInput
              label="Format"
              name="Format"
              value={item.Format}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="NIU"
              name="Niu"
              value={item.Niu}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Registre de commerce"
              name="Registrecommerce"
              value={item.Registrecommerce}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
          <TLayout cols="1fr 1fr 1fr">
            <TInput
              label="Telephone"
              name="Telephone"
              value={item.Telephone}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Adresse Mail"
              name="Adressemail"
              value={item.Adressemail}
              maxlength={60}
              addChange={changeHandler}
            />
            <TInput
              label="Site internet"
              name="Siteinternet"
              value={item.Siteinternet}
              maxlength={60}
              addChange={changeHandler}
            />
          </TLayout>
        </TFormulaire>
        <TValidationButton print={print} save={save} />
      </div>
    </>
  );
};
