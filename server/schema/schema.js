const Appointment = require("../models/Appointment");
const PatientRecord = require("../models/PatientRecord");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const PatientType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    emergencyContact: { type: GraphQLString },
  }),
});

const AppointmentType = new GraphQLObjectType({
  name: "Appointment",
  fields: () => ({
    id: { type: GraphQLID },
    appointmentDate: { type: GraphQLString },
    time: { type: GraphQLString },
    purpose: { type: GraphQLString },
    notes: { type: GraphQLString },
    patient: {
      type: PatientType,
      resolve(parent, args) {
        return PatientRecord.findById(parent.patient);
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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return PatientRecord.findById(args.id);
      },
    },
    appointment: {
      type: AppointmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Appointment.findById(args.id);
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
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return PatientRecord.findByIdAndDelete(args.id);
      },
    },
    updatePatient: {
      type: PatientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
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
    addAppointment: {
      type: AppointmentType,
      args: {
        appointmentDate: { type: GraphQLNonNull(GraphQLString) },
        time: { type: GraphQLNonNull(GraphQLString) },
        purpose: {
          type: new GraphQLEnumType({
            name: "AppointmentPurpose",
            values: {
              routine: { value: "Routine exam" },
              emergency: { value: "Emergency" },
              follow: { value: "Follow up" },
            },
          }),
          defaultValue: "Routine exam",
        },
        notes: { type: GraphQLNonNull(GraphQLString) },
        patient: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const appointment = new Appointment({
          appointmentDate: args.appointmentDate,
          time: args.time,
          purpose: args.purpose,
          notes: args.notes,
          patient: args.patient,
        });
        return appointment.save();
      },
    },
    deleteAppointment: {
      type: AppointmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Appointment.findByIdAndDelete(args.id);
      },
    },
    updateAppointment: {
      type: AppointmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        appointmentDate: { type: GraphQLString },
        time: { type: GraphQLString },
        purpose: {
          type: new GraphQLEnumType({
            name: "AppointmentPurposeUpdate",
            values: {
              routine: { value: "Routine exam" },
              emergency: { value: "Emergency" },
              follow: { value: "Follow up" },
            },
          }),
        },
        notes: { type: GraphQLString },
        patient: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Appointment.findByIdAndUpdate(
          args.id,
          {
            $set: {
              appointmentDate: args.appointmentDate,
              time: args.time,
              purpose: args.purpose,
              notes: args.notes,
              patient: args.patient,
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
