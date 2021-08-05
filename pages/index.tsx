import { Editor, Element, Frame } from "@craftjs/core";
import { Grid, Paper, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import { SettingsPanel } from "../components/SettingsPanel";
import { Toolbox } from "../components/ToolBox";
import { Topbar } from "../components/TopBar";
import { Button } from "../components/user/Button";
import { Card, CardBottom, CardTop } from "../components/user/Card";
import { Container } from "../components/user/Container";
import { Text } from "../components/user/Text";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sweet Popup Next App</title>
        <meta name="description" content="Created by gotechs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h5" align="center">
          A super simple page editor
        </Typography>
     
        <Editor
          resolver={{ Card, Button, Container, Text, CardTop, CardBottom }}
        >
             <Topbar />
          <Grid container spacing={4} style={{ paddingTop: "10px" }}>
            <Grid item xs>
              <Frame>
             
                <Element
                  is={Container as any}
                  padding={5}
                  background="#eee"
                  canvas
                >
                     {/* <Card background="#eee" padding={20} /> */}
                  <Button size="small" variant="outlined">
                    Click
                  </Button>

                  <Text fontSize={14} text="Hi world!" />
                  <Element
                    is={Container as any}
                    padding={2}
                    background="#999"
                    canvas
                  >
                    <Text fontSize={14} text="It's me again!" />
                  </Element>
                </Element>
              </Frame>
            </Grid>
            <Grid item xs={2}>
              <Paper>
                <Toolbox />
                <SettingsPanel />
              </Paper>
            </Grid>
          </Grid>
        </Editor>
      </main>
    </>
  );
}
