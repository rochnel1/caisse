import { React } from "react";
import { ScaleLoader } from "react-spinners";

export const Load = (loading) => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <ScaleLoader
        color={"#7003a6"}
        aria-label="Chargement des données"
        loading={loading}
        size={300}
        aria-aria-labelledby="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
