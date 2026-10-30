/**
 * GEP vendor cluster metadata for the Matter Server dashboard and WebSocket API.
 *
 * Keep this file in sync with the Nordic water-valve ZAP model in
 * fos_firmware_4/Projects/Nordic/Matter/water_valve.
 */
import {
  AttributeElement as Attribute,
  ClusterElement as Cluster,
  FieldElement as Field,
  Matter,
} from "@matter/main/model";

const readOnly = { access: "R V", conformance: "M" };
const writable = { access: "RW VO", conformance: "M" };

const globalAttributes = () => [
  Attribute({
    name: "FeatureMap",
    id: 0xfffc,
    type: "FeatureMap",
    default: 0,
  }),
  Attribute({
    name: "ClusterRevision",
    id: 0xfffd,
    type: "ClusterRevision",
    default: 1,
  }),
];

const DeviceInfo = Cluster(
  {
    name: "DeviceInfo",
    id: 0xfff1fc10,
    classification: "endpoint",
  },
  Attribute({ name: "ProductId", id: 0x0000, type: "uint16", ...readOnly }),
  Attribute({
    name: "SerialNumber",
    id: 0x0001,
    type: "string",
    constraint: "max 16",
    ...readOnly,
  }),
  Attribute({ name: "ConnectivityBootloaderVersion", id: 0x0002, type: "uint32", ...readOnly }),
  Attribute({ name: "ConnectivityApplicationVersion", id: 0x0003, type: "uint32", ...readOnly }),
  Attribute({ name: "RtMcuBootloaderVersion", id: 0x0004, type: "uint32", ...readOnly }),
  Attribute({ name: "RtMcuApplicationVersion", id: 0x0005, type: "uint32", ...readOnly }),
  Attribute({ name: "DataModelVersion", id: 0x0006, type: "uint8", ...readOnly }),
  Attribute({ name: "InterMcuProtocolVersion", id: 0x0007, type: "uint8", ...readOnly }),
  Attribute({ name: "MatterStackVersion", id: 0x0008, type: "uint32", ...readOnly }),
  Attribute({ name: "ControlBoard", id: 0x0009, type: "uint8", ...readOnly }),
  Attribute({ name: "ChannelCount", id: 0x000a, type: "uint8", ...readOnly }),
  Attribute({ name: "ManufactureDate", id: 0x000b, type: "uint32", ...readOnly }),
  Attribute({ name: "ManufacturePlant", id: 0x000c, type: "uint16", ...readOnly }),
  Attribute({ name: "ManufactureLine", id: 0x000d, type: "uint16", ...readOnly }),
  Attribute({ name: "ManufactureLot", id: 0x000e, type: "uint16", ...readOnly }),
  Attribute({ name: "ManufacturerCode", id: 0x000f, type: "uint16", ...readOnly }),
  Attribute({ name: "EolTestDate", id: 0x0010, type: "uint32", ...readOnly }),
  Attribute({ name: "TestFixtureIdentifier", id: 0x0011, type: "uint32", ...readOnly }),
  ...globalAttributes(),
);

const DeviceConfiguration = Cluster(
  {
    name: "DeviceConfiguration",
    id: 0xfff1fc11,
    classification: "endpoint",
  },
  Attribute({ name: "Blocked", id: 0x1000, type: "bool", ...writable }),
  Attribute({ name: "BeverageRatio", id: 0x1001, type: "single", ...writable }),
  Attribute({ name: "TargetBeverageFlowrate", id: 0x1002, type: "uint16", ...writable }),
  Attribute({ name: "ExternalModuleId", id: 0x1003, type: "uint8", ...writable }),
  Attribute({
    name: "ExternalModuleParameters",
    id: 0x1004,
    type: "octstr",
    constraint: "max 10",
    ...writable,
  }),
  Attribute({ name: "DispenseWaterOnly", id: 0x1005, type: "bool", ...writable }),
  ...globalAttributes(),
);

const DeviceTelemetry = Cluster(
  {
    name: "DeviceTelemetry",
    id: 0xfff1fc12,
    classification: "endpoint",
  },
  Attribute({ name: "PouredChannels", id: 0x3000, type: "map8", ...readOnly }),
  Attribute({ name: "McuVoltage", id: 0x3001, type: "uint16", ...readOnly }),
  Attribute({ name: "McuTemperature", id: 0x3002, type: "uint16", ...readOnly }),
  Attribute({ name: "Uptime", id: 0x3003, type: "uint32", ...readOnly }),
  Attribute({ name: "BootCounter", id: 0x3004, type: "uint32", ...readOnly }),
  Attribute({ name: "DeviceAlarms", id: 0x4000, type: "map32", ...readOnly }),
  ...globalAttributes(),
);

