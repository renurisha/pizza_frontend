import { Download, Edit } from "@mui/icons-material";

import { Box, Link } from "@mui/material";

import Stack from "@mui/material/Stack";

import { PMFormatterText, PMGrid, PMText } from "../../pmcomponents";

import { BaseWidget, BaseWidgetProps } from "../BaseWidget";

export interface DetailWidgetProps {
  text?: string;
  textColor?: string;
  icon?: string;
  data?: Object;
  fields?: Array<any>;
  requirePermissions?:Array<string>;
  columns?: number;
  columnSpacing?: number;
  rowSpacing?: number;
  multipleData?: Array<any>;
  id?: any;
  editType?: boolean;
  showNestedChild?: string;
  showNestedChildTitle?: string;
  multipleRouteId?: string;
}

export const DetailWidget = (props: BaseWidgetProps & DetailWidgetProps) => {
  const {
    columns,
    columnSpacing,
    rowSpacing,
    requirePermissions,
    showNestedChild,
    showNestedChildTitle,
    ...baseProps
  } = props;

  const editTypeMethod = (url, id) => {
    let redirectUrl;
    if (props?.multipleRouteId) {
      redirectUrl = `${url}/${props.multipleRouteId}/${props?.id || id}`;
    } else {
      redirectUrl = `${url}/${props?.id || id}`;
    }
    return (
      <Link
        href={redirectUrl}
        sx={{ "white-space": "break-spaces", "text-align": "center" }}
        underline="hover"
      >
        <Edit />
      </Link>
    );
  };
  const permissionCodes =
  JSON.parse(localStorage?.getItem("permissionCodes")) || [];
  
  return (
    <BaseWidget {...baseProps}>
      {props?.multipleData && props?.multipleData.length > 0 ? (
        props?.multipleData?.map((details, ind) => (
          <Box
            sx={{
              boxShadow:
                ind == props?.multipleData.length - 1 ? "0px 0px 0px gray" : "",
              paddingTop: ind != 0 ? 3 : 0,

              borderBottom:
                ind != props?.multipleData.length - 1 ? "1px solid gray" : "",
              paddingBottom: ind == props?.multipleData.length - 1 ? 0 : 1,
            }}
          >
            <PMGrid
              sx={{
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  columnGap: columnSpacing,
                  rowGap: rowSpacing,
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  width: ((props?.editType &&  (!props?.requirePermissions || props?.requirePermissions?.some((r) => permissionCodes?.indexOf(r) >= 0)))) ? "95%" : "100%",
                  marginBottom: 2,
                }}
              >
                {props.fields.map((field, index) => {
                  return (
                    <PMGrid key={index}>
                      {renderComponent(details, field, props.data)}
                    </PMGrid>
                  );
                })}
              </Box>
              {((props?.editType &&  (!props?.requirePermissions || props?.requirePermissions?.some((r) => permissionCodes?.indexOf(r) >= 0)))) ? (
                <Box sx={{ width: "4%" }}>
                  {((props?.editType &&  (!props?.requirePermissions || props?.requirePermissions?.some((r) => permissionCodes?.indexOf(r) >= 0)))) ? (
                    editTypeMethod(props["url"], details["id"])
                  ) : (
                    <></>
                  )}
                </Box>
              ) : (
                <></>
              )}
            </PMGrid>
            <Box
              sx={{
                display: "grid",
                columnGap: columnSpacing,
                rowGap: rowSpacing,
                width: ((props?.editType &&  (!props?.requirePermissions || props?.requirePermissions?.some((r) => permissionCodes?.indexOf(r) >= 0)))) ? "95%" : "100%",
                marginBottom: 2,
                alignItems: "left",
              }}
            >
              {showNestedChild && details[showNestedChild].length ? (
                <PMText variant="caption" sx={{ textDecoration: "underline" }}>
                  {showNestedChildTitle ? showNestedChildTitle : ""}
                </PMText>
              ) : (
                <></>
              )}

              {showNestedChild &&
                details[showNestedChild]?.map((field, index) => {
                  return (
                    <PMGrid key={index}>
                      <PMGrid sx={{ display: "flex" }}>
                        <PMText variant="caption">
                          {`Q: ${field.questionmaster?.question}`}
                        </PMText>
                      </PMGrid>

                      <PMGrid sx={{ display: "flex" }}>
                        <PMText variant="body1">
                          {`A: ${field?.answer ? field?.answer : ""}`}
                        </PMText>
                      </PMGrid>
                    </PMGrid>
                  );
                })}
            </Box>
          </Box>
        ))
      ) : (
        <PMGrid
          sx={{
            boxShadow: "0px px 0px gray",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "grid",
              columnGap: columnSpacing,
              rowGap: rowSpacing,
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              width: "100%",
              marginBottom: 2,
            }}
          >
            {props.fields.map((field, index) => {
              return (
                <PMGrid key={index}>
                  {renderComponent({}, field, props.data)}
                </PMGrid>
              );
            })}
          </Box>
          {((props?.editType &&  (!props?.requirePermissions || props?.requirePermissions?.some((r) => permissionCodes?.indexOf(r) >= 0)))) ? (
            <Box sx={{ float: "right" }}>
              {((props?.editType &&  (!props?.requirePermissions || props?.requirePermissions?.some((r) => permissionCodes?.indexOf(r) >= 0)))) ? (
                editTypeMethod(props["url"], props["id"])
              ) : (
                <></>
              )}
            </Box>
          ) : (
            <></>
          )}
        </PMGrid>
      )}
    </BaseWidget>
  );
};

