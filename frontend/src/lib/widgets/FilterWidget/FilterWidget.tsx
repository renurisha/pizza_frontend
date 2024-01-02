import Close from "@mui/icons-material/Close";
import FilterAlt from "@mui/icons-material/FilterAlt";
import FilterAltOff from "@mui/icons-material/FilterAltOff";

import { Box, CircularProgress, Drawer } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format as formatDate } from "date-fns";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  DateTimePickerElement,
  FormContainer,
  MultiSelectElement,
  PasswordElement,
  SelectElement,
  SwitchElement,
  TextFieldElement,
  ToggleButtonGroupElement,
  useForm,
  useWatch,
} from "react-hook-form-mui";
import { PMGrid, PMText } from "../../pmcomponents";
import { BaseWidgetProps } from "../BaseWidget";
import "./FilterWidget.scss";

export interface FilterWidgetProps extends BaseWidgetProps {
  text?: string;
  textColor?: string;
  icon?: string;
  fieldsets?: Array<any>;
  fullWidth?: boolean;
  Onsubmit?: Function;
  Onchange?: Function;
  submitButtonLabel?: string;
  showSubmitButton?: boolean;
  isLoading: boolean;
  anchor?: string;
  submitOnChange?: boolean;
}

const drawerWidth = "320";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const FilterWidget = (props: FilterWidgetProps) => {
  const {
    submitButtonLabel,
    submitOnChange,
    Onsubmit,
    fullWidth,
    anchor,
    ...baseProps
  } = props;
  const [fieldsetCount, setFieldsetCount] = useState([]);

  const [open, setOpen] = useState(false);
  const [formDataChips, setFormDataChips] = useState({});

  var formContext = useForm({});
  const {
    watch,
    reset,
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    setValue,
    getValues,
  } = formContext;

  const formData = useWatch({ control });
  const getDate = (dateDelta) => {
    if (!isNaN(dateDelta)) {
      let today = Moment().add(dateDelta, "days");
      return today;
    }
    return dateDelta;
  };
  const onSubmit = (data) => {
    var dataToBeSubmitted = { ...data };
    if (isValid && props.Onsubmit) {
      props.Onsubmit(convertDate(dataToBeSubmitted));
    }
  };

  const convertDate = (val) => {
    let data = val;
    Object.keys(data).forEach((element) => {
      const el = data[element];
      if (el instanceof Date) {
        if (
          (el.getHours() == 0 &&
            el.getMinutes() == 0 &&
            el.getSeconds() == 0) ||
          (el.getUTCHours() == 0 &&
            el.getUTCMinutes() == 0 &&
            el.getUTCSeconds() == 0)
        ) {
          data[element] = formatDate(el, "yyyy-MM-dd");
        }
      }
    });

    return data;
  };

  useEffect(() => {
    let fieldsetCountTemp = [...fieldsetCount];
    props.fieldsets.map((fieldset, fsIndex) => {
      if (fieldset.group) {
        fieldsetCountTemp[fsIndex] =
          fieldsetCountTemp[fsIndex] || fieldset.count;
      } else {
        fieldsetCountTemp[fsIndex] = 1;
      }
    });
    setFieldsetCount([...fieldsetCountTemp]);
  }, [props.fieldsets]);

  const clearForm = () => {
    handleSubmit(props.Onsubmit({}));
    setFormDataChips({});
    var formDataTO = formContext.getValues();
    Object.keys(formDataTO).forEach((element) => {
      formDataTO[element] = null;
    });
    reset(formDataTO);
  };
  const handleDeleteChips = (id) => {
    const newDiff = Object.entries(formDataChips).filter(
      (ele) => ele[0] !== id
    );
    const obj = Object.fromEntries(newDiff);
    setFormDataChips(obj);
  };
  useEffect(() => {
    reset(formDataChips);
  }, [formDataChips]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelectedChips = (id) => {
    formContext.setValue(id, undefined);
    props.Onsubmit(formContext.getValues());
  };

  function idValueMapper(category, id) {
    let field = props.fieldsets[0].fields.filter(
      (obj) => obj.name === category
    )[0];
    if (field.hasOwnProperty("options") && field.type === "togglebuttongroup") {
      return field.options
        .filter((obj) => id.includes(obj.id))
        .map((obj) => obj.label);
    } else if (field.hasOwnProperty("options")) {
      return field.options.filter((obj) => obj.id === id)[0]?.label;
    }
    return id;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: 2,
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(formContext.getValues()).map((ele: any, index) => {
            return ele[1] ? (
              <Box key={ele[0]} sx={{ marginRight: 1 }}>
                <Chip
                  label={
                    typeof ele[1] === "object" &&
                    Object.prototype.toString.call(ele[1]) === "[object Date]"
                      ? String(formatDate(ele[1], "dd-MMM-yyyy"))
                      : idValueMapper(ele[0], ele[1])
                  }
                  sx={{
                    margin: "2px",
                    backgroundColor: "#62b4f6",
                    borderRadius: "4px",
                    color: "white",
                    padding: "8px 5px",
                    height: "auto",
                    "& .MuiChip-label": {
                      display: "block",
                      whiteSpace: "normal",
                    },
                  }}
                  onDelete={() => handleSelectedChips(ele[0])}
                />
              </Box>
            ) : (
              ""
            );
          })}
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 2,
            width: "100px",
            height: "50px",
            color: "#949596",
            backgroundColor: "",
            borderRadius: "5px",
            textAlign: "center",

            ...(open && { display: "none" }),
          }}
        >
          <FilterAlt sx={{ fontSize: "30px" }} /> <PMText>Filter</PMText>
        </IconButton>
      </Box>

      {Object.entries(formDataChips).map((ele: Array<any>) => {
        return ele[1].length ? (
          <Box key={ele[0]}>
            <label>{ele[0].toUpperCase().replace("_", " ")} : </label>
            <Chip
              label={ele[1].map((e) => e.label || e).join(" , ")}
              sx={{
                margin: "2px",
                backgroundColor: "#62b4f6",
                borderRadius: "4px",
                color: "white",
                padding: "8px 5px",
              }}
              onDelete={() => handleDeleteChips(ele[0])}
            />
            <br />
          </Box>
        ) : (
          ""
        );
      })}

      <Drawer
        // {...baseProps}
        sx={{
          // width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "500px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            boxShadow: "3",
          },
        }}
        variant="temporary"
        anchor="right"
        open={open}
      >
        <IconButton
          onClick={handleDrawerClose}
          sx={{ alignSelf: "flex-end", marginTop: 1 }}
        >
          <Close />
        </IconButton>
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",

            alignItems: "center",
          }}
        >
          <PMGrid
            sx={{ fontWeight: "500", fontSize: "22px", letterSpacing: 2 }}
          >
            Filter
          </PMGrid>
          <Box
            onClick={clearForm}
            sx={{ display: "flex", alignItems: "center", opacity: 0.4 }}
          >
            <IconButton onClick={handleDrawerClose}>
              <FilterAltOff />
            </IconButton>
            <PMGrid onClick={clearForm} sx={{ cursor: "pointer" }}>
              Reset Filter
            </PMGrid>
          </Box>
        </DrawerHeader>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormContainer
            handleSubmit={handleSubmit(onSubmit)}
            formContext={formContext}
          >
            <PMGrid
              direction={props.direction || "column"}
              justifyContent="flex-start"
              width="450px"
              alignItems="flex-start"
            >
              {props.fieldsets.map((fieldset, fsIndex) => {
                let rows = [];

                for (let index = 0; index < fieldsetCount[fsIndex]; index++) {
                  rows.push(
                    <PMGrid
                      key={`GRID-${fsIndex}-${index}`}
                      marginBottom={1}
                      direction={fieldset.direction || "row"}
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      sx={fieldset?.delete ? { "padding-right": "5px" } : {}}
                    >
                      {fieldset.fields.map((fieldItem, fIndex) => {
                        let field = { ...fieldItem };
                        let fieldType: any = TextFieldElement;
                        let fieldStyleProps = {};
                        let mdGridSize =
                          field.md ||
                          12 / Math.min(fieldset.fields?.length || 4, 12);

                        if (field.minDate) {
                          field.minDate = getDate(field.minDate);
                        }
                        if (field.maxDate) {
                          field.maxDate = getDate(field.maxDate);
                        }
                        if (
                          props.fullWidth ||
                          fieldset.fullWidth ||
                          field.fullWidth
                        ) {
                          field["fullWidth"] = true;
                          fieldStyleProps["width"] = "100%";
                        }
                        if (!field.inputProps) {
                          field.inputProps = {};
                        }

                        if (field.prefix) {
                          field.inputProps.startAdornment = (
                            <InputAdornment position="start">
                              {field.prefix}
                            </InputAdornment>
                          );
                        }
                        if (field.suffix) {
                          field.inputProps.endAdornment = (
                            <InputAdornment position="end">
                              {field.suffix}
                            </InputAdornment>
                          );
                        }
                        let className = "formWidth";
                        var submitOnEvent = "onChange";
                        switch (field.type) {
                          case "text":
                          case "number":
                            fieldType = TextFieldElement;
                            break;

                          case "autocomplete":
                            fieldType = AutocompleteElement;
                            break;
                          case "select":
                            fieldType = SelectElement;
                            break;
                          case "togglebuttongroup":
                            console.log(
                              "togglebutton",
                              formContext.getValues()
                            );
                            fieldType = ToggleButtonGroupElement;
                            (field["sx"] = {
                              flexWrap: "wrap",
                              height: "auto",
                              "& .MuiSelect-select": {
                                display: "block",
                                whiteSpace: "normal",
                              },
                              ".MuiToggleButtonGroup-grouped:nth-child(n)": {
                                borderLeftColor: "#e8e8e8",
                                borderRadius: 2,
                                marginRight: 2,
                                marginTop: 2,
                                padding: 2,
                              },
                            }),
                              (field["fullWidth"] = false),
                              (field["exclusive"] = true);
                            break;
                          case "multiselect":
                            fieldType = MultiSelectElement;
                            break;
                          case "switch":
                            fieldType = SwitchElement;
                            break;
                          case "checkbox":
                            fieldType = CheckboxElement;
                            className = "";
                            break;
                          case "password":
                            fieldType = PasswordElement;
                            submitOnEvent = "onBlur";
                            break;

                          case "date":
                            fieldType = DatePickerElement;
                            field.format = "dd-MMM-yyyy";

                            break;
                          case "datetime":
                            fieldType = DateTimePickerElement;
                            field.format = "dd-MMM-yyyy h:m a";
                            break;
                          case "hidden":
                            fieldType = TextFieldElement;
                            fieldStyleProps["display"] = "none";
                            break;
                        }

                        if (submitOnChange == true) {
                          var submitOnEventFunction = null;
                          if (field[submitOnEvent]) {
                            const onChange = field[submitOnEvent];
                            submitOnEventFunction = () => {
                              onChange();
                              handleSubmit(onSubmit)();
                            };
                          } else {
                            submitOnEventFunction = handleSubmit(onSubmit);
                            field[submitOnEvent] = handleSubmit(onSubmit);
                          }

                          if (submitOnEvent == "onChange") {
                            field[submitOnEvent] = submitOnEventFunction;
                          } else {
                            field.inputProps[submitOnEvent] =
                              submitOnEventFunction;
                          }
                        }

                        return (
                          !field?.displayon && (
                            <Box
                              sx={{
                                marginBottom: 1,
                                width: "100%",
                              }}
                            >
                              <PMGrid xs={12} key={`${fIndex}-${index}`}>
                                {React.createElement(fieldType, {
                                  ...field,
                                  InputProps: field.inputProps,
                                })}
                              </PMGrid>
                              <Divider sx={{ marginY: 3 }} />
                            </Box>
                          )
                        );

                        // end
                      })}
                    </PMGrid>
                  );
                }

                return rows;
              })}
              {props?.showSubmitButton ? (
                <>
                  <PMGrid
                    sx={{
                      display: "flex",

                      justifyContent: "end",
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => onSubmit}
                      sx={{
                        minWidth: 150,
                        margin: "15px 0",
                      }}
                    >
                      {props.isLoading ? (
                        <CircularProgress size={25} color="inherit" />
                      ) : (
                        props.submitButtonLabel
                      )}
                    </Button>
                  </PMGrid>
                </>
              ) : (
                <></>
              )}
            </PMGrid>
          </FormContainer>
        </LocalizationProvider>
      </Drawer>
    </>
  );
};

FilterWidget.defaultProps = {
  direction: "column",
  submitButtonLabel: "Submit",
  fullWidth: true,
  showSubmitButton: true,
  submitOnChange: false,
};

export default FilterWidget;
