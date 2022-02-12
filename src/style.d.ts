import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red:   IColor,
    black: IColor,
    gray:  IColor,
    white: IColor,
  }

  export interface IColor {
    darkest?: string,
    darker?: string,
    default?: string,
    lighter?: string,
    lightest?: string,
  }
}
