import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PromocionStore } from '../store/promocionales.store';
import { Grid } from '@mui/material';

function PromocionalForm() {
  const { control, handleSubmit } = useForm();

  const { promocion,agregarPromocion } = PromocionStore()

  const onSubmit = (data) => {
   
   console.log(data)
    // agregarPromocion(data)

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}> {/* Agrega un margen entre las columnas */}
        <Grid item xs={6}> {/* Define el ancho de la columna */}
          <Controller
            name="nombre_promocional"
            control={control}
            defaultValue={promocion.nombre_promocional}
            render={({ field }) => (
              <TextField label="Nombre Promocional" {...field} fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="apellido_promocional"
            control={control}
            defaultValue={promocion.apellido_promocional}
            render={({ field }) => (
              <TextField label="Apellido Promocional" {...field} fullWidth />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="fecha_nacimiento"
            control={control}
            defaultValue={promocion.fecha_nacimiento}
            render={({ field }) => (
              <TextField label="Fecha de Nacimiento" type="date" {...field} fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="codigo_promocional"
            control={control}
            defaultValue={promocion.codigo_promocional}
            render={({ field }) => (
              <TextField label="Código Promocional" {...field} fullWidth />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="id_promocion_participante"
            control={control}
            defaultValue={promocion.id_promocion_participante}
            render={({ field }) => (
              <TextField label="ID Promoción Participante" type="number" {...field} fullWidth />
            )}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </form>
  );
}

export default PromocionalForm;
