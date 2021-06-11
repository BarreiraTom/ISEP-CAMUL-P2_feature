import React, { useState, useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tutorials/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }, [])

  return (
    <div>
      <GridContainer>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>Requisições de Material</h4>
            <p className={classes.cardCategoryWhite}>
              Requisições de Material efetuadas para as salas do ISEP
              </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="danger"
              tableHead={["Data da Requisição", "Sala", "Pavilhão", "Items", "Data para Requisição", "Hora para Requisição", "User ID"]}
              tableData={items}
            />
          </CardBody>
        </Card>
      </GridContainer>
    </div>
  );
}
