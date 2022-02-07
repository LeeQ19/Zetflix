import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: {
      darkest?: string,
      darker?: string,
      default?: string,
      lighter?: string,
      lightest?: string,
    },
    black: {
      darkest?: string,
      darker?: string,
      default?: string,
      lighter?: string,
      lightest?: string,
    },
    white: {
      darkest?: string,
      darker?: string,
      default?: string,
      lighter?: string,
      lightest?: string,
    },
    scrollColor?: string,
  }
}