const ChannelConfiguration = Cluster(
  {
    name: "ChannelConfiguration",
    id: 0xfff1fc30,
    classification: "endpoint",
  },
  Attribute({ name: "FluidId", id: 0x1100, type: "uint8", ...writable }),
  Attribute({ name: "ViscosityParameter", id: 0x1101, type: "single", ...writable }),
  Attribute(
    {
      name: "RegressionModelParameters",
      id: 0x1102,
      type: "list",
      constraint: "max 10",
      ...writable,
    },
    Field({ name: "entry", type: "single" }),
  ),
  Attribute({ name: "FlowSetpoint", id: 0x1103, type: "uint16", ...writable }),
  Attribute({ name: "RegressionModelId", id: 0x1104, type: "uint8", ...writable }),
  ...globalAttributes(),
);

const ChannelCalibration = Cluster(
  {
    name: "ChannelCalibration",
    id: 0xfff1fc31,
    classification: "endpoint",
  },
  Attribute(
    {
      name: "LinearizationCurve",
      id: 0x2000,
      type: "list",
      constraint: "max 11",
      ...writable,
    },
    Field({ name: "entry", type: "uint16" }),
  ),
  Attribute({ name: "DeltaPressureCorrection", id: 0x2001, type: "single", ...writable }),
  Attribute({ name: "TemperatureCorrection", id: 0x2002, type: "single", ...writable }),
  Attribute({ name: "FlowmeterCalibration", id: 0x2003, type: "single", ...writable }),
  Attribute({ name: "ActuatorTuningMinimum", id: 0x2004, type: "uint16", ...writable }),
  Attribute({ name: "ActuatorTuningMaximum", id: 0x2005, type: "uint16", ...writable }),
  Attribute({ name: "ActuatorTuningIdle", id: 0x2006, type: "uint16", ...writable }),
  Attribute({ name: "ActuatorMagnetPolarity", id: 0x2007, type: "uint8", ...writable }),
  ...globalAttributes(),
);

const ChannelTelemetry = Cluster(
  {
    name: "ChannelTelemetry",
    id: 0xfff1fc32,
    classification: "endpoint",
  },
  Attribute({ name: "ChannelState", id: 0x3100, type: "uint8", ...readOnly }),
  Attribute({ name: "Opening", id: 0x3101, type: "uint16", ...readOnly }),
  Attribute({ name: "PwmDutyCycle", id: 0x3102, type: "uint16", ...readOnly }),
  Attribute({ name: "Temperature", id: 0x3103, type: "uint16", ...readOnly }),
  Attribute({ name: "Flowrate", id: 0x3104, type: "uint16", ...readOnly }),
  Attribute({ name: "Volume", id: 0x3105, type: "uint16", ...readOnly }),
  Attribute({ name: "DeltaPressure", id: 0x3106, type: "uint32", ...readOnly }),
  Attribute({ name: "Pressure0", id: 0x3107, type: "uint32", ...readOnly }),
  Attribute({ name: "Pressure1", id: 0x3108, type: "uint32", ...readOnly }),
  Attribute({ name: "DispensingTime", id: 0x3109, type: "uint16", ...readOnly }),
  Attribute({ name: "AverageOpening", id: 0x310a, type: "uint16", ...readOnly }),
  Attribute({ name: "AveragePwmDutyCycle", id: 0x310b, type: "uint16", ...readOnly }),
  Attribute({ name: "AverageTemperature", id: 0x310c, type: "uint16", ...readOnly }),
  Attribute({ name: "AverageFlowrate", id: 0x310d, type: "uint16", ...readOnly }),
  Attribute({ name: "AverageVolume", id: 0x310e, type: "uint16", ...readOnly }),
  Attribute({ name: "AverageDeltaPressure", id: 0x310f, type: "uint32", ...readOnly }),
  Attribute({ name: "AveragePressure0", id: 0x3110, type: "uint32", ...readOnly }),
  Attribute({ name: "AveragePressure1", id: 0x3111, type: "uint32", ...readOnly }),
  Attribute({ name: "AverageDispensingTime", id: 0x3112, type: "uint16", ...readOnly }),
  Attribute({ name: "ActuatorCalibrationCounter", id: 0x3113, type: "uint16", ...readOnly }),
  Attribute({ name: "ActuationsCounter", id: 0x3114, type: "uint32", ...readOnly }),
  Attribute({ name: "ChannelAlarms", id: 0x4100, type: "map32", ...readOnly }),
  ...globalAttributes(),
);

export const GepClusters = [
  DeviceInfo,
  DeviceConfiguration,
  DeviceTelemetry,
  ChannelConfiguration,
  ChannelCalibration,
  ChannelTelemetry,
];

for (const cluster of GepClusters) {
  Matter.children.push(cluster);
}
