import {create} from 'zustand' 
import { Promocional } from '../types/fixture.api.type'
import { insertarPromociones } from '../services/api.service';

type promocionType = {
  promocion: Promocional;
  agregarPromocion: (promocion:Promocional)=> Promise<void>
}
export const PromocionStore = create<promocionType>((set)=>({
  promocion:{
    id:0,
    nombre_promocional:'',
    apellido_promocional:'',
    codigo_promocional:'',
    fecha_nacimiento: new Date(),
    id_promocion_participante:0
  },
  agregarPromocion: async (promocion:Promocional) =>{
    try {

      if(promocion){
        await insertarPromociones(promocion)
        set({promocion})
      }else{
        console.log("error al enviar")
      }
    } catch (error) {
      console.error(error)
    }
  }

}))