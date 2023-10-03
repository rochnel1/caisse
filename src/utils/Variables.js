import React from "react";

const server = process.env.REACT_APP_SERVER_URL;
const port = process.env.REACT_APP_SERVER_PORT;

export const setURL = (api) => {
  return `${server}:${port}/api/${api}`;
};

export const ENDPOINTS = {
  groupeUtilisateur: "Groupeutilisateurs",
  utilisateurs: "Utilisateurs",
  authentification: "Utilisateurs/login",
  exercices: "Exercices",
  periodes: "Periodes",
  periodesExercice: "Periodes/exercice",
  compteGenerals: "Comptegenerals",
  natureoperations: "Natureoperations",
  caisses: "Caisses",
  personnels: "Personnels",
  operations: "Operations",
  operationsCtrl: "Operations/Controle",
  operationsClo: "Operations/Cloture",
  operationsCompta: "Operations/Compta",
  operationsComptabiliser: "Operations/Comptabiliser",
  operationsComptabiliserSage: "Operations/ComptabiliserSage",
  budgets: "Budgets",
  budgetsRealisation: "Budgets/realisations",
  generalites: "Generalites",
};
