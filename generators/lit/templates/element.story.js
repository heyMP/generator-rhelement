import { storiesOf } from "@storybook/polymer";
import "./<%= elementName %>";

storiesOf("Card", module).add(
  "<%= elementName %>",
  () => `
  <<%= elementName %>>
    MP
  </<%= elementName %>>
  `
);
