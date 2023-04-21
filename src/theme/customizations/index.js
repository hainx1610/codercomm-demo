import Card from "./Card";
import Link from "./Link";
import Tabs from "./Tabs";

function customizeComponents(theme) {
  return { ...Link(theme), ...Card(theme), ...Tabs(theme) };
}

export default customizeComponents;
