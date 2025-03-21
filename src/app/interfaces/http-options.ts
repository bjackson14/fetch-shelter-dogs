import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptions {
  headers?: HttpHeaders,
  withCredentials?: boolean,
  params?: HttpParams
}