import { ContextualMenuComponent } from "../../components/contextual-menu/contextual-menu.component";
import { ContextualItemType } from "../enum/contextual-item-type";

export interface ContextualMenuItem {
  svg?: { icon: string, style?: string | undefined }[];
  title?: string;
  callback?: () => void;
  type?: ContextualItemType;
  subMenu?: { items: ContextualMenuComponent };
}
