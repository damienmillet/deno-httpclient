export type http = {
  url?: string;
  headers: Headers;
  response?: Response;
  fetchJson<T>(url: string, options?: RequestInit): Promise<T>;
  fetch(url: string, options?: RequestInit): Promise<Response>;
  setCookies(cookies: string): void;
};

export const Http: http = {
  headers: new Headers({ "Content-Type": "application/json" }),
  async fetchJson<T>(url: string, options?: RequestInit) { // RequestInit
    await this.fetch(url, options);
    return await this.response?.json() as Promise<T>;
  },
  async fetch(url: string, options?: RequestInit) {
    if (!options) options = {};
    options.headers = Object.assign(this.headers, options?.headers);
    this.response = await fetch(url, options);
    if (this.response.headers.get("set-cookie")) {
      this.setCookies(this.response.headers.get("set-cookie")!);
    }
    return this.response;
  },
  setCookies(cookies: string) {
    this.headers.set("cookie", cookies);
  }
};
