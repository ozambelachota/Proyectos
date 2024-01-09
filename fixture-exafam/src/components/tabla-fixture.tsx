import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { fixtureStore } from "../store/fixture.store";
import { Fixture } from "../types/fixture.api.type";

const TablaFixture: React.FC = () => {
  const partidos = fixtureStore((state) => state.fixture);
  const obtenerPartido = fixtureStore((state) => state.partidosPorFecha);

  useEffect(() => {
    obtenerPartido();
  }, []);

  // Función para agrupar los partidos por grupo_id
  const groupBy = (array: any[] | null, key: string) => {
    if (!array) {
      return {};
    }

    return array.reduce((result, currentValue) => {
      const groupKey = currentValue[key];
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {} as { [key: string]: any[] });
  };
  const partidosAgrupados = groupBy(partidos, "grupo_id");

  return (
    <div>
      <Box mb={4}>
        <Typography variant="h5" mb={2}></Typography>
        {Object.keys(partidosAgrupados).map((grupoId) => (
          <div key={grupoId}>
            <Typography variant="h6" mb={2}>{`Grupo ${grupoId}`}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Promocion</TableCell>
                    <TableCell>VS</TableCell>
                    <TableCell>Promocion</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Campo</TableCell>
                    <TableCell>Ronda</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {partidosAgrupados[grupoId].map((partido: Fixture) => (
                    <TableRow key={partido.id}>
                      <TableCell>{partido.promocion}</TableCell>
                      <TableCell>VS</TableCell>
                      <TableCell>{partido.vs_promocion}</TableCell>
                      <TableCell>
                        {partido.fecha_partido.toLocaleString()}
                      </TableCell>
                      <TableCell>{partido.campo_id}</TableCell>
                      <TableCell>{partido.n_fecha_jugada}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default TablaFixture;
