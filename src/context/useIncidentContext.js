import { useContext } from "react";
import { IncidentContext } from "./incidentContextInstance";

export const useIncidentContext = () => useContext(IncidentContext);
