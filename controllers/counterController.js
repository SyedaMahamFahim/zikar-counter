const Counter = require("../models/counterModel");
const catchAsyncError = require("../middleware/catchAsycnError");
const ErrorHandler = require("../utils/errorhandler");

// Create a new counter
exports.createCounter = catchAsyncError(async (req, res, next) => {
  const { goal, description ,whatsAppText} = req.body;
  const counter = await Counter.create({
    goal,
    description,
    whatsAppText
  });

  if (!counter) {
    return next(
      new ErrorHandler(
        "Enable to create new counter.Please try again later",
        400
      )
    );
  }

  const counterId = counter._id;
  await counter.save();

  res.status(201).json({
    success: true,
    counterId,
    counter,
  });
});

// Update Counter Value
exports.updateCounter = catchAsyncError(async (req, res, next) => {
  let counter = await Counter.findById(req.params.id);

  
  if (!counter) {
    return next(new ErrorHandler("Counter not found", 404));
  }
  const {count,isCompleted}=counter
  let totalCount = count;

  var setCompleted=isCompleted
  if(totalCount<req.body.goal){
    setCompleted=false
  }else if(totalCount>=req.body.goal){
    setCompleted=true
  }

  const updatedCounter = await Counter.findByIdAndUpdate(
    req.params.id, {
      description: req.body.description,
      goal: req.body.goal,
      whatsAppText: req.body.whatsAppText,
      isCompleted: setCompleted,

    },{
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedCounter) {
    return next(
      new ErrorHandler(
        "Enable to update counter.Please try again later",
        400
      )
    );
  }

  const counterId = counter._id;
  await counter.save();

  res.status(201).json({
    success: true,
    counterId,
    updatedCounter,
  });
});

// delete counter
exports.deleteCounter=catchAsyncError(async(req,res,next)=>{
  let counter = await Counter.findById(req.params.id);

  if (!counter) {
    return next(new ErrorHandler("Counter not found", 404));
  }

  await counter.remove();

  res.status(200).json({
    success: true,
    message: "Counter Delete Successfully",
  });
})

// add allocation
exports.addAllocation = catchAsyncError(async (req, res, next) => {
  let counter = await Counter.findById(req.params.id);

  const { goal, count,isCompleted, } = counter;

  if (!counter) {
    return next(new ErrorHandler("Counter not found", 404));
  }

  let totalCount = count;

  const { allocations } = req.body;

   allocations.forEach((allocation) => {
    totalCount += allocation.count;
  });

  var setCompleted=isCompleted
  if(totalCount<goal){
    setCompleted=false
  }else if(totalCount>=goal){
    setCompleted=true
  }
  

  counter = await Counter.findByIdAndUpdate(
    req.params.id,
    {
      allocations: [...counter.allocations, ...allocations],
      count: totalCount,
      isCompleted: setCompleted,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    counter,
  });
});

// delete allocation
exports.deleteAllocationCounter = catchAsyncError(async (req, res, next) => {
  let counter = await Counter.findById(req.params.id);

  const { allocationId } = req.body;
  const { goal, count, allocations,isCompleted } = counter;

  if (!counter) {
    return next(new ErrorHandler("Counter not found", 404));
  }

  let totalCount = count;
  let newAllocations = [];

  for (let i = 0; i < allocations.length; i++) {
    if (allocations[i]._id.toString() === allocationId) {
      totalCount -= allocations[i].count;
    } else {
      newAllocations.push(allocations[i]);
      console.log("allocations[i]._id", allocations[i]._id.toString());
    }
  }

  
  var setCompleted=isCompleted
  if(totalCount<goal){
    setCompleted=false
  }else if(totalCount>=goal){
    setCompleted=true
  }
  
  counter = await Counter.findByIdAndUpdate(
    req.params.id,
    {
      allocations: [...newAllocations],
      count: totalCount,
      isCompleted: setCompleted,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    counter,
  });
});

// get a single counter
exports.getCounter = catchAsyncError(async (req, res, next) => {
  let counter = await Counter.findById(req.params.id);

  if (!counter) {
    return next(new ErrorHandler("Counter not found", 404));
  }

  res.status(200).json({
    success: true,
    counter,
  });
});
