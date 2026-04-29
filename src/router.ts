import { IncomingMessage , ServerResponse } from "http";

export type Handler  = (req : any , res : any) => void;