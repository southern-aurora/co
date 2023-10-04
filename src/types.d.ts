declare module "@poech/camel-hump-under" {
  const T: {
    camel: (str: string) => string;
    hump: (str: string) => string;
    hyphen: (str: string) => string;
    underline: (str: string) => string;
  };
  export = T;
}
