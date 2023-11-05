import { clientApi } from "../api/client.api";
import { Fixture, Promocional } from "../types/fixture.api.type";
export const obtenerPromocionalesParticipantes = async () => {
  try {
    const { data:Promociones, error } = await clientApi.from('promocion_participante').select();
    if (error) throw error;
    return Promociones;
  } catch (error) {
    console.error("Error al obtener los promocionales participantes: ", error);
  }
}
export const obtenerGrupo = async () => {
try {
  const { data:Grupo,error} = await clientApi.from("grupos_promociones").select();

  if (error) throw error;
  return Grupo;

}catch(error){
  console.error("no se encontraron grupos : ", error);
}

}
export const fixturePartidos = async (fixture:Fixture[]) => {
  const {data:fixtureData,error} = await clientApi.from("exafam_fixture").insert(fixture);

  if (error) throw error;
  return fixtureData;
}

export const signInGoogle= async()=>{
  try {
    const {data:Usuario,error} = await clientApi.auth.signInWithOAuth({
      provider:'google'   })
      if (error) throw new Error('ocurrio un error durante inicio de sesion');
      
    return Usuario;
  } catch (error) {
    console.error(error)
  }
}
export const signOut =async ()=>
{
  const {error}= await clientApi.auth.signOut();
  if (error) throw new Error('ocurrio un error al cerrar session');
}

export const obtenerDeporte= async (id:number)=>{
  const {data:deporte,error} = await clientApi.from('tipo_deporte').select('nombre_tipo').eq('id', id);
  if (error) throw error;
  return deporte;
}

export const obtenerPromocionesPorGrupos = async (id:number)=>{
  try {
    const {data:promociones,error} = await clientApi.from("promocion_participante").select('*').eq('grupo_id',id);
    if (error) throw error
    return promociones;
  } catch (error) {
    throw new Error("error al obtener promociones")
  }
}  

export const insertarPromociones = async (promocionl:Promocional) =>{
  try{
    const {data:newPromocional,error} = await clientApi.from('Promocionales').insert(promocionl)
    if(error) throw error
    return newPromocional
  }catch(error){
    throw new Error("error al agregar promocion "+ error);
  }
 }