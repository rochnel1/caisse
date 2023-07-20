export const OUtilisateur = {
  IdUtilisateur: 0,
  Login: "",
  Nomutilisateur: "",
  Prenomutilisateur: "",
  Idgpeutilisateur: 0,
};

export const OGroupeUtilisateur = {
  Idgpeutilisateur: 0,
  Nomgroupe: "",
};

export const OCaisse = {
  Idcaisse: 0,
  Codecaisse: "",
  Descriptioncaisse: "",
  compteGeneral: "",
  JournalComptable: "",
  Idcompte: 0,
};

export const OPersonnel = {
  Idpersonnel: 0,
  Codepersonnel: "",
  Nom: "",
  Prenom: "",
  Profil: "",
  Idcaisse: 0,
};

export const ONatureOperation = {
  Idnatureoperation: 0,
  Idcompte: 0,
  Codenature: "",
  Description: "",
  Typenature: 0,
  Sensnature: 0,
};

export const OExercice = {
  Idexercice: 0,
  Code: "",
  Datedebut: new Date(),
  Datefin: new Date(),
  Statut: false,
  Cloture: false,
};

export const OPeriode = {
  Idperiode: 0,
  Codeperiode: "",
  Datedebut: new Date(),
  Datefin: new Date(),
  Idexercice: 0,
};

export const OComptabilisation = {
  journalCompta: "",
  numPiece: "",
  date_piece: "",
  compteGeneral: "",
  libeblleOperation: "",
  montant_debit: "",
  montant_credit: "",
};

export const OInitBudget = {
  Idbudget: 0,
  Idnatureoperation: 0,
  Idperiode: 0,
  Idexercice: 0,
  Montantbudget: 0,
  Sensbudget: 0,
};

export const OGeneralite = {
  Raisonsocial: "",
  nom_commercial: "",
  Adresse: "",
  Ville: "",
  Region: "",
  Pays: "",
  Monnaie: "",
  Format: "",
  Niu: "",
  Registrecommerce: "",
  Telephone: "",
  Adressemail: "",
  Siteinternet: "",
};

export const OOuvertureCaisse = {
  caisse: "",
  caissier: "",
  exercice: "",
  periode: "",
  compte_caisse: "",
};

export const OClotureCaisse = {
  caisse: "",
  cloture_par: "",
  caissier: "",
  montant_a_la_cloture: "",
  date_cloture: "",
};

export const OOperation = {
  Idoperation: 0,
  Idcaisse: 0,
  Idpersonnel: 0,
  Idexercice: 0,
  Idperiode: 0,
  Idnatureoperation: 0,
  Dateoperation: new Date(),
  Description: "",
  Montant: "",
  MontantPercu: "",
  Sens: 0,
  Etat: "OP",
  Nbrecontrole: "",
  Controlerpar: 0,
  Comptabilserpar: "",
  Datecontrole: "",
  Datecloture: "",
  Datecomptabilisation: "",
  Cloturepar: 0,
  Regularise: false,
};

export const OPlanComptable = {
  Idcompte: 0,
  Numcompte: "",
  Intitule: "",
};
