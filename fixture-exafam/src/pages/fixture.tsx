import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";


import { fixtureStore } from "../store/fixture.store";
import { GrupoStore } from "../store/grupoSotre.store";
import { FechaStore } from "../store/useFecha.store";
import { DatePicker, TimePicker } from "@mui/x-date-pickers-pro";

export const Fixture = () => {
  const grupos = GrupoStore((state) => state.grupos);
  const { obtenerGrupo, selectGrupo, selectedGrupo } = GrupoStore();
  const { fixture, obtenerPromocionGrupo, promocionesPorGrupos } =
    fixtureStore();
  const { fecha, setSelectFecha } = FechaStore();

  const [vsPromocion, setVsPromocion] = useState([
    {
      promocion1: "",
      promocion2: "",
      fecha: new Date()
    },
  ]);

  const [horaInicial, setHoraInicial] = useState(new Date()); // Hora inicial para los partidos

  useEffect(() => {
    obtenerGrupo();
    console.log(fecha);
    if (selectGrupo <= 0) return;
    else obtenerPromocionGrupo(selectGrupo);
    return () => {};
  }, [vsPromocion, selectGrupo]);

  const handleGeneratePartido = () => {
    const promocionesAleatorias = [...promocionesPorGrupos];
    const totalPromociones = promocionesAleatorias.length;
    if (totalPromociones < 2) {
      console.error("No hay suficientes promociones para generar partidos.");
      return;
    }

    const matches = [];
    const usedIndices = new Set();

    while (matches.length < totalPromociones / 2) {
      let index1, index2;

      // Escoge dos índices aleatorios que no se han usado previamente
      do {
        index1 = Math.floor(Math.random() * totalPromociones);
      } while (usedIndices.has(index1));

      usedIndices.add(index1);

      do {
        index2 = Math.floor(Math.random() * totalPromociones);
      } while (usedIndices.has(index2));

      usedIndices.add(index2);

      const equipo1 = promocionesAleatorias[index1].nombre_promocion;
      const equipo2 = promocionesAleatorias[index2].nombre_promocion;

      matches.push({
        promocion1: equipo1,
        promocion2: equipo2,
        fecha: new Date(horaInicial), // Asigna la fecha con la hora inicial
      });

      // Incrementa la hora inicial en 35 minutos para el próximo partido
      setHoraInicial(new Date(horaInicial.getTime() + 35 * 60 * 1000));
    }
    setVsPromocion(matches);
    console.log(vsPromocion);
  };

  const handleChangeSelectGrupo = (event) => {
    selectedGrupo(parseInt(event.target.value as string));
  };

  return (
    <>
      <Typography variant="h3">Generar partidos </Typography>

      <FormControl sx={{ margin: "20px" }}>
        <InputLabel id="select-grupo-label">Grupo</InputLabel>
        <Select
          labelId="select-grupo-label"
          id="select-grupo-select"
          value={selectGrupo}
          onChange={handleChangeSelectGrupo}
          label="Grupo"
        >
          <MenuItem value={0}>Seleccionar Grupo</MenuItem>
          {grupos.map(({ id, nombre_grupo }) => (
            <MenuItem key={id} value={id}>
              {nombre_grupo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DatePicker
        label="Fecha del primer partido"
        value={horaInicial}
        onChange={(date) => setHoraInicial(date)}
      />
      <TimePicker
        label="Hora del primer partido"
        value={horaInicial}
        onChange={(date) => setHoraInicial(date as Date)}
        minutesStep={35}
      />
      <Button
        sx={{ margin: "20px" }}
        variant="contained"
        onClick={() => {
          handleGeneratePartido();
        }}
        disabled={!selectGrupo}
      >
        {!fixture ? "Generar siguiente partido" : "Generar primera fecha"}
      </Button>
      <Button>Guardar fixture</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipo 1</TableCell>
              <TableCell>Equipo 2</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vsPromocion.map((promocion, index) => (
              <TableRow key={index}>
                <TableCell>{promocion.promocion1}</TableCell>
                <TableCell>{promocion.promocion2}</TableCell>
                <TableCell>{promocion.fecha.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
