import { Download, Edit, VisibilityOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import { lighten } from "@mui/material/styles";
import {
  DataGrid,
  DataGridProps,
  GridColTypeDef,
  GridEventListener,
  GridFilterModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import _ from "lodash";
import { useState } from "react";
import { theme } from "../../../theme";
import "./PMTable.scss";

export interface PMTableProps extends DataGridProps {
  grid?: number;
  Onclick?: Function;
  showSerialNumber?: boolean;
  showExportOptions?: boolean;
  tableHeaderColor?: string;
  rows: any;
  columns: any[];
  showQuickFilter: boolean;
  tableApi: any;
  tableParams: any[];
  rowColor: any;
  rowColorField: any;
}

const locale = "en-IN";
const currencyFormatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "INR",
});

const nestedValueGetterColType: GridColTypeDef = {
  valueGetter: (params: GridValueGetterParams) => {
    return _.get(params.row, params.field);
  },
};

const currencyType: GridColTypeDef = {
  type: "number",
  width: 130,
  valueFormatter: ({ value }) =>
    value ? currencyFormatter.format(value) : "--",
  cellClassName: "font-tabular-nums",
};

const dateType: GridColTypeDef = {
  valueFormatter: ({ value }) =>
    value ? format(parseISO(value), "dd-MMM-yyyy") : "",
};

const dateTimeType: GridColTypeDef = {
  valueFormatter: ({ value }) =>
    value ? format(parseISO(value), "dd-MMM-yyyy h:m a") : "",
};

const iconType: GridColTypeDef = {
  type: "string",
  renderCell: (params: GridRenderCellParams<any, string>) => (
    <Icon>{params.value}</Icon>
  ),
};

function enumFormatter(enumVal) {
  if (enumVal) {
    var words = enumVal.split("_");
    var finalWord = [];
    words.forEach((item) => {
      if (item.length > 2) {
        item = item.toLowerCase();
        item = item[0].toUpperCase() + item.slice(1);
      }
      finalWord.push(item);
    });
    return finalWord.join(" ");
  }
  return "";
}

const enumConvertor: GridColTypeDef = {
  renderCell: (params: GridRenderCellParams<any, string>) => {
    if (params.value) {
      return <>{enumFormatter(params?.value)}</>;
    }
    return "--";
  },
};

const checkType: GridColTypeDef = {
  type: "string",
  renderCell: (params: any) => {
    if (params?.colDef?.condition && params?.colDef?.condition?.length) {
      if (params.row[params.colDef.condition[0]]) {
        return (
          <Icon
            color={params.value ? "success" : "error"}
            sx={{ "text-align": "center" }}
          >
            {params.value ? "check_circle" : "cancel"}
          </Icon>
        );
      } else {
        return <></>;
      }
    }
  },
};

const linkType: GridColTypeDef = {
  type: "actions",
  renderCell: (params: GridRenderCellParams<any, string>) => (
    <Link href={`${params.value}`} underline="hover">
      {params.field}
    </Link>
  ),
};
let current_url = window.location.href.split("/");
let base_url = current_url[0] + "//" + current_url[2];
const relatedlinkType: GridColTypeDef = {
  type: "actions",
  renderCell: (params: GridRenderCellParams<any, string>) => (
    <Link href={`${base_url}/${params.row.url}`} color="blue" underline="hover">
      {params.value}
    </Link>
  ),
};

const editType: GridColTypeDef = {
  type: "actions",
  renderCell: (params: any) => {
    const url = params.colDef.url
      ? `${params.colDef.url}/${params.row.id}`
      : `${params.row.id}`;
    if (params?.colDef?.condition && params?.colDef?.condition?.length) {
      if (
        params.row[params.colDef.condition[0]] === params.colDef.condition[1]
      ) {
        return (
          <Link
            href={url}
            sx={{ "white-space": "break-spaces", "text-align": "center" }}
            underline="hover"
          >
            {params.field ? (
              params.field
            ) : (
              <Edit sx={{ color: "primary.main" }} />
            )}
          </Link>
        );
      } else {
        return <></>;
      }
    }
    return (
      <Link
        href={url}
        color="blue"
        sx={{ "white-space": "break-spaces", "text-align": "center" }}
        underline="hover"
      >
        {params.field ? params.field : <Edit sx={{ color: "primary.main" }} />}
      </Link>
    );
  },
};
const viewType: GridColTypeDef = {
  type: "actions",
  renderCell: (params: any) => {
    const url = params.colDef.url
      ? `${params.colDef.url}/${params.row.id}`
      : `${params.row.id}`;
    if (params?.colDef?.condition && params?.colDef?.condition?.length) {
      if (
        params.row[params.colDef.condition[0]] === params.colDef.condition[1]
      ) {
        return (
          <Link
            href={url}
            sx={{ "white-space": "break-spaces", "text-align": "center" }}
            underline="hover"
          >
            {params.field ? (
              params.field
            ) : (
              <VisibilityOutlined sx={{ color: "primary.main" }} />
            )}
          </Link>
        );
      } else {
        return <></>;
      }
    }
    return (
      <Link
        href={url}
        color="blue"
        sx={{ "white-space": "break-spaces", "text-align": "center" }}
        underline="hover"
      >
        {params.field ? (
          params.field
        ) : (
          <VisibilityOutlined sx={{ color: "primary.main" }} />
        )}
      </Link>
    );
  },
};

