export class TemplateSettings{
    userId?: string; 
    phoenixIsNavbarVerticalCollapsed: boolean;
    phoenixIsRTL: boolean;
    phoenixNavbarPosition: NavbarPosition;
    phoenixNavbarTopShape: NavbarTopShape;
    phoenixNavbarTopStyle: NavbarStyle;
    phoenixNavbarVerticalStyle: NavbarStyle;
    phoenixSupportChat: boolean;
    phoenixTheme: Theme;
    constructor() {
      this.phoenixIsNavbarVerticalCollapsed = false;
      this.phoenixIsRTL = false;
      this.phoenixNavbarPosition =NavbarPosition.Vertical;
      this.phoenixNavbarTopShape = NavbarTopShape.slim;
      this.phoenixNavbarTopStyle = NavbarStyle.default;
      this.phoenixNavbarVerticalStyle = NavbarStyle.default;
      this.phoenixSupportChat = false;
      this.phoenixTheme = Theme.light;
    }
}

export enum NavbarPosition{
    Horizontal = 'horizontal',
    Vertical = 'vertical',
    Combo='combo'
}
export enum Theme{
    light="light",
    dark="dark",
    auto="auto"
}
export enum NavbarStyle{
    darker="darker",
    default="default"
}
export enum NavbarTopShape{
    slim="slim",
    default="default"
}