const Appointment = require("../models/Appointment");
const PatientRecord = require("../models/PatientRecord");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const PatientType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    id: { type: GraphQLID },
    patientID: { type: GraphQLString },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    emergencyContact: { type: GraphQLString },
  }),
});

const AppointmentType = new GraphQLObjectType({
  name: "Appointment",
  fields: () => ({
    id: { type: GraphQLID },
    patientID: { type: GraphQLID },
    doctorID: { type: GraphQLString },
    appointmentDate: { type: GraphQLString },
    time: { type: GraphQLString },
    purpose: { type: GraphQLString },
    notes: { type: GraphQLString },
    patient: {
      type: PatientType,
      resolve(parent, args) {
        return PatientRecord.findById(parent.patientID);
      },
    },
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

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPatient: {
      type: PatientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        dateOfBirth: { type: GraphQLNonNull(GraphQLString) },
        emergencyContact: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const patient = new PatientRecord({
          name: args.name,
          dateOfBirth: args.dateOfBirth,
          emergencyContact: args.emergencyContact,
        });
        return patient.save();
      },
    },
    deletePatient: {
      type: PatientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return PatientRecord.findByIdAndDelete(args.id);
      },
    },
    updatePatient: {
      type: PatientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        emergencyContact: { type: GraphQLString },
      },
      resolve(parent, args) {
        return PatientRecord.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              dateOfBirth: args.dateOfBirth,
              emergencyContact: args.emergencyContact,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
