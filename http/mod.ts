export type http = {
  url?: string;
  headers: Headers;
  response?: Response;
  fetchJson<T>(url: string, options: RequestInit): Promise<T>;
  fetch(url: string, options: RequestInit): Promise<Response>;
};

const Http: http = {
  headers: new Headers({ "Content-Type": "application/json" }),
  async fetchJson<T>(url: string, options: RequestInit) {
    await this.fetch(url, options);
    return await this.response?.json() as Promise<T>;
  },
  async fetch(url: string, options: RequestInit) {
    options.headers = Object.assign(this.headers, options.headers);
    this.response = await fetch(url, options);
    return this.response;
  },
};

export default Http;
