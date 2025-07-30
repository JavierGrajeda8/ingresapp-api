import { RespuestaDetalle } from './respuestaDetalle';

export interface Respuesta {
  timestamp: number;
  provider: string;
  status?: number;
  type?: number;
  response?: any;
  count: number;
  error?: string;
  statusCode?: number;
}
