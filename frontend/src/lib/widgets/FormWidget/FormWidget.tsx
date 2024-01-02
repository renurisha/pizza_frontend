// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import { FileDownload } from "@mui/icons-material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { InputBaseComponentProps } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDays, format as formatDate } from "date-fns";
import _ from "lodash";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
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
  TextareaAutosizeElement,
  ToggleButtonGroupElement,
  useForm,
} from "react-hook-form-mui";

import { Delete } from "@mui/icons-material";
import { PMGrid, PMText } from "../../pmcomponents";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";
import { DetailWidget } from "../DetailWidget";
import "./FormWidget.scss";

type UnknownArrayOrObject = unknown[] | Record<string, unknown>;

const StyledLabel = styled("label")`
  position: relative;
  width: 100%;

  input {
    opacity: 0 !important;
  }

  span {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
  }

  span.FileInput-placeholder {
    color: gray;
  }
`;
export interface FormWidgetProps extends BaseWidgetProps {
  text?: string;
  textColor?: string;
  icon?: string;
  defaultValues?: Object;
  fieldsets?: Array<any>;
  fullWidth?: boolean;
  Onsubmit?: Function;
  submitOnChange?: boolean;
  submitOnlyDirty?: boolean;
  submitButtonLabel?: string;
  showSubmitButton?: boolean;
  clearButtonLabel?: string;
  showClearButton?: boolean;
  isLoading: boolean;
}

type InputProps = InputBaseComponentProps & {
  text: string;
  isPlaceholder: boolean;
};

const Input = React.forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { text, isPlaceholder, placeholder, ...restInputProps } = props;
    // eslint-disable-next-line react/hook-use-state
    const id = React.useId();

    return (
      <StyledLabel htmlFor={id}>
        <input {...restInputProps} ref={ref} id={id} />
        {text ? (
          <span
            aria-placeholder={placeholder}
            className={isPlaceholder ? "FileInput-placeholder" : ""}
          >
            {text}
          </span>
        ) : null}
      </StyledLabel>
    );
  }
);

