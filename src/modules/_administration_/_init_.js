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
  code: "",
  description: "",
  compteGeneral: "",
  journalCompta: "",
};

export const OPersonnel = {
  code: "",
  noms: "",
  prenoms: "",
  profils: "",
  caisseAssocie: "",
};

export const ONatureOperation = {
  idnatureoperation: 0,
  idcompte: 0,
  code: "",
  description: "",
  compteGeneralAssocie: "",
  typeNature: "",
  sens: "",
};

export const OExercice = {
  idexercice: 0,
  code: "",
  datedebut: "",
  datefin: "",
  statut: "",
  cloture: "",
};

export const OPeriode = {
  idperiode: 0,
  exercice: "",
  codeperiode: "",
  datedebut: "",
  datefin: "",
  idexercice: 0,
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
  exercice: "",
  periode: "",
  date_debut: "",
  date_fin: "",
  nature_operation: "",
  montant: "",
  sens: "",
};

export const OGeneralite = {
  raison_sociale: "",
  nom_commercial: "",
  adresse: "",
  ville: "",
  region: "",
  pays: "",
  monnaie: "",
  format: "",
  niu: "",
  registre_commerce: "",
  telephone: "",
  adresse_mail: "",
  site_internet: "",
};

export const OOuvertureCaisse = {
  caisse: "",
  caissier: "",
  exercice: "",
  periode: "",
  compte_caisse: "",
};

export const OControleCaisse = {
  caisse: "",
  date_controle: "",
  controlle_effectue_par: "",
  caissier: "",
  montant_theorique: "",
  montant_physique: "",
  ecart: "",
  regularisation: "",
  nature_regularisation: "",
  compte_general_associe: "",
  compte_caisse: "",
};

export const OClotureCaisse = {
  caisse: "",
  cloture_par: "",
  caissier: "",
  montant_a_la_cloture: "",
  date_cloture: "",
};

export const OEnregistrement = {
  caisse: "",
  caissier: "",
  date_operation: "",
  description_operation: "",
  montant_operation: "",
  sens: "",
  exercice: "",
  periode: "",
  nature_operation: "",
  compte_general_associe: "",
  compte_caisse: "",
  etat: "",
};

export const OPlanComptable = {
  idcompte: 0,
  numcompte: "",
  intitule: "",
};
export const OSuivRealisation = {
  exercice: "",
  periode: "",
};