const avatarType: GridColTypeDef = {
  align: "center",
  renderCell: (params: GridRenderCellParams<any, string>) => (
    <Avatar alt="" src={params.value} />
  ),
};

const chipType: GridColTypeDef = {
  align: "center",
  renderCell: (params: any) => {
    let returnChip = (
      <Chip variant="outlined" color={"primary"} label={params?.value} />
    );
    if (params?.colDef?.condition && params?.colDef?.condition?.length) {
      params?.colDef?.condition.forEach((conditions) => {
        if (Array.isArray(conditions["rule"])) {
          if (
            params?.value >= conditions["rule"][0] &&
            params.value < conditions["rule"][1]
          ) {
            returnChip = (
              <Chip
                variant="outlined"
                color={conditions.color}
                label={params?.value}
              />
            );
          }
        } else if (params?.value === conditions["rule"]) {
          returnChip = (
            <Chip
              variant="outlined"
              color={conditions.color}
              label={params?.value}
            />
          );
        }
      });
    }
    return returnChip;
  },
};

const multiLineType: GridColTypeDef = {
  renderCell: (params: GridRenderCellParams<any, string[]>) => {
    if (params.value) {
      const data = params.value;
      return (
        <>
          {data.map((element, index) => {
            return (
              <>
                {element}
                <br></br>
              </>
            );
          })}
        </>
      );
    }
    return "--";
  },
};

const buttonType: GridColTypeDef = {
  type: "actions",
  renderCell: (params: any) => {
    if (params?.colDef?.condition && params?.colDef?.condition?.length) {
      if (
        params.row[params.colDef.condition[0]] === params.colDef.condition[1]
      ) {
        return (
          <Button onClick={() => params.colDef?.onclick({ id: params.row.id })}>
            {params.field}
          </Button>
        );
      } else {
        return <></>;
      }
    }
    return (
      <Button onClick={() => params.colDef?.onclick({ id: params.row.id })}>
        {params.field}
      </Button>
    );
  },
};

const QuickSearchToolbar = () => {
  return (
    <Box
      sx={{
        p: 0.5,
      }}
    >
      <GridToolbarQuickFilter size="medium" />
    </Box>
  );
};

