export const OUtilisateur = {
  login: "",
  noms: "",
  prenoms: "",
  mdp: "",
  idGroupe: 0,
};

export const OGroupeUtilisateur = {
  idGroupe: 0,
  nomGroupe: "",
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
  code: "",
  description: "",
  compteGeneralAssocie: "",
  typeNature: "",
  sens: "",
};

export const OExercice = {
  code: "",
  date_debut: "",
  date_fin: "",
  statut: "",
  cloture: "",
};

export const OPeriode = {
  exercice: "",
  code_periode: "",
  date_debut: "",
  date_fin: "",
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

export const OEnregEnDecaissement = {
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