const FileUpload = (props) => {
  const {
    name,
    url,
    multiple,
    disabled,
    onChange,
    inputProps,
    InputProps,
    placeholder,
    ...baseProps
  } = props;
  const inputRef = useRef<HTMLInputElement>();
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (data) => {
    // data.target.files is a FileList object, Convert it to an array
    const newFiles = [...data.target.files];
    clearInputValue();
    setFiles(newFiles);
    onChange?.(name, newFiles);
  };

  const isMultiple =
    multiple ||
    (inputProps?.multiple as boolean) ||
    (InputProps?.inputProps?.multiple as boolean) ||
    false;

  const hasAtLeastOneFile = files.length > 0;
  // return Array.isArray(files) ? files.length > 0 : files instanceof File    }

  const placeholderFromExistingUrl = url
    ? decodeURIComponent(new URL(url).pathname.split("/").pop())
    : "";

  const clearInputValue = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.value = "";
    }
  };

  const getFileNames = () =>
    files?.reduce(
      (fileNames, file) =>
        `${fileNames} ${fileNames !== "" ? "," : ""} ${file.name}`,
      ""
    ) || "";

  // const currentaValue = _.get(props?.fileFormData, props?.name);
  // useEffect(() => {
  //     if (currentaValue) {
  //         setFile(currentaValue);
  //     }
  // }, [currentaValue]);

  // const handleDelete = (index) => {
  //     const newFiles = [...files];
  //     newFiles.splice(index, 1);

  //     setFiles(newFiles);
  //     onChange?.(name, newFiles);
  // };

  const handleDeleteAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    setFiles([]);
    onChange?.(name, []);
  };

  const getTheInputText = (): string => {
    if (files.length === 0) {
      return placeholderFromExistingUrl || placeholder || props.label || "";
    }

    if (hasAtLeastOneFile) {
      if (files.length > 1) {
        return `${files.length} files`;
      } else {
        return files[0]?.name || "";
      }
    }
    return "";
  };

  // useEffect(() => {
  //     props.onChange(props?.name, null);
  // }, []);

  // const decodeUrltoString = (url) => {
  //     if (url) {
  //         const parsedurl = new URL(url);
  //         return decodeURIComponent(parsedurl.pathname.split("/").pop());
  //     }
  //     return url;
  // };

  return (
    <TextField
      type="file"
      disabled={disabled}
      onChange={handleChange}
      className={`FileInput-TextField`}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AttachFileIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            style={{ visibility: hasAtLeastOneFile ? "visible" : "hidden" }}
          >
            <IconButton
              aria-label="Clear"
              title="Clear"
              size="small"
              disabled={disabled}
              className="FileInput-IconButton"
              onClick={handleDeleteAll}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
        inputProps: {
          text: getTheInputText(),
          multiple: isMultiple,
          isPlaceholder: files.length === 0,
          ref: inputRef,
          placeholder,
          ...inputProps,
          ...InputProps?.inputProps,
        },
        inputComponent: Input,
      }}
      {...baseProps}
    />
  );

  /*
    return (
        <Box position="relative" height={57} width="100%">
            <Box position="absolute" width="100%">
                <TextField
                    // {...props}
                    fullWidth
                    label={props.label}
                    placeholder={props.placeholder}
                    required={props.required}
                    value={getFileNames()}
                    sx={{ pointerEvents: "none" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachFileIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                style={{ visibility: hasAtLeastOneFile ? "visible" : "hidden" }}
                            >
                                <IconButton
                                    aria-label="Clear"
                                    title="Clear"
                                    size="small"
                                    disabled={disabled}
                                    className="MuiFileInput-IconButton"
                                    onClick={handleDeleteAll}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Button
                component="label"
                onKeyDown={(e) => e.key === "32" && inputRef.current?.click()}
                fullWidth
                sx={{ height: "100%" }}
            >
                <input ref={inputRef} type="file" onChange={handleChange} hidden multiple={props.multiple || false} />
            </Button>
        </Box>
    );
    return (
        <div className="file-input" onClick={() => inputRef.current?.click()}>
            <div>
                <input
                    {...props}
                    onChange={handleChange}
                    multiple
                    ref={inputRef}
                    name={`${props.name}_file`}
                    style={{ display: "none" }}
                ></input>
                <CloudUploadOutlinedIcon fontSize="large" sx={{ paddingRight: 1, opacity: 0.5 }} />
                {!(files || props?.url) && <span style={{ opacity: 0.5 }}>{props?.label}</span>}
                {files && (
                    <>
                        {files.map((file, i) => {
                            return (
                                <Chip
                                    key={i}
                                    sx={{ maxWidth: "calc(100% - 30px)" }}
                                    label={file?.name}
                                    onClick={() => inputRef.current?.click()}
                                    onDelete={() => handleDelete(i)}
                                />
                            );
                        })}
                    </>
                )}
                {!files && props.url && (
                    <Chip
                        sx={{ maxWidth: "calc(100% - 30px)" }}
                        label={decodeUrltoString(props.url)}
                        component="a"
                        href={props.url}
                        onDelete={() => {}}
                        clickable
                        deleteIcon={<FileDownload />}
                    />
                )}
            </div>
        </div>
    );
    */
};
const selectedGroupOPtionValue = {};
const groupFieldsetCount = {};
const numberOfGroupsAdded = {};
export const FormWidget = (props: FormWidgetProps) => {
  const {
    submitOnChange,
    showSubmitButton,
    submitButtonLabel,
    showClearButton,
    clearButtonLabel,
    Onsubmit,
    submitOnlyDirty,
    defaultValues,
    fullWidth,
    direction,
    ...baseProps
  } = props;

  const [fieldsetCount, setFieldsetCount] = useState([]);
  // const [fieldSetDefaultValue, setFieldSetDefaultValue] = useState([]);
  // const [currentForm, setCurrentForm] = useState({});
  const [fileFormData, setFileFormData] = useState({});
  const formContext = useForm({
    // Set default values
    // values: defaultValues,
  });
  const fileFields = [];

  const requiredFileFields = [];
  var isErrorFile = [];

  const {
    watch,
    reset,
    control,
    formState: { isDirty, isValid, dirtyFields },
    handleSubmit,
    setValue,
    getValues,
  } = formContext;

  // let timer = null;
  useEffect(() => {
    // sets defaultValues to formValue on when isDirty is false
    if (defaultValues && !isDirty) {
      reset(Object.assign({}, formContext.getValues(), defaultValues));
    }
  }, [defaultValues]);
  // const formData = useWatch({ control });

  const addValidationMsg = (validation) => {
    Object.keys(validation).forEach((type) => {
      let value = validation[type].value || validation[type];
      switch (type) {
        case "min":
          validation[type] = {
            value: value,
            message: `Value should be greater than ${value}`,
          };
          break;

        case "max":
          validation[type] = {
            value: value,
            message: `Value should be less than ${value}`,
          };
          break;

        case "minLength":
          validation[type] = {
            value: value,
            message: `Length should be greater than ${value}`,
          };
          break;

        case "maxLength":
          validation[type] = {
            value: value,
            message: `Length should be less than ${value}`,
          };
          break;

        case "pattern":
          validation[type] = {
            value: new RegExp(value),
            message: `Invalid value`,
          };
          break;

        default:
          break;
      }
    });
    return validation;
  };
  const getDate = (dateDelta) => {
    if (!isNaN(dateDelta)) {
      let today = addDays(new Date(), dateDelta);
      return today;
    }
    return dateDelta;
  };

  // const checkValue = (data) => {
  //     let emptyValue = false;
  //     if (data) {
  //         Object.keys(data).forEach((ele) => {
  //             if (ele) {
  //                 emptyValue = true;
  //             }
  //         });
  //     }
  //     return emptyValue;
  // };
  // useEffect(() => {
  //     let formDataTemp = { ...formData };
  //     if (formData && checkValue(formData)) {
  //         if (fileFormData) formDataTemp = _.merge(formDataTemp, fileFormData);
  //         if (props.Onchange && !_.isEqual(formDataTemp, props.defaultValues)) {
  //             props.Onchange(formDataTemp);
  //         }
  //     }
  // }, [formData]);

  const dirtyValues = (
    dirtyFields: UnknownArrayOrObject | boolean,
    allValues: UnknownArrayOrObject
  ): UnknownArrayOrObject => {
    // NOTE: Recursive function.

    // If *any* item in an array was modified, the entire array must be submitted, because there's no
    // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
    if (dirtyFields === true || Array.isArray(dirtyFields)) {
      return allValues;
    }

    // Here, we have an object.
    return Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [
        key,
        dirtyValues(dirtyFields[key], allValues[key]),
      ])
    );
  };
  const resetFormData = () => {
    reset();
    props.Onsubmit({});
  };

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = (data) => {
    let isValidForm = true;

    // Submit File Fields only if they are dirty
    var dataToBeSubmitted = { ...data };

    fileFields.forEach((fieldName) => {
      // Remove File Fields to ensure only modified files get sent
      _.unset(dataToBeSubmitted, fieldName);
      // if (_.get(dirtyFields, fieldName, null) != null) {

      // };
    });

    // checks if required files are uploaded or not
    isValidForm = true;
    isErrorFile = [];

    requiredFileFields?.forEach((item) => {
      if (!_.get(fileFormData, item) && !_.get(dataToBeSubmitted, item)) {
        if (!isErrorFile.includes(item)) {
          isErrorFile.push(item);
        }
        isValidForm = false;
      } else {
        isErrorFile = isErrorFile.filter((ele) => ele !== item);
      }
    });
    if (!isErrorFile.length) {
      isValidForm = true;
    }
    //

    // var dataToBeSubmitted = dirtyValues(dirtyFields, data);
    if (isValid && isValidForm && props.Onsubmit) {
      if (!_.isEmpty(fileFormData)) {
        dataToBeSubmitted = _.merge(dataToBeSubmitted, fileFormData);
      }
      // props.Onsubmit(data);

      props.Onsubmit(convertDate(dataToBeSubmitted));
    } else if (!isValidForm) {
      enqueueSnackbar("Please Upload Required Files", { variant: "error" });
    }
  };

  const convertDate = (data) => {
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
    // formContext.getValues()
    let fieldsetCountTemp = [...fieldsetCount];
    props.fieldsets.map((fieldset, fsIndex) => {
      if (fieldset.group) {
        if (fieldset?.maxGroupCreate) {
          groupFieldsetCount[fieldset.group] = fieldset?.maxGroupCreate;
        } else {
          groupFieldsetCount[fieldset.group] = undefined;
        }

        fieldsetCountTemp[fsIndex] =
          fieldsetCountTemp[fsIndex] || fieldset.count;
      } else {
        fieldsetCountTemp[fsIndex] = 1;
      }
    });

    setFieldsetCount([...fieldsetCountTemp]);
  }, [props.fieldsets]);

  // useEffect(() => {
  //     if (props?.defaultValues) {
  //         if (Object.keys(props.defaultValues).length !== 0) {
  //             let currentValue = formContext.getValues();
  //             Object.keys(props.defaultValues).forEach((element) => {
  //                 if (currentValue[element] !== props.defaultValues[element]) {
  //                     currentValue[element] = props.defaultValues[element];
  //                 }
  //             });
  //             reset({ ...currentValue });
  //         }
  //     }
  // }, [props.defaultValues]);
  const removeFromField = (
    fsindex,
    index,
    group,

    callback
  ) => {
    // remove selected dropdown value when group of particular index removed

    if (
      selectedGroupOPtionValue[group] &&
      selectedGroupOPtionValue[group].length >= index + 1
    ) {
      selectedGroupOPtionValue[group] = selectedGroupOPtionValue[group]?.filter(
        (data, ind) => ind != index
      );
    }

    let fieldsetCountTemp = [...fieldsetCount];
    fieldsetCountTemp[fsindex] = fieldsetCountTemp[fsindex] - 1;
    let currentValue = formContext.getValues();
    let fieldsetValue = null;
    if (currentValue[group] && currentValue[group][index]) {
      fieldsetValue = currentValue[group][index];
      currentValue[group].splice(index, 1);
    }
    let filesetValue = null;
    if (fileFormData[group] && fileFormData[group][index]) {
      filesetValue = fileFormData[group][index];
      fileFormData[group].splice(index, 1);
    }
    if (callback) {
      callback(fieldsetValue || filesetValue);
    }
    reset({ ...currentValue });
    setFieldsetCount([...fieldsetCountTemp]);
  };
  const addFromField = (index) => {
    let fieldsetCountTemp = [...fieldsetCount];
    fieldsetCountTemp[index] = fieldsetCountTemp[index] + 1;
    setFieldsetCount([...fieldsetCountTemp]);
  };

  const fileOnChange = (name, files) => {
    let fileFormDataTemp = { ...fileFormData };
    let jsonNames = name.split(/\[|\].|\]\[/);
    assign(fileFormDataTemp, jsonNames, files);
    setFileFormData(fileFormDataTemp);
  };

  const assign = (obj, keyPath, value) => {
    let lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      let key = keyPath[i];
      if (!(key in obj)) {
        if (keyPath[i + 1] && !isNaN(keyPath[i + 1])) {
          obj[key] = [];
        } else {
          obj[key] = {};
        }
      }
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  return (
    <BaseWidget {...baseProps} md={12}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormContainer
          handleSubmit={handleSubmit(onSubmit)}
          formContext={formContext}
        >
          <PMGrid
            container
            direction={direction || "column"}
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {props.fieldsets.map((fieldset, fsIndex) => {
              let rows = [];
              if (fieldset.header) {
                rows.push(
                  !fieldset?.displayon && (
                    <PMGrid key={`HEADER-${fsIndex}`}>
                      <PMText
                        variant="body1"
                        sx={{ fontWeight: "600", width: "100%" }}
                        color={baseProps.headerColor}
                      >
                        {fieldset.header}
                      </PMText>
                    </PMGrid>
                  )
                );
              }
              for (let index = 0; index < fieldsetCount[fsIndex]; index++) {
                if (!fieldset?.displayon) {
                  rows.push(
                    <PMGrid
                      key={`GRID-${fsIndex}-${index}`}
                      container
                      marginBottom={1}
                      direction={fieldset.direction || "row"}
                      spacing={2}
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      sx={fieldset?.delete ? { "padding-right": "30px" } : {}}
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
                        if (field["validation"]) {
                          field["validation"] = addValidationMsg(
                            field["validation"]
                          );
                        }
                        if (
                          props.fullWidth ||
                          fieldset.fullWidth ||
                          field.fullWidth
                        ) {
                          field["fullWidth"] = true;
                          fieldStyleProps["width"] = "100%";
                        }
                        var fieldDefault = defaultValues
                          ? _.get(defaultValues, field.name)
                          : "";
                        // field.defaultValue = fieldDefault;
                        // //console.log(field.name, "Default", fieldDefault)
                        if (fieldset.group) {
                          if (fieldset?.removeSelectedOption) {
                            if (
                              selectedGroupOPtionValue[fieldset.group] ==
                              undefined
                            ) {
                              selectedGroupOPtionValue[fieldset.group] = [];
                            }
                          }

                          field.name = `${fieldset.group}[${index}].${field.name}`;
                          fieldDefault = _.get(defaultValues, field.name);

                          if (field.type == "select") {
                            // current selected value to be included in current options list

                            numberOfGroupsAdded[fieldset.group] = index + 1;

                            if (fieldset?.removeSelectedOption) {
                              field.options = field?.options.filter(
                                (item) =>
                                  !selectedGroupOPtionValue[
                                    fieldset.group
                                  ].includes(item.id) ||
                                  selectedGroupOPtionValue[fieldset.group][
                                    index
                                  ] == item?.id
                              );
                            }
                          }
                        }

                        if (field.type == "file") {
                          fieldDefault = _.get(
                            formContext.getValues(),
                            field.name
                          )
                            ? _.get(formContext.getValues(), field.name)
                            : _.get(defaultValues, field.name);
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
                            submitOnEvent = "onBlur";
                            break;
                          case "file":
                            fileFields.push(field.name);
                            if (
                              !field.displayon &&
                              !fieldset.displayon &&
                              field.required
                            ) {
                              requiredFileFields.push(field.name);
                            }
                            fieldType = FileUpload;
                            field.onChange = fileOnChange;
                            field.url = fieldDefault;

                            field.error = isErrorFile.includes(field.name)
                              ? true
                              : false;
                            field.helperText = isErrorFile.includes(field.name)
                              ? "This field is required"
                              : "";

                            break;
                          case "autocomplete":
                            fieldType = AutocompleteElement;
                            break;
                          case "select":
                            fieldType = SelectElement;
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
                            fieldStyleProps[
                              "& MuiFormControlLabel-labelPlacementEnd"
                            ] = { width: "100% !important" };
                            fieldStyleProps["& MuiCheckbox-root"] = {
                              width: "40px !important",
                            };
                            break;
                          case "password":
                            fieldType = PasswordElement;
                            submitOnEvent = "onBlur";
                            break;
                          case "togglebuttongroup":
                            fieldType = ToggleButtonGroupElement;
                            break;
                          case "date":
                            fieldType = DatePickerElement;
                            field.format = "dd-MMM-yyyy";
                            field.error = isErrorFile.includes(field.name)
                              ? true
                              : false;
                            field.helperText = isErrorFile.includes(field.name)
                              ? "This field is required"
                              : "";

                            break;
                          case "datetime":
                            fieldType = DateTimePickerElement;
                            field.format = "dd-MMM-yyyy h:m a";
                            break;
                          case "display":
                            fieldType = TextFieldElement;
                            field.disabled = true;
                            field.label = "";
                            fieldStyleProps["display"] = fieldDefault
                              ? ""
                              : "none";
                            fieldStyleProps["& fieldset"] = { border: "none" };
                            break;
                          case "displayTextArea":
                            fieldType = TextareaAutosizeElement;
                            field.disabled = true;
                            field.label = "";
                            fieldStyleProps["display"] = fieldDefault
                              ? ""
                              : "none";
                            fieldStyleProps["& fieldset"] = { border: "none" };

                            field.resizeStyle = "none";
                            fieldStyleProps["& textarea.Mui-disabled"] = {
                              color: "black",
                              "text-fill-color": "black",
                            };
                            break;
                          case "displaytext":
                            fieldType = TextFieldElement;
                            field.disabled = true;

                            fieldStyleProps["& fieldset"] = { border: "none" };
                            break;
                          case "hidden":
                            fieldType = TextFieldElement;
                            fieldStyleProps["display"] = "none";
                            break;
                          case "textarea":
                            fieldType = TextareaAutosizeElement;

                            field.disabled = true;
                            field.label = "";
                            fieldStyleProps["display"] = fieldDefault
                              ? ""
                              : "none";
                            break;
                          case "textValues":
                            fieldType = TextareaAutosizeElement;
                            field.disabled = true;
                            fieldStyleProps["& textarea.Mui-disabled"] = {
                              color: "black",
                            };
                            fieldStyleProps["& fieldset"] = {
                              border: "none",
                              marginTop: "4px",
                            };
                            break;
                        }
                        // onchange logic start
                        if (field.onChange && field.type !== "file") {
                          if (fieldset.group) {
                            var orginalOnChange = field.onChange;

                            field.onChange = (data) => {
                              if (fieldset?.removeSelectedOption) {
                                selectedGroupOPtionValue[fieldset.group][
                                  index
                                ] = data;
                              }

                              // to check if elemement have to be pushed or replaced

                              orginalOnChange(
                                data,
                                formContext.getValues(),
                                reset,
                                fieldset.group,
                                index
                              );
                            };
                          } else if (field.onChange && field.type == "text") {
                            var orginalOnChange = field.onChange;
                            field.onChange = (data) => {
                              orginalOnChange(
                                data.target.value,
                                formContext.getValues(),
                                reset
                              );
                            };
                          } else {
                            var orginalOnChange = field.onChange;
                            field.onChange = (data) => {
                              orginalOnChange(
                                data,
                                formContext.getValues(),
                                reset
                              );
                            };
                          }
                        }
                        // end

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
                          }

                          if (submitOnEvent == "onChange") {
                            field[submitOnEvent] = submitOnEventFunction;
                          } else {
                            field.inputProps[submitOnEvent] =
                              submitOnEventFunction;
                          }
                        }

                        return (
                          !field?.displayon &&
                          !fieldset?.displayon &&
                          (field["requirePermissions"]
                            ? field["requirePermissions"]?.some(
                                (r) =>
                                  localStorage
                                    .getItem("permissionCodes")
                                    .indexOf(r) > 0
                              )
                            : true) &&
                          (field.type != "textValues" ? (
                            <PMGrid
                              md={mdGridSize}
                              xs={12}
                              key={`Field-${fIndex}-${index}`}
                              sx={fieldStyleProps}
                            >
                              {React.createElement(fieldType, {
                                ...field,
                                className: className,
                                InputProps: field.inputProps,
                                sx: { width: "100%" },
                              })}
                            </PMGrid>
                          ) : (
                            <>
                              {_.get(formContext.getValues(), field.name)
                                ?.length ? (
                                <DetailWidget
                                  direction="row"
                                  md={12}
                                  multipleData={
                                    [
                                      {
                                        leadquestion_leadmember:
                                          _.get(
                                            formContext.getValues(),
                                            field.name
                                          ) || [],
                                      },
                                    ] || []
                                  }
                                  showNestedChild="leadquestion_leadmember"
                                  fields={[]}
                                ></DetailWidget>
                              ) : (
                                ""
                              )}
                            </>
                          ))
                        );
                      })}
                      {((fieldset?.delete && fieldset?.count == 0) ||
                        (fieldset?.delete &&
                          fieldset?.maxGroupCreate &&
                          !fieldset?.displayon) ||
                        (fieldset?.delete && fieldsetCount[fsIndex] != 1)) && (
                        <IconButton
                          className="deleteButton"
                          aria-label="delete"
                          color="error"
                          onClick={() =>
                            removeFromField(
                              fsIndex,
                              index,
                              fieldset.group,

                              fieldset?.onDelete
                            )
                          }
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </PMGrid>
                  );
                }
              }
              if (fieldset?.additiontitle && !fieldset?.displayon) {
                if (
                  groupFieldsetCount[fieldset.group] == undefined ||
                  numberOfGroupsAdded[fieldset.group] <
                    groupFieldsetCount[fieldset.group]
                ) {
                  rows.push(
                    <PMGrid
                      container
                      key={`Title-${fsIndex}`}
                      justifyContent="flex-end"
                      sx={{ "margin-top": 10 }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => addFromField(fsIndex)}
                      >
                        {fieldset?.additiontitle}
                      </Button>
                    </PMGrid>
                  );
                } else {
                  rows.push(<></>);
                }
              }
              return rows;
            })}

            {showSubmitButton ? (
              <>
                <PMGrid
                  container
                  direction="row"
                  gap={1}
                  justifyContent="flex-end"
                  sx={{ "margin-top": 10 }}
                >
                  {showClearButton ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={resetFormData}
                        color="primary"
                        type="submit"
                        sx={{ minWidth: 150 }}
                      >
                        {clearButtonLabel}
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ minWidth: 150 }}
                  >
                    {props.isLoading ? (
                      <CircularProgress size={25} color="inherit" />
                    ) : (
                      submitButtonLabel
                    )}
                  </Button>
                  {/* <Button variant="contained" type="submit" onClick={onSubmit}>
                            {props.submitButtonLabel}
                        </Button> */}
                </PMGrid>
              </>
            ) : (
              <></>
            )}
          </PMGrid>
        </FormContainer>
      </LocalizationProvider>
    </BaseWidget>
  );
};

FormWidget.defaultProps = {
  direction: "column",
  submitButtonLabel: "Submit",
  showSubmitButton: true,
  clearButtonLabel: "Reset",
  showClearButton: false,
  fullWidth: false,
  submitOnChange: false,
  submitOnlyDirty: false,
};

export default FormWidget;
