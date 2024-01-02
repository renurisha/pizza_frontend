import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import { Avatar, Box, SvgIcon } from '@mui/material';
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import { PMFormatterText, PMGrid, PMText } from "../../pmcomponents";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";

export interface StatsCardWidget2Props {
  text?: string
  textColor?: string;
  type?: string;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  value1?: string;
  value1type?: string;
  value2?: string;
  value3?: string;
  value4?: string;
  formatType?: string;
  icon?: string;
  statsIcon?: string;
  statsIconColor?: any;
  arrowIcons?: string;
  headerColor?: string;
  direction?: string;
  arrow?: boolean;
  data: Object;
  fields: Array<any>;
}

export const StatsCardWidget2 = (
  props: BaseWidgetProps & StatsCardWidget2Props
) => {
  const {
    statsIcon,
    statsIconColor,
    headerColor,
    value1,
    value2,
    value3,
    value4,
    label1,
    label2,
    label3,
    label4,
    direction,
    value1type,
    arrow,
  } = props;

  const value = props?.fields?.length ? props?.fields[0].value : "";

  return (
    props?.type == "3" ? (
    <BaseWidget
      {...props}
      sx={{ position: "relative", boxShadow: 3, borderRadius: "8px" }}
    >
      <PMGrid
        justifyContent="space-around"
        sx={{ fontFamily: "Leyton"}}
        alignItems="center"
        color={headerColor}
      >
          <Stack
            direction="column"
            justifyContent="center"
            sx={{ width: "100%"}}
          >
            <Box sx={{ zIndex: 100, borderLeft: 5, paddingLeft: 1, color:`${statsIconColor}.main` }} display="flex" alignItems="center">
              <PMFormatterText
                value={props?.fields?.length ? props?.fields[0].value : ""}
                formatType={props?.fields?.length ? props.fields[0].type : ""}
                variant2="h4"
              />
              {arrow &&
                (value >= 0 ? (
                  <Icon
                    color={statsIconColor}
                    sx={{
                      fontSize: "30px",
                      color: "green",
                      marginLeft: "10px",
                    }}
                  >
                    arrow_upward
                  </Icon>
                ) : (
                  <Icon
                    sx={{ fontSize: "30px", color: "red", marginLeft: "10px" }}
                  >
                    arrow_downward
                  </Icon>
                ))}
            </Box>

            <Box sx={{ zIndex: 100, borderLeft: 5, paddingLeft: 1, borderColor:`${statsIconColor}.main`, display: 'flex', alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-start' }}>
              <PMText variant="h5" sx={{ fontWeight: 500, fontSize: { xs: 16, md: 20, lg: 22 }, marginTop: 'auto' }}>
                {props?.fields?.length ? props.fields[0].label : ""}
              </PMText>
            </Box>

            <Stack direction="row" sx={{ mt: 2, }}>
              <Box
                sx={{
                  textAlign: "start",
                  zIndex: 100,
                  width: "100%",
                  fontWeight: 600,
                }}
              >
                <PMFormatterText
                  value={props?.fields?.length ? props.fields[1].value : ""}
                  formatType={props?.fields?.length ? props.fields[1].type : ""}
                  variant2="h5"
                />
                <PMText variant="subtitle2" sx={{ fontWeight: 500 }}>
                  {props?.fields?.length ? props.fields[1].label : ""}
                </PMText>
              </Box>

              <Box
                sx={{
                  textAlign: "end",
                  alignSelf: "end",
                  zIndex: 100,
                  width: "100%",
                }}
              >
                <PMFormatterText
                  value={props?.fields?.length ? props.fields[2].value : ""}
                  formatType={props?.fields?.length ? props.fields[2].type : ""}
                  variant2="h5"
                />
                <PMText variant="subtitle2">
                  {props?.fields?.length ? props.fields[2].label : ""}
                </PMText>
              </Box>
            </Stack>
          </Stack>
        <Avatar
          sx={{
            backgroundColor: `${statsIconColor}.light`,
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",

            zIndex: 0,
            borderRadius: 0,
          }}
        >
          {/* <Icon color={statsIconColor} sx={{ fontSize: '60px', position:'absolute', top:'1%', right:'1%' }}>{statsIcon}</Icon> */}
          <SvgIcon sx={{fontSize: '120px', position:'absolute', top:'-3.5vh', right:'-4vh', transform: 'rotate(10deg)', opacity:'0.4' }} viewBox="0 0 24 24">
            <path d="M2,22h20l-4-16H6L2,22z" />
          </SvgIcon>
          <SignalCellular4BarIcon sx={{ fontSize: '100px', position:'absolute', top:'-5vh', right:'0vh', transform: 'rotate(120deg)', opacity:'0.4'}}/>
          <SignalCellular4BarIcon sx={{ fontSize: '60px', position:'absolute', bottom:'-3%', left:'-3%', transform: 'rotate(90deg)', opacity:'0.4'}}/>
        </Avatar>
      </PMGrid>
    </BaseWidget>
        ) : (
    <BaseWidget
      {...props}
      sx={{ position: "relative", boxShadow: 3, borderRadius: "8px", borderLeft: 5, paddingLeft: 1, borderColor:`${statsIconColor}.main` }}
    >
      <PMGrid
        justifyContent="space-around"
        sx={{ fontFamily: "Leyton"}}
        alignItems="center"
        color={headerColor}
        height={{
          sm: 180,
          md: 190,
          lg: 180,
        }}
      >
            <Stack direction="row" width="100%" justifyContent="space-between">
              <Stack
                direction="column"
                sx={{ padding: 1,  zIndex: 100 }}
                justifyContent="space-between"
                alignItems="space-between"
              >
                <PMGrid>
                  <Box sx={{ zIndex: 100, color:`${statsIconColor}.main` }}>
                  <PMFormatterText
                    value={props?.fields?.length ? props.fields[0].value : ""}
                    formatType={
                      props?.fields?.length ? props.fields[0].type : ""
                    }
                    variant2="h4"
                  />
                  </Box>

                  <PMText variant="subtitle2">
                    {props?.fields?.length ? props.fields[0].label : ""}
                  </PMText>
                </PMGrid>

                <PMGrid sx={{ position: "relative", top: '3vh' }}>
                  <Box sx={{ zIndex: 100, color:`${statsIconColor}.main` }}>
                  <PMFormatterText
                    value={props?.fields?.length ? props.fields[1].value : ""}
                    formatType={
                      props?.fields?.length ? props.fields[1].type : ""
                    }
                    variant2="h4"
                  />
                  </Box>
                  <PMText variant="subtitle2">
                    {props?.fields?.length ? props.fields[1].label : ""}
                  </PMText>
                </PMGrid>
              </Stack>

              <Stack
                direction="column"
                sx={{ padding: 1,  zIndex: 100 }}
                justifyContent="start"
                alignItems="space-between"
                textAlign="right"
              >
                <PMGrid >
                  <Box sx={{ zIndex: 100, color:`${statsIconColor}.main` }}>
                  <PMFormatterText
                    value={props?.fields?.length ? props.fields[2].value : ""}
                    formatType={
                      props?.fields?.length ? props.fields[2].type : ""
                    }
                    variant2="h4"
                  />
                  </Box>
                  <PMText variant="subtitle2">
                    {props?.fields?.length ? props.fields[2].label : ""}
                  </PMText>
                </PMGrid>
                <PMGrid sx={{ position: "relative", top: '3vh' }}>
                  <Box sx={{ zIndex: 100, color:`${statsIconColor}.main` }}>
                  <PMFormatterText
                    value={props?.fields?.length ? props.fields[3].value : ""}
                    formatType={
                      props?.fields?.length ? props.fields[3].type : ""
                    }
                    variant2="h4"
                  />
                  </Box>
                  <PMText variant="subtitle2">
                    {props?.fields?.length ? props.fields[3].label : ""}
                  </PMText>
                </PMGrid>
              </Stack>
            </Stack>
        <Avatar
          sx={{
            backgroundColor: `${statsIconColor}.light`,
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",

            zIndex: 0,
            borderRadius: 0,
          }}
        >
          {/* <Icon color={statsIconColor} sx={{ fontSize: '60px', position:'absolute', top:'1%', right:'1%' }}>{statsIcon}</Icon> */}
          <SvgIcon sx={{fontSize: '120px', position:'absolute', top:'-3.5vh', right:'-4vh', transform: 'rotate(10deg)', opacity:'0.4' }} viewBox="0 0 24 24">
            <path d="M2,22h20l-4-16H6L2,22z" />
          </SvgIcon>
          <SignalCellular4BarIcon sx={{ fontSize: '100px', position:'absolute', top:'-5vh', right:'0vh', transform: 'rotate(120deg)', opacity:'0.4'}}/>
          <SignalCellular4BarIcon sx={{ fontSize: '60px', position:'absolute', bottom:'-3%', left:'-3%', transform: 'rotate(90deg)', opacity:'0.4'}}/>
        </Avatar>
      </PMGrid>
    </BaseWidget>
  ));
};

StatsCardWidget2.defaultProps = {
  direction: "column",
  headerColor: "black",
  feilds: {
    label: "default",
    value: "0",
  },
};

export default StatsCardWidget2;