DetailWidget.defaultProps = {
  columns: 4,

  columnSpacing: 1,

  rowSpacing: 3,
};

export default DetailWidget;

const renderComponent = (details, field, data) => {
  switch (field.type) {
    case "text":
    case "number":
    case "currency":
    case "date":
    case "datetime":
    case "enum":
      return(
        <Stack>
          <PMText variant="caption">{field.label}</PMText>
          <PMFormatterText formatType={field.type} value={Object.values(details).length > 0 ? details[field?.value] : field?.value} variant2="body1"/>
        </Stack>
      )
  }

  return (
    <Stack>
      <PMText variant="caption">{field.label}</PMText>
      {field?.type === "img" ? (
        <>
          <a href={details[field?.value]} title="description">
            click here
          </a>{" "}
        </>
      ) : (
        <></>
      )}
      {field?.type === "download" ? (
        details[field?.value] ? (
          <Link
            href={details[field?.value]}
            target="_blank"
            download
            underline="hover"
            sx={{ ml: 2 }}
          >
            <Download />
          </Link>
        ) : field?.value && !Object.keys(details)?.length ? (
          <Link
            href={field?.value}
            target="_blank"
            download
            underline="hover"
            sx={{ ml: 2 }}
          >
            <Download />
          </Link>
        ) : (
          "---"
        )
      ) : (
        ""
      )}

      {field?.type ? (
        ""
      ) : Object.values(details).length > 0 ? (
        details[field?.value] ? (
          <PMText variant="body1">{details[field?.value]}</PMText>
        ) : field?.value.includes(".") ? (
          getValue(details, field?.value.split("."))
        ) : field?.subtext || (data && data[field?.subkey]) ? (
          <PMText variant="body2">
            {field.subtext ? field.subtext : data[field?.subkey]}
          </PMText>
        ) : field[field.value] ? (
          <PMText>{field[field.value]}</PMText>
        ) : data ? (
          <PMText>{data[field.value]}</PMText>
        ) : (
          <PMText>---</PMText>
        )
      ) : field.value ? (
        <PMText>{field.value}</PMText>
      ) : data ? (
        <PMText>{data[field.value]}</PMText>
      ) : (
        <PMText>---</PMText>
      )}
    </Stack>
  );
};

const getValue = (obj, array) => {
  if (obj) {
    if (array.length > 1) {
      let index = array.shift();
      return getValue(obj[index], array);
    }
    return obj[array[0]];
  } else {
    return "---";
  }
};
