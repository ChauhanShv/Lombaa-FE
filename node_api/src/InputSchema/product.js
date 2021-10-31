module.exports = {
  "data.title": {
    notEmpty: {
      errorMessage: "title cannot be empty",
    },
  },
  "data.slug": {
    notEmpty: {
      errorMessage: "slug cannot be empty",
    },
  },
  "data.price": {
    notEmpty: {
      errorMessage: "price cannoot be empty",
    },
  },
  "data.isNegotiable": {
    notEmpty: {
      errorMessage: "isNegotiable cannot be empty",
    },
  },
  "data.isFree": {
    notEmpty: {
      errorMessage: "isFree cannot be empty",
    },
  },
  "data.buyerDoDelivery": {
    notEmpty: {
      errorMessage: "cannot be empty",
    },
  },
  "data.stock": {
    notEmpty: {
      errorMessage: "stock cannot be empty",
    },
  },
  "data.condition": {
    notEmpty: {
      errorMessage: "condition cannot be empty",
    },
  },
  "data.description": {
    optional: {
      options: { nullable: true },
    },
  },
  "data.location": {
    notEmpty: {
      errorMessage: " location cannnot be empty",
    },
  },
  "data.promote_type": {
    notEmpty: {
      errorMessage: "promote type cannot be empty",
    },
  },
  "data.dealMethod": {
    notEmpty: {
      errorMessage: "deal method cannot be empty",
    },
  },
  "data.isApproved": {
    notEmpty: {
      errorMessage: "cannot be empty",
    },
  },
  "data.isSold": {
    optional: {
      options: { nullable: true },
    },
  },
};
