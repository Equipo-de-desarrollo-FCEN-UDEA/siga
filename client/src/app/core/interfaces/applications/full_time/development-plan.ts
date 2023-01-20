export interface tema {
    id: number;
    titulo: string;
    subtitulo: string;
    objetivos: objetivo[];
}


export interface objetivo {
    id: number;
    descripcion: string;
    acciones: accion[];
    indicadores?: indicador[];
}


export interface accion {
    id: number;
    descripcion: string;
}


export interface indicador {
    id: number;
    descripcion: string;
}

export interface DevelopmentPlan {
    topics: tema[]
}