export class JsonResponse {
    constructor(
      public status_code: string,
      public status: string,
      public message: string,
      public auth_key: string,
      public userid: string
    ) { }
  }