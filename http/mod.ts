export abstract class Http {
  declare url: string;
  declare headers: Headers;
  declare token: string;
  declare response: Response;

  constructor(url: string, headers: HeadersInit, token?: string) {
    this.url = url;
    this.headers = new Headers(headers);
    token && (this.token = token);
  }

  get ok() {
    return this.response.ok;
  }

  get status() {
    return this.response.status;
  }

  get statusText() {
    return this.response.statusText;
  }

  async get(uri: string, headers = new Headers()) {
    return await this.fetch(uri, { method: 'GET', headers: headers });
  }

  async post(
    uri: string,
    body: Record<never, never>,
    headers = new Headers(),
  ) {
    return await this.fetch(uri, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });
  }

  async put(
    uri: string,
    body: Record<never, never>,
    headers = new Headers(),
  ) {
    return await this.fetch(uri, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: headers,
    });
  }

  async delete(uri: string, headers = new Headers()) {
    return await this.fetch(uri, { method: 'DELETE', headers: headers });
  }

  async options<T = Record<never, never>>(
    uri: string,
    headers = new Headers(),
  ) {
    return await this.fetch(uri, { method: 'OPTIONS', headers: headers });
  }

  async patch(
    uri: string,
    body: Record<never, never>,
    headers = new Headers(),
  ) {
    return await this.fetch(uri, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: headers,
    });
  }

  async fetch(uri: string, options: RequestInit) {
    return await fetch(uri, options);
  }

  abstract fetchJson<T>(
    uri: string,
    options: RequestInit,
  ): Promise<T>;
}
