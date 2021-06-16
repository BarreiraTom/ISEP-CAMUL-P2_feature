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

import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
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
  picker: {
    margin: "8px"
  },
  plusBtn: {
    padding: "5px"
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submitBtn: {
    margin: "5px 30px 15px"
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const [pavillion, setPavillion] = React.useState('');
  const [classroom, setClassroom] = React.useState('');
  const [classroomInput, setClassroomInput] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedHour, setSelectedHour] = React.useState(new Date('2014-08-18T09:00:00'));
  const [inputList, setInputList] = React.useState([{ product: "Computador", quantity: 1 }]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const pavillions = ["A", "B", "C", "D", "E"];
  const floor = ["0", "1", "2", "3", "4"];
  const classrooms = ["001", "002", "003", "004", "005"];
  const materialList = ["Computador", "Projector", "Colunas", "Teclado", "Camera", "Rato"];

  const handleInputChange = (e, index) => {
    console.log(e)
    const { name, value } = e.target;
    const list = [...inputList];
    console.log(index);
    console.log(list);
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { product: "Computador", quantity: 1 }]);
  };

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

  const handleHourChange = (date) => {
    setSelectedHour(date);
  };

  const submit = () => {
    if (classroom === "B4002") {
      setSeverity("error");
      setMessage("Sala já ocupada!");
      setOpen(true);
    } else {
      let parsedMaterial = "";
      // parse material
      inputList.map((input, index) => {
        if (index !== (inputList.length - 1)) {
          parsedMaterial += input.product + " - " + input.quantity + "x, ";
        } else {
          parsedMaterial += input.product + " - " + input.quantity + "x";
        }
      });

      const hourMinutesSeconds = selectedHour.toISOString().split('T')[1].split(".")[0].split(":");
      const hourForReq = (parseInt(hourMinutesSeconds[0]) + 1) + ":" + hourMinutesSeconds[1];

      // post request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classroom: classroom,
          pavilion: pavillion,
          dateForReq: selectedDate.toISOString().split('T')[0],
          hourForReq,
          requesitorId: "123",
          items: parsedMaterial
        })
      };

      fetch('http://localhost:8080/api/tutorials/', requestOptions)
        .then(async response => {
          console.log(response.ok);
          setSeverity("success");
          await setMessage("Sucesso!");
          setOpen(true);
        })
        .catch(async error => {
          await setSeverity("error");
          await setMessage("Alguma coisa correu mal!");
          setOpen(true);

          console.log(error);
        })
    }
  }

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
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data para Requisição"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardTimePicker
                    ampm={false}
                    margin="normal"
                    id="time-picker"
                    label="Data para Requisição"
                    value={selectedHour}
                    onChange={handleHourChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.picker}>
              <h3>Lista de Material</h3>
              {inputList.map((x, i) => {
                return (
                  <div className="box" key={i}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="material-label">Material</InputLabel>
                      <Select
                        name="product"
                        labelId="material-label"
                        id="demo-simple-select"
                        value={x.product}
                        onChange={e => handleInputChange(e, i)}
                      >
                        {
                          materialList.map((material, key) => {
                            return <MenuItem value={material} key={key}>{material}</MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="material-label">Quantidade</InputLabel>
                      <Select
                        name="quantity"
                        labelId="material-label"
                        id="demo-simple-select"
                        value={x.quantity}
                        onChange={e => handleInputChange(e, i)}
                      >
                        {
                          [0, 1, 2, 3, 4].map((quantity, key) => {
                            return <MenuItem value={quantity + 1} key={key}>{quantity + 1}</MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                    <div className="btn-box">
                      {inputList.length !== 1 && <button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}>Remover</button>}
                      {inputList.length - 1 === i && <button onClick={handleAddClick}>Adicionar</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
          <button className={classes.submitBtn} onClick={() => submit()}>Submeter</button>
        </Card>
      </GridContainer>
      <div className={classes.root}>
        <Collapse in={open}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>
      </div>
    </div>
  );
}