import { Deporte, Fixture } from './../types/fixture.api.type';
import { create } from 'zustand';
import { GrupoPromocion, PromocionParticipante } from '../types/fixture.api.type';
import { obtenerGrupo, obtenerDeporte, obtenerPromocionalesParticipantes, obtenerPromocionesPorGrupos } from '../services/api.service';
type Store = {
  promocionParticipante: PromocionParticipante[];
  promocionesPorGrupos: PromocionParticipante[];
  grupo: GrupoPromocion[];
  deporte: Deporte[];
  fixture: Fixture[];
  fecha: Date;
  selectGrupo: number;
  obtenerPromociones: () => Promise<void>;
  obtenerGrupo: () => Promise<void>;
  getDeporte: (id: number) => Promise<void>;
  obtenerPromocionGrupo: (id: number) => Promise<void>;


};

export const fixtureStore = create<Store>((set) => ({
  promocionParticipante: [{
    id: 0,
    campeonato_id: 0,
    create_at: new Date(),
    estado: false,
    fecha_admitido: new Date(),
    grupo_id: 0,
    nombre_promocion: '',
    tipo_id: 0,
  }],
  promocionesPorGrupos: [
    { campeonato_id: 0, create_at: new Date(), estado: false, fecha_admitido: new Date, grupo_id: 0, id: 0, nombre_promocion: '', tipo_id: 0 }
  ],
  grupo: [{
    id: 0,
    nombre_grupo: ''
  }],
  deporte: [{
    id: 0,
    nombre_tipo: ''

  }],
  fixture: [{
    campo_id: 0,
    fecha_partido: new Date(),
    grupo_id: 0,
    promocion: '',
    tipo_id: 0,
    vs_promocion: ''
  }],
  fecha: new Date(),
  selectGrupo: 1,
  obtenerPromociones: async () => {
    const promociones = await obtenerPromocionalesParticipantes()
    set({ promocionParticipante: promociones })
  },
  getDeporte: async (id: number) => {
    const deporte = await obtenerDeporte(id)
    set({ deporte })
  },
  obtenerGrupo: async () => {
    const grupo = await obtenerGrupo()
    set({ grupo })
  },
  obtenerPromocionGrupo: async (id: number) => {
    const promociones = await obtenerPromocionesPorGrupos(id)
    set({ promocionesPorGrupos: promociones })
  },
}))

