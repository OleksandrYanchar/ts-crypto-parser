import mongoose from 'mongoose';

interface ValidateProps {
  value: string;
}

const ReportsSchema = new mongoose.Schema({
  shortName: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 1,
    maxlength: 10,
  },
  readableName: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: [true, "Price ain't provided"],
    min: 0, // Assuming the price can't be negative
    max: 1000000, // Example: specify maximum value for the price
  },
  generatedDate: {
    type: String,
    required: [true, 'Please provide date'],
    validate: {
      validator: function (v: string): boolean {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: (props: ValidateProps) => `${props.value} is not a valid date format!`,
    },
  },
  generatedTime: {
    type: String,
    required: [true, 'Please provide time'],
    validate: {
      validator: function (v: string): boolean {
        return /^\d{2}:\d{2}:\d{2}$/.test(v);
      },
      message: (props: ValidateProps) => `${props.value} is not a valid time format!`,
    },
  },
});

export const Reports = mongoose.model('Reports', ReportsSchema);

export default Reports;
