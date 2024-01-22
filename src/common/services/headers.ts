import { RootState } from "../../app/redux/store";

interface HeaderBuilder {
  prepareAuthorizationHeader(): HeaderBuilder;

  build(): Headers;
}

class _HeaderBuilder implements HeaderBuilder {
  private readonly headers: Headers;
  private getState: () => unknown;

  constructor(headers: Headers, getState: () => unknown) {
    this.headers = headers;
    this.getState = getState;
  }

  prepareAuthorizationHeader(): HeaderBuilder {
    const token = (this.getState() as RootState).authentication.token;

    if (token) {
      this.headers.set("authorization", `Bearer ${token}`);
    }

    return this;
  }

  public build(): Headers {
    return this.headers;
  }
}

export const GetHeaderBuilder: (
  headers: Headers,
  getState: () => unknown
) => HeaderBuilder = (headers, getState) =>
  new _HeaderBuilder(headers, getState);
