import mongoose from 'mongoose';

const { Schema } = mongoose;

const ordersSchema = new Schema({
  recipient: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        street: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        postalCode: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
      },
    },
  ],

  products: [
    {
      product: {
        type: String,
        required: true,
        trim: true,
      },
      color: {
        type: String,
        required: true,
        trim: true,
      },
      size: {
        type: String,
        required: true,
        trim: true,
      },
      quantity: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema);
export default Orders;
