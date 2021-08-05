import { Element, useEditor } from "@craftjs/core";
import {
  Box,
  Button as MaterialButton,
  Grid,
  Typography
} from "@material-ui/core";
import * as React from "react";
import { Button } from "./user/Button";
import { Card } from "./user/Card";
import { Container } from "./user/Container";
import { Text } from "./user/Text";

export const Toolbox: React.FC = () => {
  const { connectors } = useEditor();
  return (
    <Box px={2} py={2}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Typography>Drag to add</Typography>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) =>
              connectors.create(ref, <Button>Click me</Button>)
            }
            variant="contained"
          >
            Button
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) =>
              connectors.create(ref, <Text text="Hi world" fontSize={14} />)
            }
            variant="contained"
          >
            Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) =>
              connectors.create(
                ref,
                <Element is={Container as any} padding={20} canvas />
              )
            }
            variant="contained"
          >
            Container
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) =>
              connectors.create(ref, <Card background="#fff" padding={4} />)
            }
            variant="contained"
            disabled
          >
            Card
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