const PMTable = (props: PMTableProps & DataGridProps) => {
  const {
    showSerialNumber,
    showExportOptions,
    rows,
    columns,
    tableHeaderColor,
    showQuickFilter,
    tableApi,
    tableParams,
    ...baseProps
  } = props;

  var [tableParamsGet, tableParamsSet] = useState({ size: 50, page: 1 });
  if (tableParams) {
    [tableParamsGet, tableParamsSet] = tableParams;
  }

  let rowHeight = null;
  const [anchorEls, setAnchorEls] = useState<Object>({});
  const rowsPerPageOptions = [25, 50, 100];
  if (
    tableParamsGet?.size &&
    !rowsPerPageOptions.includes(tableParamsGet.size)
  ) {
    rowsPerPageOptions.push(tableParamsGet.size);
  }
  const permissionCodes =
    JSON.parse(localStorage?.getItem("permissionCodes")) || [];
  const page = (tableParamsGet?.page || 1) - 1;
  const pageSize = tableParamsGet?.size || 50;

  const handleDownloadClick = (id, event) => {
    anchorEls[id] = event.target;
    setAnchorEls({ ...anchorEls });
  };
  const handleDownloadClose = (id, event) => {
    anchorEls[id] = null;
    setAnchorEls({ ...anchorEls });
  };

  if (rows?.length) {
    rows.forEach((ele, index) => {
      if (!ele["id"]) {
        ele["id"] = "" + index;
      }
    });
  }

  const onPaginationChange = (paginationModel) => {
    tableParamsSet((tableParams) => {
      return {
        ...tableParams,
        size: paginationModel.pageSize,
        page: paginationModel.page + 1, // Datagrid pages are zero-indexed, Backend pages are one-indexed,
      };
    });
  };

  const onSortingChange = (sortModel: GridSortModel) => {
    var sortKeys = [];
    // Although, multi-sorting is not supported in DataGrid community version, but we still write the multisorting code
    sortModel.forEach((sortItem) => {
      if (sortItem["sort"] == "desc") {
        sortKeys.push(`-${sortItem["field"]}`);
      } else {
        sortKeys.push(`${sortItem["field"]}`);
      }
    });
    tableParamsSet((tableParams) => {
      return {
        ...tableParams,
        order_by: sortKeys.join(","),
      };
    });
  };

  const onFilterChange = (filterModel: GridFilterModel) => {
    tableParamsSet((tableParams) => {
      return {
        ...tableParams,
        ...filterModel,
      };
    });
  };

  const decodeUrltoString = (url) => {
    if (url) {
      const parsedurl = new URL(url);
      return decodeURIComponent(parsedurl.pathname.split("/").pop());
    }
    return "DownLoad";
  };

  const downloadType: GridColTypeDef = {
    type: "actions",
    renderCell: (params: GridRenderCellParams<any, string>) => {
      if (Array.isArray(params.value)) {
        if (params.value.length) {
          return (
            <>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                color="primary"
                onClick={(e) => handleDownloadClick(params.id, e)}
              >
                <Download />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEls[params.id]}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                keepMounted
                open={Boolean(anchorEls[params.id])}
                onClose={(e) => handleDownloadClose(params.id, e)}
              >
                {params.value.map((docs) => (
                  <MenuItem>
                    <Link
                      href={docs}
                      target="_blank"
                      download
                      underline="hover"
                    >
                      {decodeUrltoString(docs)}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </>
          );
        } else {
          return <></>;
        }
      } else {
        return params.value ? (
          <Link href={params.value} target="_blank" download underline="hover">
            <Download />
          </Link>
        ) : (
          <></>
        );
      }
    },
  };
  let columnVisibilityModel = {};
  let columnDefs = columns.map((colDef) => {
    let typeDef = {};
    if (colDef?.requirePermissions) {
      columnVisibilityModel[colDef["field"]] = colDef[
        "requirePermissions"
      ].some((r) => permissionCodes?.indexOf(r) >= 0);
    }

    switch (colDef.type) {
      case "date":
        typeDef = dateType;
        break;
      case "datetime":
        typeDef = dateTimeType;
        break;
      case "currency":
        typeDef = currencyType;
        break;
      case "icon":
        typeDef = iconType;
        break;
      case "check":
        typeDef = checkType;
        break;
      case "button":
        typeDef = buttonType;
        break;
      case "link":
        typeDef = linkType;
        break;
      case "relatedlink":
        typeDef = relatedlinkType;
        break;
      case "edit":
        typeDef = editType;
        break;
      case "view":
        typeDef = viewType;
        break;
      case "download":
        typeDef = downloadType;

        break;
      case "multiline":
        typeDef = multiLineType;
        rowHeight = "auto";
        break;
      case "avatar":
        typeDef = avatarType;
        break;
      case "chip":
        typeDef = chipType;
        break;
      case "enum":
        typeDef = enumConvertor;
        break;
    }

    return {
      ...nestedValueGetterColType,
      ...colDef,
      ...typeDef,
      flex: colDef.flex ? colDef.flex : 1,
      cellClassName: colDef.highlight ? "custom-highlight" : "",
    };
  });

  if (showSerialNumber) {
    columnDefs.unshift({
      field: "id",
      headerName: "No.",
      filterable: false,
      sortable: false,
      flex: 0,
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
    });
  }

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer sx={{ justifyContent: "right" }}>
        {showExportOptions && <GridToolbarExport />}
        {showQuickFilter && <QuickSearchToolbar />}
      </GridToolbarContainer>
    );
  };

  let datagridAdditionalProps = {};
  if (showExportOptions || showQuickFilter) {
    datagridAdditionalProps["components"] = {
      Toolbar: CustomToolbar,
    };
  }

  datagridAdditionalProps["sx"] = {
    border: 0,
    "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      color: `${tableHeaderColor}.primary`,
      fontSize: 16,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bolder",
      color: "primary.main",
    },
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
      outline: "none !important",
    },
    ".MuiDataGrid-row.Mui-odd": {
      background: "linear-gradient(to right bottom, #F0F0F0, #FFFFFF)",
    },
    ".MuiDataGrid-row.Mui-red": {
      background: "#FF0000",
    },
    ".MuiDataGrid-row.Mui-green": {
      background: "#008000",
    },
    ".MuiDataGrid-row.Mui-blue": {
      background: "#0000FF",
    },
    // "& .MuiDataGrid-row.Mui-odd:hover": {
    //   background:'none',
    //   backgroundColor:'primary.light'
    // }
    // ,"& .MuiDataGrid-row:hover":{
    //   backgroundColor:'primary.light'
    // }
    // "& .MuiDataGrid-columnHeaders": {
    //     backgroundColor: `${tableHeaderColor}.main`,
    //     color: `${tableHeaderColor}.contrastText`,
    //     fontSize: 14,
    // },
    // "& .MuiDataGrid-cell": {
    //     minHeight: "52px !important",
    // },
    // "& .custom-highlight": {
    //     fontWeight: "600",
    // },
    // "& .MuiDataGrid-sortIcon": {
    //     color: `${tableHeaderColor}.contrastText`,
    // },
  };
  const getCustomRowClass = (params) => {
    let className = ``;
    if (props.rowColor && props.rowColorField) {
      props.rowColor.forEach((condition) => {
        if (Array.isArray(condition["rule"])) {
          if (
            params.row[props.rowColorField] >= condition["rule"][0] &&
            params.row[props.rowColorField] < condition["rule"][1]
          ) {
            className = `customRows-${condition["color"]}`;
          }
        } else if (params.row[props.rowColorField] === condition["rule"]) {
          className = `customRows-${condition["color"]}`;
        }
      });
    }
    return className;
  };

  if (props.rowColor) {
    props.rowColor.forEach((condition) => {
      datagridAdditionalProps["sx"][`& .customRows-${condition["color"]}`] = {
        backgroundColor: `${condition.color}.main`,
        color: `${condition.color}.contrastText`,
        "&:hover": {
          backgroundColor: lighten(
            theme.palette[`${condition.color}`].main,
            0.5
          ),
        },
      };
    });
  }

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    if (props?.Onclick) {
      props?.Onclick(params.row);
    }
  };

  return (
    <Box style={{ height: "auto", overflow: "auto", width: "100%" }}>
      {!tableApi ? (
        <DataGrid
          disableRowSelectionOnClick={true}
          getRowHeight={() => rowHeight}
          getEstimatedRowHeight={() => 200}
          onRowClick={handleRowClick}
          disableColumnMenu={true}
          columns={columnDefs}
          rows={rows || []}
          autoHeight={true}
          {...datagridAdditionalProps}
          {...baseProps}
          paginationModel={{ page, pageSize }}
          pageSizeOptions={rowsPerPageOptions}
          onPaginationModelChange={onPaginationChange}
          columnVisibilityModel={columnVisibilityModel}
          getRowClassName={(params) => getCustomRowClass(params)}
        />
      ) : (
        <DataGrid
          disableRowSelectionOnClick={true}
          getRowHeight={() => rowHeight}
          getEstimatedRowHeight={() => 200}
          onRowClick={handleRowClick}
          disableColumnMenu={true}
          columns={columnDefs}
          rows={tableApi?.items || []}
          rowCount={tableApi?.total || 0}
          autoHeight={true}
          {...datagridAdditionalProps}
          {...baseProps}
          columnVisibilityModel={columnVisibilityModel}
          paginationModel={{ page, pageSize }}
          // page={(tableParamsGet?.page || 1) - 1} // Datagrid pages are zero=indexed
          // pageSize={}
          getRowClassName={(params) => {
            if (
              params?.row?.lead_color &&
              params?.row?.lead_color != "noColor"
            ) {
              return `Mui-${params?.row?.lead_color}`;
            }
            return params.indexRelativeToCurrentPage % 2 === 0
              ? "Mui-even"
              : "Mui-odd";
          }}
          pageSizeOptions={rowsPerPageOptions}
          paginationMode="server"
          onPaginationModelChange={onPaginationChange}
          sortingMode="server"
          onSortModelChange={onSortingChange}
          filterMode="server"
          onFilterModelChange={onFilterChange}
        />
      )}
    </Box>
  );
};

PMTable.defaultProps = {
  showSerialNumber: false,
  showExportOptions: false,
  tableHeaderColor: "primary",
  showQuickFilter: false,
};

export default PMTable;
