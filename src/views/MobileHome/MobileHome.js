import 'date-fns';
import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  cardTitleWhite: {
    color: "white",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "gray",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  breaker: {
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  picker:{
    margin: "8px"
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const [pavillion, setPavillion] = React.useState('');
  const [classroom, setClassroom] = React.useState('');
  const [classroomInput, setClassroomInput] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const pavillions = ["A", "B", "C", "D", "E"];
  const floor = ["0", "1", "2", "3", "4"];
  const classrooms = ["001", "002", "003", "004", "005"];
  // const materialList = ["Computer", "Projector", "Sound System", "Keyboard", "Camera", "Mouse"];

  const handlePavillionChange = (event) => {
    setPavillion(event.target.value);
    setClassroomInput(!!event.target.value);
  };

  const handleClassroomChange = (event) => {
    setClassroom(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <GridContainer>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>Requisitar Material</h4>
          </CardHeader>
          <CardBody>
            <div className={classes.breaker}>
              <FormControl className={classes.formControl}>
                <InputLabel id="pavillion-label">Pavilhão</InputLabel>
                <Select
                  labelId="pavillion-label"
                  id="demo-simple-select"
                  value={pavillion}
                  onChange={handlePavillionChange}
                >
                  {
                    pavillions.map((pavillion, key) => {
                      return (<MenuItem value={pavillion} key={key}>{pavillion}</MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="pavillion-label">Sala de Aula</InputLabel>
                <Select
                  labelId="classroom-label"
                  id="demo-simple-select"
                  value={classroom}
                  onChange={handleClassroomChange}
                  disabled={!classroomInput}
                >
                  {
                    floor.map((floor) => {
                      return classrooms.map((classroom, key) => {
                        let finalName = pavillion + floor + classroom;
                        return (<MenuItem value={finalName} key={key}>{finalName}</MenuItem>)
                      })
                    })
                  }
                </Select>
              </FormControl>
            </div>
            <div className={classes.breaker}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.picker}>
                  <KeyboardDatePicker
                    disableToolbar
                    minDate={new Date()}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data para Requisição"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </CardBody>
        </Card>

      </GridContainer>
    </div>
  );
}
