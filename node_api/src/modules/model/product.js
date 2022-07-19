module.exports = function (sequelize, DataTypes) {
  return sequelize.define("product", {
    // id: {
    //   autoIncrement: false,
    //   type: Sequelize.STRING(36),
    //   defaultValue: Sequelize.fn.("UUID()"),
    //   primaryKey: true,
    //   allowNull: true,
    //   field: "id",
    // },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "title",
    },
    categoryId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: "category_Id",
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "slug",
    },
    price: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: "price",
    },
    isNegotiable: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: "is_Negotiable",
    },
    isFree: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: "is_Free",
    },
    buyerDoDelivery: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: "buyer_Do_Delivery",
    },
    stock: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: "stock",
    },
    condition: {
      type: DataTypes.ENUM({
        values: ["new", "old"],
      }),
      allowNull: true,
      field: "condition",
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "description",
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "location",
    },
    promote_type: {
      type: DataTypes.ENUM({
        values: ["yes", "no"],
      }),
      allowNull: true,
      field: "promote_Type",
    },
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: "user_Id",
    },
    dealMethod: {
      type: DataTypes.ENUM({
        values: ["yes", "no"],
      }),
      allowNull: false,
      field: "deal_Method",
    },
    isApproved: {
      type: DataTypes.ENUM({
        values: ["approved", "not approved"],
      }),
      allowNull: false,
      field: "is_Approved",
    },
    postedAt: {
      type: DataTypes.DATE(),
      allowNull: true,
      defaultValue: sequelize.NOW,
      field: "posted_At",
    },
    isSold: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 0,
      field: "is_Sold",
    },
  });
};
