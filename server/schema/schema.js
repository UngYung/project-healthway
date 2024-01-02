const Appointment = require("../models/Appointment");
const PatientRecord = require("../models/PatientRecord");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const PatientType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    patientID: { type: GraphQLID },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    medicalHistory: { type: GraphQLString },
    currentMedications: { type: GraphQLString },
    emergencyContact: { type: GraphQLString },
  }),
});

const AppointmentType = new GraphQLObjectType({
  name: "Appointment",
  fields: () => ({
    appointmentID: { type: GraphQLID },
    patientID: { type: GraphQLID },
    doctorID: { type: GraphQLID },
    appointmentDate: { type: GraphQLString },
    time: { type: GraphQLString },
    purpose: { type: GraphQLString },
    notes: { type: GraphQLString },
    // patient: {
    //   type: PatientType,
    //   resolve(parent, args) {
    //     return PatientRecord.findById(parent.patientID);
    //   },
    // },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    patients: {
      type: new GraphQLList(PatientType),
      resolve(parent, args) {
        return PatientRecord.find();
      },
    },
    appointments: {
      type: new GraphQLList(AppointmentType),
      resolve(parent, args) {
        return Appointment.find();
      },
    },
    patient: {
      type: PatientType,
      args: { patientID: { type: GraphQLID } },
      resolve(parent, args) {
        return PatientRecord.findById(args.patientID);
      },
    },
    appointment: {
      type: AppointmentType,
      args: { appointmentID: { type: GraphQLID } },
      resolve(parent, args) {
        return Appointment.findById(args.appointmentID);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
