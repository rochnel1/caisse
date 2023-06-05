import React from "react";

const server = process.env.REACT_APP_SERVER_URL;
const port = process.env.REACT_APP_SERVER_PORT;

export const setURL = (api) => {
  return `${server}:${port}/api/${api}`;
};

export const ENDPOINTS = {
  groupeUtilisateur: "Groupeutilisateurs",
  utilisateurs: "Utilisateurs",
  exercices: "Exercices",
  periodes: "Periodes",
  periodesExercice: "Periodes/exercice",
  compteGenerals: "Comptegenerals",
  natureoperations: "Natureoperations",
  caisses: "Caisses",
  personnels: "Personnels",
  operations: "Operations",
  operationsEtat: "Operations/etat",
  budgets: "Budgets",
  budgetsRealisation: "Budgets/realisations",
  generalites: "Generalites",
};
