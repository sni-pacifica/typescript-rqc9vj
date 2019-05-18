export namespace Logger {

  const appDiv: HTMLElement = document.getElementById('log');

  export const clear = () => {
    appDiv.innerHTML = "";
  }

  export const log = (x: any, cssColor?: string) => {
    appDiv.innerHTML = appDiv.innerHTML +
      (cssColor ? styledP(x, cssColor) : simpleP(x));
  }

  const simpleP = (x: any) => `<p> > ${x}</p>`

  const styledP = (x: any, hexColor?: string) => `<p style="color:${hexColor}"> > ${x}</p>`

}