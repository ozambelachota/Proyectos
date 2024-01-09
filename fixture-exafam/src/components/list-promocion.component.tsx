import { useEffect } from "react";
import { fixtureStore } from "../store/fixture.store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ListPromociones = () => {
  const {
    promocionParticipante,
    getDeporte,
    deporte,
    obtenerPromociones,
    grupo,
    obtenerGrupo,
  } = fixtureStore();

  promocionParticipante.sort((a, b) => a.id - b.id);

  useEffect(() => {
    obtenerPromociones();
    obtenerGrupo();
    getDeporte(1);
  }, [obtenerPromociones, obtenerGrupo, getDeporte]);

  return (
    <>
      <Typography variant="h2">Promocionales afiliados</Typography>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Fecha de Admisión</TableCell>
              <TableCell align="right">Deporte</TableCell>
              <TableCell align="right">Nombre de la Promoción</TableCell>
              <TableCell align="right">GRUPO</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promocionParticipante.map((promocion, index) => {
              const grupoFiltter = grupo.filter(
                (grupo) => grupo.id == promocion.grupo_id
              );
              return (
                <TableRow key={promocion.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">
                    {promocion.estado ? "Activo" : "Inactivo"}
                  </TableCell>
                  <TableCell align="right">
                    {promocion.fecha_admitido
                      ? new Date(promocion.fecha_admitido).toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell align="right">
                    {deporte.map((deporte) => deporte.nombre_tipo)}
                  </TableCell>
                  <TableCell align="right">
                    {promocion.nombre_promocion}
                  </TableCell>
                  <TableCell align="right">
                    {grupoFiltter.map((grupo) => grupo.nombre_grupo)}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`create/${promocion.id}`}>
                      Registrar promociones
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ListPromociones;
