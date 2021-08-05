import {
  Element,
  Node,
  NodeElementProps,
  useNode,
  UserComponent
} from "@craftjs/core";
import * as React from "react";
import { Button } from "./Button";
import { Container, ContainerSettings } from "./Container";
import { Text } from "./Text";

interface Props {
  background: string;
  padding: number;
}

export const CardTop: React.FC<NodeElementProps> = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div className="text-only" ref={(ref: any) => connect(ref)}>
      {children}
    </div>
  );
};

(CardTop as UserComponent).craft = {
  rules: {
    // Only accept Text
    canMoveIn: (incomingNode: Node) => incomingNode.data.type == Text,
  },
};

export const CardBottom: React.FC<NodeElementProps> = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div className="buttons-only" ref={(ref: any) => connect(ref)}>
      {children}
    </div>
  );
};

(CardTop as UserComponent).craft = {
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNode: Node) => incomingNode.data.type == Button,
  },
};

export const Card: React.FC<Props> = ({ background, padding = 20 }) => (
  <Container background={background} padding={padding}>
    <Element id="texts" is={CardTop} canvas>
      <Text text="Title" fontSize={20} />
      <Text text="Subtitle" fontSize={15} />
    </Element>
    <Element id="buttons" is={CardBottom} canvas>
      <Button size="small" variant="contained" color="primary">
        Learn more
      </Button>
    </Element>
  </Container>
);

(Card as UserComponent).craft = {
  related: {
    settings: ContainerSettings,
  },
};
