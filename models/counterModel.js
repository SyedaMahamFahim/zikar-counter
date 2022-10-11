const mongoose = require("mongoose");

const counterModel = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please enter the description"],
    },
    goal: {
      type: Number,
      required: [true, "Please enter the counter value"],
    },
    whatsAppText:{
      type: String,
      required: [true, "Please enter the WhatsApp text"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    count:{
      type:Number,
      default:0
    },
    allocations:[
      {
        count:{
          type: Number,
        },
        reader:{
          type:String,
        },
        date:{
          type:Date,
          default:Date.now
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Counter", counterModel);
